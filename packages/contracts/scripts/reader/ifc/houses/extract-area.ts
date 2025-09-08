import { IfcAPI, IFCSPACE } from "web-ifc";

export const extractTotalArea = async (ifcApi: IfcAPI, modelID: number): Promise<number | undefined> => {
    const spaceIDs = ifcApi.GetLineIDsWithType(modelID, IFCSPACE);
    let totalArea = 0;

    for (let i = 0; i < spaceIDs.size(); i++) {
        const space = ifcApi.GetLine(modelID, spaceIDs.get(i));
        const areaProp = space?.GrossFloorArea?.value || space?.NetFloorArea?.value;
        if (areaProp) totalArea += areaProp;
    }

    return totalArea > 0 ? totalArea : undefined;
};
