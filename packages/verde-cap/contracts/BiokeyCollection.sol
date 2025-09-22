// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BioKeysCollection is ERC721URIStorage, Ownable {
    bytes32 public merkleRoot;
    uint256 public nextTokenId;

    constructor(
        string memory name_,
        string memory symbol_,
        bytes32 _merkleRoot,
        address initialOwner
    ) ERC721(name_, symbol_) Ownable(initialOwner) {
        merkleRoot = _merkleRoot;
        nextTokenId = 1;
    }

    function mint(
        address to,
        string memory metadataURI,
        bytes32[] calldata proof
    ) external {
        bytes32 leaf = keccak256(abi.encodePacked(nextTokenId, metadataURI));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _mint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
}
