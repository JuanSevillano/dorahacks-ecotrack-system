import fs from "fs-extra";
import path from "path";
import { Address } from "viem";

export type DeploymentRecord = Readonly<{
    contractName: string;
    contractAddress: Address;
    txHash: string;
    account: string;
    network: string;
    chainId?: number;
    blockNumber?: bigint;
    blockHash?: string;
    args?: unknown[];
    abi?: unknown;
    bytecode?: string;
    libraries?: Record<string, string>;
    metadata?: Record<string, unknown>;
    timestamp: string; // ISO
}>;

export type NetworkDeployments = {
    network: string;
    records: DeploymentRecord[];
};

const DEPLOYMENTS_DIR = path.resolve(path.dirname("./"), "deployments");

const ensureDir = async (dir: string) => {
    await fs.ensureDir(dir);
};

const getNetworkFile = (network: string) => path.join(DEPLOYMENTS_DIR, `${network}.json`);

export async function loadNetworkDeployments(network: string): Promise<NetworkDeployments> {
    await ensureDir(DEPLOYMENTS_DIR);
    const file = getNetworkFile(network);
    if (!(await fs.pathExists(file))) {
        return { network, records: [] };
    }
    try {
        const json = await fs.readFile(file, "utf-8");
        const parsed = JSON.parse(json) as NetworkDeployments;
        return parsed?.records ? parsed : { network, records: [] };
    } catch {
        return { network, records: [] };
    }
}

export async function saveDeploymentRecord(record: DeploymentRecord) {
    await ensureDir(DEPLOYMENTS_DIR);
    const file = getNetworkFile(record.network);
    const existing = await loadNetworkDeployments(record.network);

    // dedupe by txHash or contractAddress + blockNumber
    const isSame = (a: DeploymentRecord, b: DeploymentRecord) =>
        a.txHash === b.txHash || (a.contractAddress.toLowerCase() === b.contractAddress.toLowerCase() && a.blockNumber === b.blockNumber);

    const nextRecords = existing.records.filter(r => !isSame(r, record));
    nextRecords.push(record);

    // stable sort by blockNumber then timestamp
    nextRecords.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

    const out: NetworkDeployments = { network: record.network, records: nextRecords };
    await fs.writeFile(file, JSON.stringify(out, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
        , 0));

    // also write per-contract pointer with latest
    const perContractDir = path.join(DEPLOYMENTS_DIR, record.network);
    await ensureDir(perContractDir);
    const contractFile = path.join(perContractDir, `${record.contractName}.json`);
    const history = nextRecords.filter(r => r.contractName === record.contractName);
    const latest = history[history.length - 1];
    await fs.writeFile(contractFile, JSON.stringify({ latest, history }, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
        , 2));

    return record;
}

export function buildDeploymentRecord(input: Omit<DeploymentRecord, "timestamp"> & { timestamp?: string }): DeploymentRecord {
    return {
        ...input,
        timestamp: input.timestamp ?? new Date().toISOString()
    };
}


