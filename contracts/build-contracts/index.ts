// buildContracts/index.ts
import fs from "fs";
import path from "path";

function loadArtifact(contractName: string) {
    const filePath = path.join(process.cwd(), "buildContracts", `${contractName}.sol/${contractName}.json`);
    if (!fs.existsSync(filePath)) throw new Error(`${contractName} not found in out/`);
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return { abi: json.abi, bytecode: json.bytecode };
}

export const PaymentManager = loadArtifact("PaymentManager");
export const P2PPayment = loadArtifact("P2PPayment");
export const PayrollPayment = loadArtifact("PayrollPayment");
export const BridgeAdapter = loadArtifact("BridgeAdapter");
