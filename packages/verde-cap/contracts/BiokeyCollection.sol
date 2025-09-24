// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BioKeysCollection is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => bytes32) public nftManifests;
    struct NFTData {
        bytes32 manifestRoot;
        string metadataURI;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner,
        address treasuryAddress,
        NFTData[] memory initialNFTs
    ) ERC721(name_, symbol_) Ownable(initialOwner) {
        _nextTokenId = 1;

        for (uint256 i = 0; i < initialNFTs.length; i++) {
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;

            _safeMint(treasuryAddress, tokenId);
            _setTokenURI(tokenId, initialNFTs[i].metadataURI);
            nftManifests[tokenId] = initialNFTs[i].manifestRoot;
        }
    }

    function mint(
        address to,
        bytes32 manifestRoot,
        string memory metadataURI
    ) external onlyOwner {
        require(manifestRoot != bytes32(0), "Manifest root cannot be empty");
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
        nftManifests[tokenId] = manifestRoot;
    }

    function verifyAttribute(
        uint256 tokenId,
        bytes32 leaf,
        bytes32[] calldata proof
    ) external view returns (bool) {
        bytes32 root = nftManifests[tokenId];
        require(root != bytes32(0), "Manifest does not exist for this token");
        return MerkleProof.verify(proof, root, leaf);
    }
}
