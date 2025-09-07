import { Address, encodeFunctionData, parseAbi } from "viem";
import { BridgeAdapter } from "../../build-contracts";
import { publicClient, walletClient } from "../../utilts/clients";

export const setPaymentManager = async (deployed: Record<string, string>) => {

    const data = encodeFunctionData({
        abi: BridgeAdapter.abi,
        functionName: "setPaymentManager",
        args: [deployed['PaymentManager']],
    });

    const txHash = await walletClient.sendTransaction({
        to: deployed['BridgeAdapter'] as `0x${string}`,
        data,
    });

    await publicClient.waitForTransactionReceipt({
        hash: txHash
    });

    console.log("✅ PaymentManager set in BridgeAdapter");
}
