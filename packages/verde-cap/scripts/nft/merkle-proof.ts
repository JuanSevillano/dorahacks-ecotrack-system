import { Hex } from "viem";
import { MerkleTree } from "merkletreejs";
import { canonicalKey, hashLeaf, nodeHash } from "./utils";

export const verifySchemaPartProof = ({ root, key, value, proof }: { root: Hex, key: string, value: unknown, proof: Hex[] }): boolean => {
    const tree = new MerkleTree([], nodeHash, { sortPairs: true });
    const leaf = hashLeaf(key, value);
    const proofBuffers = proof.map(p => Buffer.from(p.slice(2), "hex"));
    const rootBuf = Buffer.from(root.slice(2), "hex");
    return tree.verify(proofBuffers, leaf, rootBuf);
}

export const computeRootFromParts = (parts: Record<string, unknown>): Hex => {
    const keys = Object.keys(parts).map(canonicalKey).sort();
    const leaves = keys.map(k => hashLeaf(k, (parts as any)[k]));
    const tree = new MerkleTree(leaves, nodeHash, { sortPairs: true });
    return ("0x" + tree.getRoot().toString("hex")) as Hex;
}

export const verifyRootMatchesParts = ({ root, parts }: { root: Hex, parts: Record<string, unknown> }): boolean => {
    const computed = computeRootFromParts(parts);
    return computed.toLowerCase() === root.toLowerCase();
}

export const verifyManifest = ({
    merkle_root,
    parts,
    proofs
}: {
    merkle_root: Hex,
    parts: Record<string, { uri?: string; provider?: string } | unknown>,
    proofs?: Record<string, Hex[]>
}) => {
    // Accept both shapes: parts as values or parts as { uri }
    const normalized: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(parts)) {
        if (v && typeof v === "object" && "uri" in (v as any)) {
            normalized[k] = (v as any).uri;
        } else {
            normalized[k] = v as unknown;
        }
    }

    const results: Record<string, boolean> = {};
    if (proofs) {
        for (const [k, p] of Object.entries(proofs)) {
            results[k] = verifySchemaPartProof({ root: merkle_root, key: k, value: normalized[k], proof: p });
        }
        const allValid = Object.values(results).every(Boolean);
        return { valid: allValid, results };
    }

    // Fallback: recompute from parts and compare
    const valid = verifyRootMatchesParts({ root: merkle_root, parts: normalized });
    for (const k of Object.keys(normalized)) results[k] = valid;
    return { valid, results };
}


