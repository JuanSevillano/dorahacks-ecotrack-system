// src/manifest/generator.ts
import fs from "fs-extra";
import path from "path";
import stringify from "fast-json-stable-stringify";
import { createProvider, StorageProvider, StorageProviderKey } from "../storage";
import { EcotrackSchema, VerdeCapMetadata, NFTBase } from "../types";
import { leafHashBuffer, merkleRootHexFromLeaves, proofsForLeaves, canonicalKey } from "../merkle";

type CreateManifestResult = {
  manifest: VerdeCapMetadata;
  manifestUri?: string;
  partsLocalPaths: Record<string, string>;
  partsProviders: Record<string, { uri: string; provider: string }>;
  proofs: Record<string, { leaf: string; proof: string[] }>;
};

/**
 * createVerdeCapSchema
 * - Fragmenta el ecotrack schema en componentes (según keys)
 * - Serializa (stable) cada componente
 */
export function createVerdeCapSchema(schema: EcotrackSchema) {
  // reservadas
  const reserved = new Set(["schema_version", "project_id", "type"]);
  const keys = Object.keys(schema)
    .filter(k => !reserved.has(k))
    .filter(k => schema[k] !== undefined && schema[k] !== null)
    .map(k => canonicalKey(k))
    .sort();

  const components: Record<string, any> = {};
  for (const k of keys) {
    components[k] = schema[k];
  }

  return {
    version: "verdecap-v1",
    schema_version: schema.schema_version,
    project_id: schema.project_id,
    asset_type: schema.type,
    components
  };
}

/**
 * uploadParts
 * - recibe providerKeys ordenados (ej: ["nftstorage","pinata"])
 * - sube cada componente en orden determinista
 */
export async function uploadParts(
  verdecap: ReturnType<typeof createVerdeCapSchema>,
  outDir: string,
  providerKeys: StorageProviderKey[]
) {
  await fs.ensureDir(outDir);
  const partsProviders: Record<string, { uri: string; provider: string }> = {};
  const localPaths: Record<string, string> = {};
  for (const [key, value] of Object.entries(verdecap.components)) {
    const filename = `${key}.json`;
    const stableJson = stringify(value, { space: 2 });
    const localPath = path.join(outDir, filename);
    await fs.writeFile(localPath, stableJson, "utf8");
    localPaths[key] = localPath;

    let uploaded: { uri: string; provider: string } | undefined;
    for (const pk of providerKeys) {
      try {
        const provider = createProvider(pk);
        const res = await provider.uploadJSON(filename, JSON.parse(stableJson));
        uploaded = { uri: res.uri, provider: res.provider };
        break;
      } catch (err) {
        console.warn(`uploadParts: failed for ${filename} -> ${pk}:`, (err as Error).message);
      }
    }
    if (!uploaded) throw new Error(`uploadParts: no provider succeeded for ${key}`);
    partsProviders[key] = uploaded;
  }
  return { partsProviders, localPaths };
}

/**
 * createRoot + manifest + uploadManifest
 *
 * - calcula hojas = keccak256(canonicalKey + ":" + uri)
 * - crea merkle root
 * - arma manifest object (VerdeCapMetadata)
 * - sube manifest si se indica providers
 */
export async function createManifest(
  verdecapSchema: ReturnType<typeof createVerdeCapSchema>,
  partsProviders: Record<string, { uri: string; provider: string }>,
  outDir: string,
  providerKeysForManifest: StorageProviderKey[] = ["nftstorage"]
): Promise<CreateManifestResult> {
  // leaves en orden determinista por key
  const keys = Object.keys(verdecapSchema.components).map(k => canonicalKey(k)).sort();
  const leaves = keys.map(k => leafHashBuffer(k, partsProviders[k].uri));
  const merkleRoot = merkleRootHexFromLeaves(leaves);

  // construir manifest (verdecap metadata)
  const manifest: VerdeCapMetadata = {
    version: "verdecap-v1",
    manifest_uri: undefined,
    merkle_root: merkleRoot,
    components: Object.fromEntries(
      keys.map(k => [k, { uri: partsProviders[k].uri, provider: partsProviders[k].provider }])
    ),
    created_at: new Date().toISOString(),
    schema_version: verdecapSchema.schema_version
  };

  // guardar local manifest
  const manifestPath = path.join(outDir, "verdecap.manifest.json");
  await fs.writeFile(manifestPath, stringify(manifest, { space: 2 }), "utf8");

  // subir manifest a providers (prioridad en el orden)
  let manifestUri: string | undefined;
  for (const pk of providerKeysForManifest) {
    try {
      const prov = createProvider(pk);
      const res = await prov.uploadJSON("verdecap.manifest.json", manifest);
      manifestUri = res.uri;
      manifest.manifest_uri = manifestUri;
      // re-guardar con manifest_uri
      await fs.writeFile(manifestPath, stringify(manifest, { space: 2 }), "utf8");
      break;
    } catch (err) {
      console.warn("createManifest: manifest upload failed for", pk, (err as Error).message);
    }
  }

  // preparar proofs por componente
  const proofsArr = proofsForLeaves(leaves);
  const proofs: Record<string, { leaf: string; proof: string[] }> = {};
  for (let i = 0; i < keys.length; i++) {
    proofs[keys[i]] = {
      leaf: "0x" + leaves[i].toString("hex"),
      proof: proofsArr[i]
    };
  }

  return {
    manifest,
    manifestUri,
    partsLocalPaths: Object.fromEntries(keys.map(k => [k, path.join(outDir, `${k}.json`)])),
    partsProviders: Object.fromEntries(keys.map(k => [k, partsProviders[k]])),
    proofs
  };
}

/**
 * createNFTMetadata
 * - combina NFTBase + verdecap manifest (incrustando verdecap metadata)
 * - NO sube la NFT metadata; devuelve el objeto listo para subir si quieres
 */
export function createNFTMetadata(base: NFTBase, verdecapManifest: VerdeCapMetadata) {
  const combined = {
    name: base.name,
    description: base.description,
    image: base.image,
    external_url: base.external_url,
    attributes: base.attributes,
    verdecap: {
      version: verdecapManifest.version,
      manifest_uri: verdecapManifest.manifest_uri,
      merkle_root: verdecapManifest.merkle_root,
      components: verdecapManifest.components,
      created_at: verdecapManifest.created_at,
      schema_version: verdecapManifest.schema_version
    }
  };
  // fingerprint hash (opcional): keccak256(manifest_uri + merkle_root)
  return combined;
}
