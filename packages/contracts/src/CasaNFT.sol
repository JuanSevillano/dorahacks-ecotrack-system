// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CasaNFT is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Estructura para almacenar metadatos adicionales de la casa
    struct CasaMetadata {
        string energyEfficiencyRating;
        uint256 co2Reduction; // kg de CO2 reducidos por año
        string constructionMaterials;
        uint256 constructionYear;
        string location;
        string builderCommunity;
    }
    
    mapping(uint256 => CasaMetadata) public casaMetadata;
    
    event CasaMinted(
        uint256 indexed tokenId,
        address indexed to,
        string energyEfficiencyRating,
        uint256 co2Reduction,
        string builderCommunity
    );

    constructor() ERC721("CasaBioconstruida", "CASA") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(
        address to,
        string memory uri,
        string memory energyEfficiencyRating,
        uint256 co2Reduction,
        string memory constructionMaterials,
        uint256 constructionYear,
        string memory location,
        string memory builderCommunity
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        casaMetadata[tokenId] = CasaMetadata({
            energyEfficiencyRating: energyEfficiencyRating,
            co2Reduction: co2Reduction,
            constructionMaterials: constructionMaterials,
            constructionYear: constructionYear,
            location: location,
            builderCommunity: builderCommunity
        });
        
        emit CasaMinted(tokenId, to, energyEfficiencyRating, co2Reduction, builderCommunity);
        
        return tokenId;
    }

    function getCasaMetadata(uint256 tokenId) 
        external 
        view 
        returns (CasaMetadata memory) 
    {
        require(_exists(tokenId), "Token does not exist");
        return casaMetadata[tokenId];
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}