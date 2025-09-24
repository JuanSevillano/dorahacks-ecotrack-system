import { writeFile } from 'fs/promises';
import path from 'path';
import { NFTStorage, File } from "nft.storage";
import { extractEcotrackMetadata } from "./ecotrack-reader"
import { EcotrackSchema } from '@ecotrack/types/src';
import { uploadEcotrackSchemaToPinata } from "../../services/storage-provider";

export const mapEcotrackSourceDataToSchema = async (filePath: string, projectId: number): Promise<EcotrackSchema & { verdeCapSchemaUri: string }> => {
    try {
        const verdeCapSchema = await extractEcotrackMetadata({
            projectId,
            ifcModelPath: path.resolve(filePath, 'model.ifc'),
            energyXmlPath: path.resolve(filePath, 'energy.xml')
        });
        const outputDir = path.resolve("./metadata");
        const outputFile = path.join(outputDir, `ecotrack-schema-${projectId}.json`);
        await writeFile(outputFile, JSON.stringify(verdeCapSchema), "utf-8");
        const { schemaUri } = await uploadEcotrackSchemaToPinata(projectId, verdeCapSchema);

        console.log(`✅ EcoTrack schema generado en: ${outputFile}`);
        return { ...verdeCapSchema, verdeCapSchemaUri: schemaUri };
    } catch (err) {
        console.error("❌ Error generando EcoTrack schema:", err);
        return err;
    }
}