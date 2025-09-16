import { IfcAPI } from "web-ifc";
import fs from 'fs';
import { extractMaterials } from "./generic/extract-materials";
import { extractTotalArea } from "./houses/extract-area";
import { extractFloors } from "./houses/extract-floors";
import { extractBedrooms } from "./houses/extract-bedrooms";
import { extractGeolocation } from "./generic/extract-geolocation";

export const extractIFCModelData = async (filePath: string) => {
    const ifcApi = new IfcAPI();
    await ifcApi.Init();
    const modelData = fs.readFileSync(filePath);
    const modelID = ifcApi.OpenModel(modelData);

    const materials = await extractMaterials(ifcApi, modelID);
    const total_area_m2 = await extractTotalArea(ifcApi, modelID);
    const storeys = await extractFloors(ifcApi, modelID);
    const bedrooms = await extractBedrooms(ifcApi, modelID);
    const geolocation = await extractGeolocation(ifcApi, modelID);

    ifcApi.CloseModel(modelID);
    return {
        materials,
        geolocation,
        building: {
            storeys,
            bedrooms,
            total_area_m2,
        },
    }
}