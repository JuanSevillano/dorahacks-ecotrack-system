import { keccak256 } from "viem";
import { toBytes } from "viem";
import { MerkleTree } from "merkletreejs";

/**
 * Normaliza la key (canonical)
 */
export function canonicalKey(k: string) {
    return k.trim().toLowerCase();
}

/**
 * Crea el leaf buffer a partir de key + ":" + uri
 */
export function leafHashBuffer(key: string, uri: string): Buffer {
    const input = `${canonicalKey(key)}:${uri}`;
    const hex = keccak256(toBytes(input)); // 0x...
    return Buffer.from(hex.slice(2), "hex");
}

/**
 * Crea Merkle tree (sortPairs: true) desde leaves[]
 */
export function buildMerkleTreeFromLeaves(buffers: Buffer[]) {
    const tree = new MerkleTree(buffers, (d: Buffer) => {
        // merkletreejs passes Buffer; we hash it using keccak256 and return Buffer
        const hex = keccak256(new Uint8Array(d));
        return Buffer.from(hex.slice(2), "hex");
    }, { sortPairs: true });
    return tree;
}

/**
 * Helpers para root y proofs
 */
export function merkleRootHexFromLeaves(buffers: Buffer[]): string {
    if (buffers.length === 0) return "0x" + keccak256(toUtf8Bytes("")).slice(2); // convención
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
