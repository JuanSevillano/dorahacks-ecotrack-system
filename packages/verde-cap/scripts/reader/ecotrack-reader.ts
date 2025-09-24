import { DataSourceTypes, ECO_ASSETS, EcotrackMaterial, EcotrackSchema } from "@ecotrack/types/src";
import { extractIFCModelData } from "./ifc";
import { extractEnergyCertificateData } from "./energy/energy-reader";
import { round, sum } from "../utils";
import { uploadProjectSourcesToPinata } from "../../services/storage-provider";

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
    const { modelUri, energyUri } = await uploadProjectSourcesToPinata({
        projectId,
        ifcPath: ifcModelPath,
        xmlPath: energyXmlPath,
    });

    return {
        schema_version: 1,
        project_id: projectId,
        type: ECO_ASSETS.BUILDING,
        data_source_type: {
            type: DataSourceTypes.ifcAndXml,
            sourceUri: [modelUri, energyUri]
        },
        building,
        energy,
        geolocation: { address },
    };
};
