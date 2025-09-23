import { writeFile } from 'fs/promises';
import path from 'path';
import { NFTStorage, File } from "nft.storage";
import { extractEcotrackMetadata } from "./ecotrack-reader"
import { EcotrackSchema } from '@ecotrack/types/src';

export const mapEcotrackSourceDataToSchema = async (filePath: string, projectId: number) => {
    try {
        console.log('Buscando en ruta: ', path.resolve(filePath, 'model.ifc'));
        const verdeCapSchema = await extractEcotrackMetadata({
            projectId,
            ifcModelPath: path.resolve(filePath, 'model.ifc'),
            energyXmlPath: path.resolve(filePath, 'energy.xml')
        });
        const outputDir = path.resolve("./metadata");
        const outputFile = path.join(outputDir, `ecotrack-schema-${projectId}.json`);
        await writeFile(outputFile, JSON.stringify(verdeCapSchema), "utf-8");

        console.log(`✅ EcoTrack schema generado en: ${outputFile}`);
        return verdeCapSchema;
    } catch (err) {
        console.error("❌ Error generando EcoTrack schema:", err);
    }
}

async function createManifest(schema: EcotrackSchema) {
    const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || "";
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    const parts: Record<string, string> = {};

    for (const [key, value] of Object.entries(schema)) {
        if (["schema_version", "project_id", "type"].includes(key)) continue;
        if (!value) continue;
        const jsonStr = JSON.stringify(value, null, 2);
        const file = new File([jsonStr], `${key}.json`, { type: "application/json" });
        const cid = await client.storeBlob(file);
        parts[key] = `ipfs://${cid}`;
        console.log(`✔ ${key} subido a ${parts[key]}`);
    }

    const manifest = {
        schema_version: schema.schema_version,
        project_id: schema.project_id,
        asset_type: schema.type,
        components: parts,
        created_at: new Date().toISOString(),
    };
    const stringified = JSON.stringify(manifest, null, 2);
    const manifestFile = new File([stringified], "manifest.json", { type: "application/json" });

    const manifestCid = await client.storeBlob(manifestFile);
    console.log(`📦 Manifest CID: ipfs://${manifestCid}`);

    return {
        manifest,
        manifestCid,
    };
}