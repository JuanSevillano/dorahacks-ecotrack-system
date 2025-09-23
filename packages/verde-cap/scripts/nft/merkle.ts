import { Hex } from "viem";
import { MerkleTree } from "merkletreejs";
import { EcotrackSchema } from "@ecotrack/types/src";
import { canonicalKey, hashLeaf, nodeHash } from "./utils";

type MerkleInput = Pick<EcotrackSchema, "building" | "energy" | "geolocation"> & {
    schema_version?: number;
    project_id?: EcotrackSchema["project_id"];
    type?: EcotrackSchema["type"];
};

export const buildSchemaMerkleTree = (schema: MerkleInput) => {
    const parts: Record<string, unknown> = {};
    // Initial components to be into collection
    if (schema.building) parts["building"] = schema.building;
    if (schema.energy) parts["energy"] = schema.energy;
    if (schema.geolocation) parts["geolocation"] = schema.geolocation;

    const orderedKeys = Object.keys(parts).map(canonicalKey).sort();
    const leaves = orderedKeys.map((k) => hashLeaf(k, (parts as any)[k] ?? schema[k as keyof MerkleInput]));

    const tree = new MerkleTree(
        leaves,
        nodeHash,
        { sortPairs: true }
    );

    const merkleRoot: Hex = ("0x" + tree.getRoot().toString("hex")) as Hex;

    const proofs: Record<string, Hex[]> = {};
    orderedKeys.forEach((k, idx) => {
        const proof = tree.getProof(
            Buffer.from(leaves[idx])
        ).map((p) => ("0x" + p.data.toString("hex")) as Hex);
        proofs[k] = proof;
    });

    return { root: merkleRoot, proofs, keys: orderedKeys };
}


