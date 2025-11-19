// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * Minimal PaymentSplitter compatible with OpenZeppelin's API.
 * - Constructor: PaymentSplitter(payees, shares)
 * - ETH receipts are split proportionally via `release(payable account)`
 * - ERC20 tokens can be split via `release(IERC20 token, account)`
 *
 * This local version is intentionally minimal and aimed at fixing missing import
 * issues when the installed OpenZeppelin package doesn't provide PaymentSplitter.
 */
contract PaymentSplitter {
    uint256 private _totalShares;
    uint256 private _totalReleased;

    mapping(address => uint256) private _shares;
    mapping(address => uint256) private _released;
    address[] private _payees;

    // ERC20 accounting: token => totalReleased
    mapping(address => uint256) private _erc20TotalReleased;
    // token => account => released
    mapping(address => mapping(address => uint256)) private _erc20Released;

    constructor(address[] memory payees_, uint256[] memory shares_) payable {
        require(payees_.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
        require(payees_.length > 0, "PaymentSplitter: no payees");

        for (uint256 i = 0; i < payees_.length; i++) {
            _addPayee(payees_[i], shares_[i]);
        }
    }

    receive() external payable {}

    function totalShares() public view returns (uint256) {
        return _totalShares;
    }

    function totalReleased() public view returns (uint256) {
        return _totalReleased;
    }

    function shares(address account) public view returns (uint256) {
        return _shares[account];
    }

    function released(address account) public view returns (uint256) {
        return _released[account];
    }

    function payee(uint256 index) public view returns (address) {
        return _payees[index];
    }

    function release(address payable account) public virtual {
        require(_shares[account] > 0, "PaymentSplitter: account has no shares");

        uint256 totalReceived = address(this).balance + _totalReleased;
        uint256 payment = (totalReceived * _shares[account]) / _totalShares - _released[account];

        require(payment != 0, "PaymentSplitter: account is not due payment");

        _released[account] += payment;
        _totalReleased += payment;

        (bool success, ) = account.call{value: payment}("");
        require(success, "PaymentSplitter: ETH Transfer failed");
    }

    function release(IERC20 token, address account) public virtual {
        require(_shares[account] > 0, "PaymentSplitter: account has no shares");

        address tokenAddr = address(token);
        uint256 totalReceived = token.balanceOf(address(this)) + _erc20TotalReleased[tokenAddr];
        uint256 payment = (totalReceived * _shares[account]) / _totalShares - _erc20Released[tokenAddr][account];

        require(payment != 0, "PaymentSplitter: account is not due payment");

        _erc20Released[tokenAddr][account] += payment;
        _erc20TotalReleased[tokenAddr] += payment;

        require(token.transfer(account, payment), "PaymentSplitter: ERC20 Transfer failed");
    }

    function _addPayee(address account, uint256 shares_) internal {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        require(shares_ > 0, "PaymentSplitter: shares are 0");
        require(_shares[account] == 0, "PaymentSplitter: account already has shares");

        _payees.push(account);
        _shares[account] = shares_;
        _totalShares += shares_;
    }
}
