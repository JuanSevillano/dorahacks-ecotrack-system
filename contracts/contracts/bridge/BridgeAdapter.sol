// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWormholeBridge {
    function transferTokens(
        address token,
        uint256 amount,
        uint16 recipientChain,
        bytes32 recipientAddress,
        uint32 nonce
    ) external returns (uint64 sequence);
}

contract BridgeAdapter is AccessControl, Pausable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant BRIDGE_ROLE = keccak256("BRIDGE_ROLE");

    IWormholeBridge public wormhole;
    address public paymentManager;

    event CrossChainPaymentInitiated(
        address indexed sender,
        address indexed token,
        uint256 amount,
        uint16 recipientChain,
        bytes32 recipient,
        uint64 sequence
    );

    constructor(address _wormhole) {
        require(_wormhole != address(0), "Invalid wormhole address");
        wormhole = IWormholeBridge(_wormhole);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    modifier onlyPaymentManager() {
        require(msg.sender == paymentManager, "Caller is not PaymentManager");
        _;
    }

    function setPaymentManager(
        address _paymentManager
    ) external onlyRole(ADMIN_ROLE) {
        require(_paymentManager != address(0), "Invalid address");
        paymentManager = _paymentManager;
    }

    function setWormhole(address _wormhole) external onlyRole(ADMIN_ROLE) {
        require(_wormhole != address(0), "Invalid address");
        wormhole = IWormholeBridge(_wormhole);
    }

    /// @notice Envia tokens cross-chain via Wormhole
    function sendCrossChain(
        address token,
        uint256 amount,
        uint16 recipientChain,
        bytes32 recipient,
        uint32 nonce
    ) external payable whenNotPaused onlyPaymentManager returns (uint64) {
        require(amount > 0, "Amount must be > 0");
        require(token != address(0), "Token address required");

        // Transfer tokens to this contract first
        bool success = IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );
        require(success, "Token transfer failed");

        // Approve bridge
        IERC20(token).approve(address(wormhole), amount);

        // Call Wormhole transfer
        uint64 sequence = wormhole.transferTokens(
            token,
            amount,
            recipientChain,
            recipient,
            nonce
        );

        emit CrossChainPaymentInitiated(
            msg.sender,
            token,
            amount,
            recipientChain,
            recipient,
            sequence
        );
        return sequence;
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
}
