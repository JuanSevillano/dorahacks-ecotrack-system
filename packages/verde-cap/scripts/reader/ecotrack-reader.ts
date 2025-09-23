import { DataSourceTypes, ECO_ASSETS, EcotrackMaterial, EcotrackSchema } from "@ecotrack/types/src";
import { extractIFCModelData } from "./ifc";
import { extractEnergyCertificateData } from "./energy/energy-reader";
import { round, sum } from "../utils";

export const sumCarbonAndMaterials = (materials: EcotrackMaterial[]) => {
    const total_embodied_kgCO2e = round(sum(materials.map(m => m.embodied_carbon_kgCO2e)));
    return { total_embodied_kgCO2e };
};

type Params = {
    ifcModelPath: string;
    energyXmlPath: string;
    projectId: number;
};

export const extractEcotrackMetadata = async ({ ifcModelPath, energyXmlPath, projectId }: Params): Promise<EcotrackSchema> => {
    const { building } = await extractIFCModelData(ifcModelPath);
    const { address, ...energy } = await extractEnergyCertificateData(energyXmlPath);

    return {
        schema_version: 1,
        project_id: projectId,
        type: ECO_ASSETS.BUILDING,
        data_source_type: {
            type: DataSourceTypes.ifcAndXml,
            sourceUri: [''] // Uploaded IFC model + XML uris to Pinata
        },
        building,
        energy,
        geolocation: { address },
    };
};
