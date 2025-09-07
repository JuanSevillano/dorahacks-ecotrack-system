import { contractsConfig as contractsToDeploy } from "./config";
import { deployContract } from "./deploy-contract";
import { setPaymentModules } from "./set-payment-modules";
import { saveDeployment } from "./utils/save-deployment";
import { estimateGasDeploy, setPaymentManager } from "./utils";
import { prompt } from "enquirer";
import { showWalletBalance } from "./utils/show-wallet-balance";

type Arg =
    | string
    | number
    | bigint
    | boolean
    | { contract: string }      // placeholder que resolvemos
    | any;                      // otros tipos simples si los hubiera

function resolveArgs(args: Arg[] = [], deployed: Record<string, string>): any[] {
    return args.map((arg) => {
        if (arg && typeof arg === "object" && "contract" in arg) {
            const depName = (arg as { contract: string }).contract;
            const depAddr = deployed[depName];
            if (!depAddr) {
                throw new Error(`❌ Dependency not found: ${depName} (necesaria para la estimate)`);
            }
            return depAddr; // address string 0x...
        }
        return arg;
    });
}


async function main() {
    console.log("🌍 Starting deployment...");

    const deployed: Record<string, string> = {};

    await showWalletBalance();

    for (const contract of contractsToDeploy) {

        const resolvedArgs = resolveArgs(contract.args as any[], deployed);

        const { gasWithBuffer } = await estimateGasDeploy({
            abi: contract.abi,
            bytecode: contract.bytecode.object as `0x${string}`,
            args: resolvedArgs,
        });

        const { approve } = await prompt<{ approve: boolean }>({
            type: "confirm",
            name: "approve",
            message: `¿Quieres desplegar ${contract.name} con gas estimado ${gasWithBuffer}? +(20%) regular gas`,
        });

        if (!approve) {
            console.log(`⏹ Saltando deploy de ${contract.name}`);
            continue;
        }

        const options = { gas: gasWithBuffer } as const;
        const address = await deployContract({ ...contract, options }, deployed);
        deployed[contract.name] = address;
    }

    await setPaymentModules(
        deployed["PaymentManager"],
        deployed["P2PPayment"],
        deployed["PayrollPayment"],
        deployed["BridgeAdapter"],
    );

    await setPaymentManager(deployed);

    // 🚀 Guardamos el resultado en deployments/amoy.json
    saveDeployment("amoy", deployed);

    console.log("🎉 Deployment finished successfully!");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
