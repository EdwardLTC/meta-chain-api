// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {NFTCollection} from "./NFTCollection.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    event CollectionCreated(address indexed creator, address indexed collection, string transactionCode);

    constructor() Ownable(msg.sender) {}
    
    mapping(string => bool) private _usedTransactionCodes;

    function createCollection(
        string calldata name_,
        string calldata symbol_,
        string calldata transactionCode_,
        address royaltyRecipient_,
        uint96 royaltyBps_
    ) external returns (address) {
        require(!_usedTransactionCodes[transactionCode_], "Transaction code already used");
        NFTCollection col = new NFTCollection(name_, symbol_, royaltyRecipient_, royaltyBps_);
        col.transferOwnership(msg.sender);
        _usedTransactionCodes[transactionCode_] = true;
        emit CollectionCreated(msg.sender, address(col), transactionCode_);
        return address(col);
    }
}
