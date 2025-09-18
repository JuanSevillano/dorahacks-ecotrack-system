import { IfcAPI, IFCWALL } from "web-ifc";
import { round } from "../../../utils";

export const extractIsolationBuilding = async (ifcApi: IfcAPI, modelId: number) => {
    let totalWrapArea = 0;
    const isolationIds = ifcApi.GetLineIDsWithType(modelId, IFCWALL);
    for (const isolationId of isolationIds) {
        const isolationProperties = await ifcApi.properties.getPropertySets(modelId, isolationId, true);
        const isolationSizes = isolationProperties.find(it => it.Name.value === 'Cotas')?.HasProperties;
        const area = isolationSizes.find((it: any) => ['área'].includes(it.Name.value.toLocaleLowerCase()));
        totalWrapArea += round(+area.NominalValue._internalValue, 3);
    }
    return {
        unit: 'm2',
        value: totalWrapArea
    }
}