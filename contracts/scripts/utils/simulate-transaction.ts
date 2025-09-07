import { Address, Hex, parseUnits } from "viem";
import { publicClient, walletClient } from "../../utilts/clients";

type SimulateTransactionParams = {
    address: Address;
    abi: any;
    functionName: string;
    args?: any[];
    value?: bigint;
};

export const simulateTransaction = async ({
    address,
    abi,
    functionName,
    args = [],
    value }: SimulateTransactionParams) => {

    try {
        const simulation = await publicClient.simulateContract({
            address,
            abi,
            functionName,
            args,
            account: walletClient.account, // cuenta que simula
            value,
        });

        console.log("\n🔍 Simulación de transacción:");
        console.log(`  - Gas usado: ${simulation.request.gas}`);
        console.log(`  - Function: ${functionName}`);
        console.log(`  - Args: ${JSON.stringify(args)}`);
        if (simulation.result) {
            console.log(`  - Result: ${simulation.result}`);
        }

        return simulation; // puedes pasarlo directo a writeContract
    } catch (err) {
        console.error("❌ Error en la simulación:", err);
        throw err;
    }
}