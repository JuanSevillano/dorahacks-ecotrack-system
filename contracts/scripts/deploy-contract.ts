import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { publicClient, walletClient } from "../utilts/clients";
import { Address, ContractConfig } from "./types";

const normalizeBytecode = (bytecode: any): Address => {
    if (typeof bytecode === "string") {
        return bytecode.startsWith("0x") ? bytecode as Address : `0x${bytecode}`;
    }
    if (bytecode?.object) {
        return bytecode.object.startsWith("0x") ? bytecode.object : `0x${bytecode.object}` as Address;
    }
    throw new Error("Invalid bytecode format");
}

export async function deployContract({ name, abi, bytecode, args = [], options }: ContractConfig, deployed: Record<string, string>) {
    console.log(`🚀 Deploying ${name}...`);

    // Resolver dependencias de args
    const resolvedArgs = args.map((arg) => {
        if (typeof arg === "object" && "contract" in arg) {
            const dep = deployed[arg.contract];
            console.log('DEP:', JSON.stringify(dep))
            if (!dep) {
                throw new Error(
                    `❌ Dependency not found: ${arg.contract} (needed for ${name})`
                );
            }
            return dep;
        }
        return arg;
    });

    const normalizedBytecode = normalizeBytecode(bytecode);
    const hash = await walletClient.deployContract({
        abi,
        args: resolvedArgs,
        chain: walletClient.chain,
        bytecode: normalizedBytecode,
        gas: options?.gas
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    const address = receipt.contractAddress!;

    console.log(`✅ ${name} deployed at: ${address}`);

    // Save deployment
    const dir = path.resolve("deployments");
    if (!existsSync(dir)) mkdirSync(dir);
    writeFileSync(
        path.join(dir, `${name}.json`),
        JSON.stringify({ address, abi }, null, 2)
    );

    return address;
}
