// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPaymentModule {
    /**
     * @dev Maneja pagos, tanto locales como cross-chain, en nativo o ERC20.
     * @param sender Dirección que envía el pago
     * @param data Datos ABI-encoded del pago (receptores, montos, redes)
     * @param tokenAddress Dirección del token (0 = nativo)
     * @param chainIds Array de chainIds para pagos cross-chain
     */
    function handlePayment(
        address sender,
        bytes calldata data,
        address tokenAddress,
        uint16[] calldata chainIds
    ) external payable;
}
