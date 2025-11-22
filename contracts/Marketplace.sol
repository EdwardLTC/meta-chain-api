// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    using Address for address payable;

    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price; // price in payment token or in wei if paymentToken == address(0)
        address paymentToken; // address(0) means ETH
        bool active;
    }

    // market fee in basis points (10000 = 100%)
    uint96 public marketFeeBps = 250; // default 2.5%
    address public feeRecipient;

    // listingId incremental
    uint256 private _listingIdCounter;
    mapping(uint256 => Listing) public listings;
    // to prevent double-listing easily: nftAddress -> tokenId -> listingId
    mapping(address => mapping(uint256 => uint256)) public activeListingOf;

    event Listed(uint256 indexed listingId, address indexed seller, address indexed nft, uint256 tokenId, uint256 price, address paymentToken, string transactionCode);
    event Cancelled(uint256 indexed listingId, address indexed seller);
    event Bought(uint256 indexed listingId, address indexed buyer, uint256 price, address paymentToken);
    event MarketFeeUpdated(uint96 newBps, string transactionCode);
    event FeeRecipientUpdated(address recipient, string transactionCode);

    constructor(address feeRecipient_) Ownable(msg.sender) {
        feeRecipient = feeRecipient_;
    }

    // ---- admin ----
    function setMarketFee(uint96 bps, string calldata transactionCode) external onlyOwner {
        require(bps <= 10000, "invalid bps");
        marketFeeBps = bps;
        emit MarketFeeUpdated(bps,transactionCode);
    }

    // ---- admin ----
    function setFeeRecipient(address recipient,string calldata transactionCode) external onlyOwner {
        feeRecipient = recipient;
        emit FeeRecipientUpdated(recipient,transactionCode);
    }

    // ---- listing ----
    function listItem(address nftAddress, uint256 tokenId, uint256 price, address paymentToken,string calldata transactionCode) external nonReentrant {
        require(price > 0, "price > 0");
        IERC721 nft = IERC721(nftAddress);
        address ownerOfToken = nft.ownerOf(tokenId);
        require(ownerOfToken == msg.sender, "not owner");
        require(nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "marketplace not approved");

        // prevent double-listing
        require(activeListingOf[nftAddress][tokenId] == 0, "already listed");

        _listingIdCounter++;
        uint256 lid = _listingIdCounter;
        listings[lid] = Listing({
            seller: msg.sender,
            nftAddress: nftAddress,
            tokenId: tokenId,
            price: price,
            paymentToken: paymentToken,
            active: true
        });
        activeListingOf[nftAddress][tokenId] = lid;

        emit Listed(lid, msg.sender, nftAddress, tokenId, price, paymentToken,transactionCode);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "not active");
        require(l.seller == msg.sender || owner() == msg.sender, "not allowed");
        l.active = false;
        activeListingOf[l.nftAddress][l.tokenId] = 0;
        emit Cancelled(listingId, msg.sender);
    }

    // ---- buy with ETH ----
    function buyItem(uint256 listingId) external payable nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "not active");
        require(l.paymentToken == address(0), "not ETH payment");
        require(msg.value == l.price, "wrong amount");
        _executeSale(listingId, msg.sender, l.price, address(0));
    }

    // ---- buy with ERC20 ----
    function buyItemWithERC20(uint256 listingId, uint256 amount) external nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "not active");
        require(l.paymentToken != address(0), "paymentToken is ETH");
        require(amount == l.price, "wrong amount");

        IERC20 token = IERC20(l.paymentToken);
        // buyer must approve marketplace for amount
        require(token.transferFrom(msg.sender, address(this), amount), "transferFrom failed");

        _executeSale(listingId, msg.sender, amount, l.paymentToken);
    }

    // ---- internal sale execution ----
    function _executeSale(uint256 listingId, address buyer, uint256 amount, address paymentToken) internal {
        Listing storage l = listings[listingId];
        require(l.active, "not active");
        // mark inactive early
        l.active = false;
        activeListingOf[l.nftAddress][l.tokenId] = 0;

        // compute market fee
        uint256 marketFee = (amount * marketFeeBps) / 10000;
        uint256 remainder = amount - marketFee;

        // handle royalty via IERC2981 if implemented
        (address royaltyReceiver, uint256 royaltyAmount) = _getRoyaltyInfo(l.nftAddress, l.tokenId, amount);
        if (royaltyAmount > remainder) {
            // fallback: cap royalty
            royaltyAmount = remainder;
        }
        remainder = remainder - royaltyAmount;

        // Transfer the NFT first to ensure the seller still owns the token and the transfer succeeds
        IERC721(l.nftAddress).safeTransferFrom(l.seller, buyer, l.tokenId);

        // payout sequence:
        // royalty -> seller -> marketFee to feeRecipient
        if (paymentToken == address(0)) {
            // ETH transfers
            if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
                payable(royaltyReceiver).sendValue(royaltyAmount);
            }
            // seller
            payable(l.seller).sendValue(remainder);
            // market fee
            if (marketFee > 0 && feeRecipient != address(0)) {
                payable(feeRecipient).sendValue(marketFee);
            }
        } else {
            // ERC20 transfers (token is already in this contract from buyer)
            IERC20 token = IERC20(paymentToken);
            if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
                require(token.transfer(royaltyReceiver, royaltyAmount), "royalty transfer failed");
            }
            require(token.transfer(l.seller, remainder), "seller transfer failed");
            if (marketFee > 0 && feeRecipient != address(0)) {
                require(token.transfer(feeRecipient, marketFee), "fee transfer failed");
            }
        }

        emit Bought(listingId, buyer, amount, paymentToken);
    }

    // helper to call IERC2981 if implemented
    function _getRoyaltyInfo(address nftAddress, uint256 tokenId, uint256 salePrice) internal view returns (address, uint256) {
        try IERC2981(nftAddress).royaltyInfo(tokenId, salePrice) returns (address receiver, uint256 amount) {
            return (receiver, amount);
        } catch {
            return (address(0), 0);
        }
    }

    // emergency withdraw tokens/ETH owned by contract (onlyOwner)
    function withdrawETH(uint256 amount, address to) external onlyOwner {
        payable(to).sendValue(amount);
    }

    function withdrawERC20(address tokenAddress, uint256 amount, address to) external onlyOwner {
        // check return value for ERC20 transfer to be safer with tokens that return false on failure
        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(to, amount), "ERC20 transfer failed");
    }

    // fallback to accept ETH sent directly
    receive() external payable {}
    fallback() external payable {}
}
