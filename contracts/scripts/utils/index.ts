import path from "path";
import fs from 'fs';

export const artifactPath = (rel: string) => {
    return path.join(process.cwd(), "buildContracts", rel);
}

export const loadPaymentManagerAbi = () => {
    const file = artifactPath("PaymentManager.sol/PaymentManager.json");
    if (!fs.existsSync(file)) {
        throw new Error(
            `❌ ABI de PaymentManager no encontrado en ${file}. ¿Ejecutaste "forge build"?`
        );
    }
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!json.abi) throw new Error("❌ ABI inválido para PaymentManager");
    return json.abi as any[];
}

export const hasFn = (abi: any[], name: string) => {
    return abi.some((item) => item?.type === "function" && item.name === name);
}

export const assertAddress = (label: string, addr: string) => {
    if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) {
        throw new Error(`❌ Dirección inválida para ${label}: ${addr}`);
    }
};


export * from './save-deployment';
export * from './set-payment-manager';
export * from './estimate-gas-value';
export * from './show-wallet-balance';
export * from './simulate-transaction';
