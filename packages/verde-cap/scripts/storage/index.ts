import fs from "fs-extra";
import path from "path";
import { keccak256, toBytes } from "viem";
import { MerkleTree } from "merkletreejs";
import { Provider, uploadJSON } from "../../services/storage-provider";

type EcotrackSchema = Record<string, any>;

const canonicalKey = (k: string) => k.toLowerCase();

function hashLeaf(key: string, cid: string): Uint8Array {
    const input = toBytes(`${key}:${cid}`);
    return keccak256(input, "bytes"); // retorna Uint8Array
}

function buildMerkleTree(leaves: Uint8Array[]) {
    const tree = new MerkleTree(
        leaves.map(l => Buffer.from(l)),
        (d: Buffer) => Buffer.from(keccak256(new Uint8Array(d)).slice(2), "hex"),
        { sortPairs: true }
    );
    return tree;
}

const createManifest = async (schema: EcotrackSchema, outDir: string, providers: Provider[] = ["pinata"]) => {
    await fs.ensureDir(outDir);
    const reserved = new Set(["schema_version", "project_id", "type"]);
    const parts: Record<string, { uri: string; provider: string }> = {};

    const keys = Object.keys(schema)
        .filter(k => !reserved.has(k))
        .filter(k => schema[k] != null)
        .map(canonicalKey)
        .sort();

    // subir cada parte
    for (const key of keys) {
        const filename = `${key}.json`;
        const content = schema[key];
        await fs.writeFile(path.join(outDir, filename), JSON.stringify(content, null, 2));

        let uploaded;
        for (const p of providers) {
            try {
                uploaded = await uploadJSON(p, filename, content);
                break;
            } catch (err) {
                console.warn(`Failed upload ${key} to ${p}:`, (err as Error).message);
            }
        }
        if (!uploaded) throw new Error(`Could not upload part ${key}`);

        parts[key] = { uri: uploaded.uri, provider: uploaded.provider };
    }

    // construir Merkle root
    const leaves = keys.map(k => hashLeaf(k, parts[k].uri));
    const tree = buildMerkleTree(leaves);
    const merkleRoot = "0x" + tree.getRoot().toString("hex");

    const manifest = {
        schema_version: schema.schema_version,
        project_id: schema.project_id,
        asset_type: schema.type,
        merkle_root: merkleRoot,
        parts,
        created_at: new Date().toISOString(),
    };

    const manifestPath = path.join(outDir, "manifest.json");
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

    console.log("Manifest:", manifest);
    return { manifest, merkleRoot };
}
