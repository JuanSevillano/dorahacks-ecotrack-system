import fs from 'fs/promises';
import path from 'path';
import { extractEcotrackMetadata } from "./ecotrack-reader"

export const mapEcotrackSourceDataToSchema = async () => {
    try {
        console.log('Buscando en ruta: ', path.resolve('./', 'assets/model.ifc'));
        const verdeCapSchema = extractEcotrackMetadata({
            ifcModelPath: path.resolve('./', 'assets/model.ifc'),
            energyXmlPath: path.resolve('./', 'assets/energy.xml')
        });
        const outputDir = path.resolve("./metadata");
        const outputFile = path.join(outputDir, "ecotrack-schema.json");
        await fs.writeFile(outputFile, JSON.stringify(verdeCapSchema), "utf-8");

        console.log(`✅ EcoTrack schema generado en: ${outputFile}`);
    } catch (err) {
        console.error("❌ Error generando EcoTrack schema:", err);
    }
}


mapEcotrackSourceDataToSchema();