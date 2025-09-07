// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IPaymentModule.sol";
import "../bridge/BridgeAdapter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PayrollPayment is IPaymentModule {
    using SafeERC20 for IERC20;

    BridgeAdapter public bridge;

    event PayrollDistributed(
        address indexed from,
        address[] recipients,
        uint256[] amounts,
        string[] networks,
        address token
    );

    constructor(address _bridge) {
        require(_bridge != address(0), "Invalid bridge");
        bridge = BridgeAdapter(_bridge);
    }

    function handlePayment(
        address sender,
        bytes calldata data,
        address tokenAddress,
        uint16[] calldata chainIds
    ) external payable override {
        (
            address[] memory recipients,
            uint256[] memory amounts,
            string[] memory networks
        ) = abi.decode(data, (address[], uint256[], string[]));

        require(
            recipients.length == amounts.length && recipients.length == networks.length,
            "Length mismatch"
        );

        bool isNative = tokenAddress == address(0);
        uint256 total = 0;
        for (uint i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }

        if (isNative) {
            require(total == msg.value, "Mismatch total vs msg.value");
        }

        for (uint i = 0; i < recipients.length; i++) {
            if (keccak256(bytes(networks[i])) == keccak256("local")) {
                if (isNative) {
                    (bool success, ) = recipients[i].call{value: amounts[i]}("");
                    require(success, "Local transfer failed");
                } else {
                    IERC20(tokenAddress).safeTransferFrom(sender, recipients[i], amounts[i]);
                }
            } else {
                require(chainIds.length == recipients.length, "Missing chainIds");
                uint16 recipientChain = chainIds[i];
                bytes32 recipientBytes = bytes32(uint256(uint160(recipients[i])));
                uint32 nonce = uint32(block.timestamp + i);

                if (!isNative) {
                    IERC20(tokenAddress).safeTransferFrom(sender, address(this), amounts[i]);
                    IERC20(tokenAddress).approve(address(bridge), amounts[i]);
                }

                bridge.sendCrossChain{value: isNative ? amounts[i] : 0}(
                    tokenAddress,
                    amounts[i],
                    recipientChain,
                    recipientBytes,
                    nonce
                );
            }
        }

        emit PayrollDistributed(sender, recipients, amounts, networks, tokenAddress);
    }
}
