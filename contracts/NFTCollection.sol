// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTCollection is ERC721, ERC721URIStorage, Ownable, IERC2981 {
    // simple counter instead of OpenZeppelin Counters to avoid missing import
    uint256 private _tokenIdCounter;

    // royalty info
    address private _royaltyRecipient;
    uint96 private _royaltyBasisPoints; // using basis points: 10000 = 100%

    event Minted(address indexed to, uint256 indexed tokenId, string uri);
    event RoyaltySet(address indexed recipient, uint96 bps);

    constructor(
        string memory name_,
        string memory symbol_,
        address royaltyRecipient_,
        uint96 royaltyBps_  // e.g. 500 = 5%
    ) ERC721(name_, symbol_) {
        _royaltyRecipient = royaltyRecipient_;
        _royaltyBasisPoints = royaltyBps_;
        _tokenIdCounter = 0;
    }

    function mint(address to, string memory tokenURI_) external onlyOwner returns (uint256) {
        _tokenIdCounter += 1;
        uint256 tid = _tokenIdCounter;
        _safeMint(to, tid);
        _setTokenURI(tid, tokenURI_);
        emit Minted(to, tid, tokenURI_);
        return tid;
    }

    function setRoyalty(address recipient, uint96 bps) external onlyOwner {
        require(bps <= 10000, "Invalid bps");
        _royaltyRecipient = recipient;
        _royaltyBasisPoints = bps;
        emit RoyaltySet(recipient, bps);
    }

    // IERC2981
    function royaltyInfo(uint256, uint256 salePrice)
    external
    view
    override
    returns (address receiver, uint256 royaltyAmount)
    {
        receiver = _royaltyRecipient;
        royaltyAmount = (salePrice * _royaltyBasisPoints) / 10000;
    }

    // overrides
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

    // support interface
    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721)
    returns (bool)
    {
        // include IERC2981 interfaceId = 0x2a55205a
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }
}
