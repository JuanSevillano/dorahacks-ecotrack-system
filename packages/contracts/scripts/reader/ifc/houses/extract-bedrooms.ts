import { IfcAPI, IFCSPACE } from "web-ifc";

export const extractBedrooms = async (ifcApi: IfcAPI, modelID: number): Promise<number | undefined> => {
    const spaceIDs = ifcApi.GetLineIDsWithType(modelID, IFCSPACE);
    let bedrooms = 0;

    for (let i = 0; i < spaceIDs.size(); i++) {
        const space = ifcApi.GetLine(modelID, spaceIDs.get(i));
        const name = space?.Name?.value?.toLowerCase();
        if (name?.includes("bedroom") || name?.includes("dormitorio")) {
            bedrooms++;
        }
    }

    return bedrooms > 0 ? bedrooms : undefined;
};
