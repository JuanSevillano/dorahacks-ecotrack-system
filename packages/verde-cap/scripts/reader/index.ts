import { writeFile } from 'fs/promises';
import path from 'path';
import { NFTStorage, File } from "nft.storage";
import { extractEcotrackMetadata } from "./ecotrack-reader"
import { EcotrackSchema } from '@ecotrack/types/src';

export const mapEcotrackSourceDataToSchema = async (filePath: string) => {
    try {
        console.log('Buscando en ruta: ', path.resolve(filePath, 'model.ifc'));
        const verdeCapSchema = await extractEcotrackMetadata({
            ifcModelPath: path.resolve(filePath, 'model.ifc'),
            energyXmlPath: path.resolve(filePath, 'energy.xml')
        });
        const outputDir = path.resolve("./metadata");
        const outputFile = path.join(outputDir, "ecotrack-schema.json");
        await writeFile(outputFile, JSON.stringify(verdeCapSchema), "utf-8");

        console.log(`✅ EcoTrack schema generado en: ${outputFile}`);
        return verdeCapSchema;
    } catch (err) {
        console.error("❌ Error generando EcoTrack schema:", err);
    }
}

// --- Función principal ---
async function createManifest(schema: EcotrackSchema) {
    // 🔑 Necesitas un API key de NFT.Storage
    const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || "";

    // Cliente NFT.Storage
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });


    const parts: Record<string, string> = {};

    // 1. Dividimos en archivos por sección
    for (const [key, value] of Object.entries(schema)) {
        if (["schema_version", "project_id", "type"].includes(key)) continue;
        if (!value) continue;

        const jsonStr = JSON.stringify(value, null, 2);
        const file = new File([jsonStr], `${key}.json`, { type: "application/json" });

        // 2. Subimos cada parte a IPFS
        const cid = await client.storeBlob(file);
        parts[key] = `ipfs://${cid}`;
        console.log(`✔ ${key} subido a ${parts[key]}`);
    }

    // 3. Construimos el manifest
    const manifest = {
        schema_version: schema.schema_version,
        project_id: schema.project_id,
        asset_type: schema.type,
        parts,
        created_at: new Date().toISOString(),
    };

    // 4. Subimos manifest.json
    const manifestFile = new File(
        [JSON.stringify(manifest, null, 2)],
        "manifest.json",
        { type: "application/json" }
    );

    const manifestCid = await client.storeBlob(manifestFile);
    console.log(`📦 Manifest CID: ipfs://${manifestCid}`);

    return {
        manifest,
        manifestCid,
    };
}