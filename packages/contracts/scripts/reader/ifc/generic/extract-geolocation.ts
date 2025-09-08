import { EcotrackExtendedMetadata, EcoTrackGeolocation } from "@ecotrack/types";
import { IfcAPI, IFCSITE } from "web-ifc";
import { round } from "../../../utils";

export const extractGeolocation = async (ifcApi: IfcAPI, modelID: number): Promise<EcoTrackGeolocation> => {
    const ids = ifcApi.GetLineIDsWithType(modelID, IFCSITE);
    if (!ids.size()) return {
        lat: 0,
        lon: 0,
        msnm: 0
    };
    const site = ifcApi.GetLine(modelID, ids.get(0));
    const lat = site?.RefLatitude?.value ?? site?.RefLatitude;
    const lon = site?.RefLongitude?.value ?? site?.RefLongitude;
    const elev = site?.RefElevation?.value ?? site?.RefElevation;

    return {
        lat: typeof lat === "number" ? round(lat, 6) : 0,
        lon: typeof lon === "number" ? round(lon, 6) : 0,
        msnm: typeof elev === "number" ? round(elev, 2) : 0,
    };
};