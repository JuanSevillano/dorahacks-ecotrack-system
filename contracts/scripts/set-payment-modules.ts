import { publicClient, walletClient } from "../utilts/clients";
import { assertAddress, hasFn, loadPaymentManagerAbi } from "./utils";

export async function setPaymentModules(
    paymentManager: string,
    p2pModule: string,
    payrollModule: string,
    bridgeAdapter: string
) {
    assertAddress("paymentManager", paymentManager);
    assertAddress("p2pModule", p2pModule);
    assertAddress("payrollModule", payrollModule);
    assertAddress("bridgeAdapter", bridgeAdapter);

    const managerAbi = loadPaymentManagerAbi();

    const canSetPaymentModule = hasFn(managerAbi, "setPaymentModule");
    const canGetPaymentModule = hasFn(managerAbi, "getPaymentModule");
    const canSetBridgeAdapter = hasFn(managerAbi, "setBridgeAdapter");

    if (!canSetPaymentModule && !canSetBridgeAdapter) {
        throw new Error(
            "❌ PaymentManager no expone ni setPaymentModule ni setBridgeAdapter. Revisa el ABI."
        );
    }

    const writeAndWait = async (fn: string, args: readonly unknown[]) => {
        const hash = await walletClient.writeContract({
            chain: walletClient.chain,
            address: paymentManager as `0x${string}`,
            abi: managerAbi,
            functionName: fn as any,
            args,
        });
        return publicClient.waitForTransactionReceipt({ hash });
    };

    console.log("🔗 Configurando módulos en PaymentManager:", paymentManager);

    if (canSetPaymentModule) {
        console.log("→ setPaymentModule('P2P', p2pModule)");
        await writeAndWait("setPaymentModule", ["P2P", p2pModule]);

        console.log("→ setPaymentModule('PAYROLL', payrollModule)");
        await writeAndWait("setPaymentModule", ["PAYROLL", payrollModule]);
    } else {
        console.warn("⚠️ setPaymentModule no disponible; omitiendo P2P y PAYROLL.");
    }

    if (canSetBridgeAdapter) {
        console.log("→ setBridgeAdapter(bridgeAdapter)");
        await writeAndWait("setBridgeAdapter", [bridgeAdapter]);
    } else if (canSetPaymentModule) {
        console.log("→ setPaymentModule('BRIDGE', bridgeAdapter)");
        await writeAndWait("setPaymentModule", ["BRIDGE", bridgeAdapter]);
    } else {
        console.warn("⚠️ No hay forma de configurar bridge en este ABI.");
    }

    if (canGetPaymentModule) {
        try {
            const p2pRead = await publicClient.readContract({
                address: paymentManager as `0x${string}`,
                abi: managerAbi,
                functionName: "getPaymentModule",
                args: ["P2P"],
            });
            const payrollRead = await publicClient.readContract({
                address: paymentManager as `0x${string}`,
                abi: managerAbi,
                functionName: "getPaymentModule",
                args: ["PAYROLL"],
            });

            console.log("✅ Verificación:");
            console.log("   P2P    ->", p2pRead);
            console.log("   PAYROLL->", payrollRead);
        } catch {
            console.warn("ℹ️ No se pudo verificar con getPaymentModule.");
        }
    }

    console.log("✅ Módulos configurados correctamente.");
}
