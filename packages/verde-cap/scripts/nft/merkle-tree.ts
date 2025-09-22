import { keccak256 } from "viem";
import { toBytes } from "viem";
import { MerkleTree } from "merkletreejs";

export const canonicalKey = (key: string) => key.trim().toLowerCase()

export function leafHashBuffer(key: string, uri: string): Buffer {
    const input = `${canonicalKey(key)}:${uri}`;
    const hex = keccak256(toBytes(input)); // 0x...
    return Buffer.from(hex.slice(2), "hex");
}

export const buildMerkleTreeFromLeaves = (buffers: Buffer[]) => new MerkleTree(buffers, (d: Buffer) => {
    const hex = keccak256(new Uint8Array(d));
    return Buffer.from(hex.slice(2), "hex");
}, { sortPairs: true });


export function merkleRootHexFromLeaves(buffers: Buffer[]): string {
    if (buffers.length === 0) return "0x" + keccak256(toBytes("")).slice(2); // convención
    const tree = buildMerkleTreeFromLeaves(buffers);
    return "0x" + tree.getRoot().toString("hex");
}

export function proofsForLeaves(buffers: Buffer[]) {
    const tree = buildMerkleTreeFromLeaves(buffers);
    return buffers.map(b => tree.getProof(b).map(p => "0x" + p.data.toString("hex")));
}

export function proofForLeaf(buffers: Buffer[], index: number) {
    const tree = buildMerkleTreeFromLeaves(buffers);
    return tree.getProof(buffers[index]).map(p => "0x" + p.data.toString("hex"));
}
