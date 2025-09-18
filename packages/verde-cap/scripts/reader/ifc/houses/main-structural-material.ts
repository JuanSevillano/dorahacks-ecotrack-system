import { IfcAPI, IFCCOLUMN, IFCBEAM, Vector } from "web-ifc";
import { round } from "../../../utils";
import { findPropertyById } from "../generic/find-property";

const extractVolume = async (ifcApi: IfcAPI, modelId: number, linesIds: Vector<number>) => {
    let volume = 0;
    for (const lineId of linesIds) {
        const lineProperties = await ifcApi.properties.getPropertySets(modelId, lineId);
        const lineVolumPropertyIds = lineProperties.filter(it => it.Name.value === 'Cotas')
            .map((it: any) => it.HasProperties)
            .flat()
            .map((it: any) => it.value)

        for (const propertyId of lineVolumPropertyIds) {
            const propertyValue = await ifcApi.properties.getItemProperties(modelId, propertyId, false);
            const propertyName = propertyValue?.Name?.value;

            if (propertyName.includes('Volumen')) {
                volume += round(+propertyValue.NominalValue._internalValue, 3);
            }
        }
    }
    return volume
}

const extractStructuralMaterial = async (ifcApi: IfcAPI, modelId: number, linesIds: Vector<number>) => {
    for (const lineId of linesIds) {
        const linePropertiesSet = await ifcApi.properties.getPropertySets(modelId, lineId);
        const lineProperties = linePropertiesSet.find(it => it.Name.value.toLocaleLowerCase().includes('materiales'))?.HasProperties;
        const linePropertiesIds: number[] = lineProperties.map((it: any) => it.value).flat();
        return await findPropertyById({
            ifcApi,
            modelId,
            propertyName: 'material',
            propertiesIds: linePropertiesIds
        });

    }
}

export const extractStructuralMaterialsVolumes = async (ifcApi: IfcAPI, modelID: number)
    : Promise<{ material: string | number; value: number; unit: string; }> => {
    const unit = 'm3';
    const beams = ifcApi.GetLineIDsWithType(modelID, IFCBEAM);
    const columns = ifcApi.GetLineIDsWithType(modelID, IFCCOLUMN);
    const beamsVolume = await extractVolume(ifcApi, modelID, beams);
    const columnsVolume = await extractVolume(ifcApi, modelID, columns);
    const structuralMaterial = await extractStructuralMaterial(ifcApi, modelID, columns);
    const totalStructuralVolume = columnsVolume + beamsVolume;
    return {
        material: structuralMaterial?.value || 'Not found',
        value: totalStructuralVolume,
        unit
    };
}