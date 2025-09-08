import { IfcAPI, IFCBUILDINGSTOREY } from "web-ifc";

export const extractFloors = async (ifcApi: IfcAPI, modelID: number): Promise<number | undefined> => {
    const storeyIDs = ifcApi.GetLineIDsWithType(modelID, IFCBUILDINGSTOREY);
    return storeyIDs.size() > 0 ? storeyIDs.size() : undefined;
};
