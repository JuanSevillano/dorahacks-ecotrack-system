import { useContractWrite, usePrepareContractWrite, useContractRead } from 'wagmi';
import { Address } from 'wagmi';
import PaymentManagerABI from '../../../contracts/PaymentManager.sol/PaymentManager.json';

const PAYMENT_MANAGER_ADDRESS: Address = '0x...'; // Dirección desplegada

export function usePaymentManager() {
    // Ejemplo: leer módulo de P2P
    const { data: p2pModule } = useContractRead({
        address: PAYMENT_MANAGER_ADDRESS,
        abi: PaymentManagerABI.abi,
        functionName: 'paymentModules',
        args: ['P2P'],
    });

    return { p2pModule };
}
