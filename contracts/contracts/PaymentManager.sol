// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./modules/IPaymentModule.sol";
import "./bridge/BridgeAdapter.sol";

contract PaymentManager is AccessControl, Pausable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    mapping(string => IPaymentModule) public paymentModules;
    BridgeAdapter public bridge;

    event PaymentDelegated(
        address indexed from,
        string paymentType,
        uint256 value,
        address token,
        uint16[] chainIds
    );
    event ModuleUpdated(string paymentType, address module);

    constructor(address _bridge) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        bridge = BridgeAdapter(_bridge);
    }

    function sendPayment(
        string calldata paymentType,
        bytes calldata data,
        address tokenAddress,
        uint16[] calldata chainIds
    ) external payable whenNotPaused {
        // Validaciones
        if (tokenAddress == address(0)) {
            require(msg.value > 0, "Zero value for native token");
        }

        IPaymentModule module = paymentModules[paymentType];
        require(address(module) != address(0), "Unknown payment type");

        // Llamada al módulo con la firma correcta
        module.handlePayment{value: tokenAddress == address(0) ? msg.value : 0}(
            msg.sender,
            data,
            tokenAddress,
            chainIds
        );

        emit PaymentDelegated(msg.sender, paymentType, msg.value, tokenAddress, chainIds);
    }

    function setPaymentModule(string calldata paymentType, address module) external onlyRole(ADMIN_ROLE) {
        require(module != address(0), "Zero address");
        paymentModules[paymentType] = IPaymentModule(module);
        emit ModuleUpdated(paymentType, module);
    }

    function updateBridge(address _bridge) external onlyRole(ADMIN_ROLE) {
        bridge = BridgeAdapter(_bridge);
    }

    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }
}
