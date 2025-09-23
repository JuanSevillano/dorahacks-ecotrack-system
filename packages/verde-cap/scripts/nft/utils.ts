import stringify from "fast-json-stable-stringify";
import { keccak256, toBytes } from "viem";

export const canonicalKey = (k: string) => k.toLowerCase();

export const hashLeaf = (key: string, value: unknown): Buffer => {
    const canonical = `${canonicalKey(key)}:${stringify(value)}`;
    const hashed = keccak256(toBytes(canonical));
    return Buffer.from(hashed.slice(2), "hex");
}

export const nodeHash = (data: Buffer): Buffer => {
    const hashed = keccak256(new Uint8Array(data));
    return Buffer.from(hashed.slice(2), "hex");
}


