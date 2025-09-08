import { DataSourceTypes, ECO_ASSETS, EcotrackSchema } from "@ecotrack/types";
import { extractIFCModelData } from "./ifc";

export const extractEcotrackMetadata = async (filePath: string): Promise<EcotrackSchema> => {
    const { materials, building, geolocation } = await extractIFCModelData(filePath);
    const sourceDataType = `${DataSourceTypes.ifc} + ${DataSourceTypes.xml}`;
    return {
        schema_version: 1,
        project_id: '',
        type: ECO_ASSETS.BUILDING,
        data_source_type: sourceDataType,
        materials,
        building,
        geolocation,
    };
};
