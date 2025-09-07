// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IPaymentModule.sol";
import "../bridge/BridgeAdapter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract P2PPayment is IPaymentModule {
    using SafeERC20 for IERC20;

    BridgeAdapter public bridge;

    event P2PPaymentSent(
        address indexed from,
        address indexed to,
        uint256 amount,
        string network,
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
        (address recipient, uint256 amount, string memory network) = abi.decode(
            data,
            (address, uint256, string)
        );

        bool isNative = tokenAddress == address(0);

        if (isNative) {
            require(amount == msg.value, "Mismatch amount vs msg.value");
        }

        if (keccak256(bytes(network)) == keccak256("local")) {
            if (isNative) {
                (bool success, ) = recipient.call{value: amount}("");
                require(success, "Local transfer failed");
            } else {
                IERC20(tokenAddress).safeTransferFrom(sender, recipient, amount);
            }
        } else {
            require(chainIds.length == 1, "Missing chainId");
            uint16 recipientChain = chainIds[0];
            bytes32 recipientBytes = bytes32(uint256(uint160(recipient)));
            uint32 nonce = uint32(block.timestamp);

            if (!isNative) {
                IERC20(tokenAddress).safeTransferFrom(sender, address(this), amount);
                IERC20(tokenAddress).approve(address(bridge), amount);
            }

            bridge.sendCrossChain{value: isNative ? amount : 0}(
                tokenAddress,
                amount,
                recipientChain,
                recipientBytes,
                nonce
            );
        }

        emit P2PPaymentSent(sender, recipient, amount, network, tokenAddress);
    }
}
