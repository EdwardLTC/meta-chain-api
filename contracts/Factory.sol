// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {NFTCollection} from "./NFTCollection.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Factory is Ownable {
    event CollectionCreated(address indexed creator, address indexed collection);

    constructor() Ownable(msg.sender) {}

    function createCollection(
        string calldata name_,
        string calldata symbol_,
        address royaltyRecipient_,
        uint96 royaltyBps_
    ) external returns (address) {
        NFTCollection col = new NFTCollection(name_, symbol_, royaltyRecipient_, royaltyBps_);
        // transfer ownership of collection to msg.sender so they can mint/manage
        col.transferOwnership(msg.sender);
        emit CollectionCreated(msg.sender, address(col));
        return address(col);
    }
}
