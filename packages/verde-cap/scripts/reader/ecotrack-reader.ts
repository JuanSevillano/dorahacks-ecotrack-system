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
};

export const extractEcotrackMetadata = async ({ ifcModelPath, energyXmlPath }: Params): Promise<EcotrackSchema> => {
    const sourceDataType = `${DataSourceTypes.ifc} + ${DataSourceTypes.xml}`;
    const { materials, building } = await extractIFCModelData(ifcModelPath);
    const { total_embodied_kgCO2e } = sumCarbonAndMaterials(materials);
    const { address, ...energy } = await extractEnergyCertificateData(energyXmlPath);

    return {
        schema_version: 1,
        project_id: '', // TODO: where come from? generate hash here? 
        type: ECO_ASSETS.BUILDING,
        data_source_type: sourceDataType,
        materials,
        building,
        energy,
        geolocation: { address },
        carbon: {
            total_embodied_kgCO2e,
            avoided_emissions_vs_conventional_kgCO2e: 0,
            offset_mechanisms: ['']
        }
    };
};
