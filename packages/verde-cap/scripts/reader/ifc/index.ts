import { IfcAPI } from "web-ifc";
import fs from 'fs';
import { extractMaterials } from "./generic/extract-materials";
import { extractTotalArea } from "./houses/extract-area";
import { extractFloors } from "./houses/extract-floors";
import { extractBedrooms } from "./houses/extract-bedrooms";
import { extractStructuralMaterialsVolumes } from "./houses/main-structural-material";
import { extractIsolationBuilding } from "./houses/extract-isolation";

export const extractIFCModelData = async (filePath: string) => {
    const ifcApi = new IfcAPI();
    await ifcApi.Init();
    const modelData = fs.readFileSync(filePath);
    const modelID = ifcApi.OpenModel(modelData);

    const materials = await extractMaterials(ifcApi, modelID);
    const total_area_m2 = await extractTotalArea(ifcApi, modelID);
    const structureVolume = await extractStructuralMaterialsVolumes(ifcApi, modelID);
    const isolationMaterial = await extractIsolationBuilding(ifcApi, modelID);

    const storeys = await extractFloors(ifcApi, modelID);

    ifcApi.CloseModel(modelID);
    return {
        materials,
        building: {
            storeys,
            total_area_m2,
            structureVolume,
            isolationMaterial
        },
    }
}