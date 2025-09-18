import { IfcAPI, IFCSPACE } from "web-ifc";
import { round } from "../../../utils";

export const extractTotalArea = async (ifcApi: IfcAPI, modelID: number): Promise<number | undefined> => {
    const spacesData: any[] = [];
    const spaceIDs = ifcApi.GetLineIDsWithType(modelID, IFCSPACE);

    for (let i = 0; i < spaceIDs.size(); i++) {
        const spaceId = spaceIDs.get(i);
        let space = { area: 0, isInternal: false };

        const properties = await ifcApi.properties.getPropertySets(modelID, spaceId);
        const propertiesIds = Object.values(properties).filter(p => p.Name?.value === 'Cotas')[0]?.HasProperties.map((it: any) => it.value);
        const internalSpacesId = Object.values(properties).filter(p => p.Name?.value === 'Datos de identidad')[0]?.HasProperties.map((it: any) => it.value);

        for (const propertyId of [propertiesIds, internalSpacesId].flat()) {
            const propertyValues = await ifcApi.properties.getItemProperties(modelID, propertyId);
            const propertyName = propertyValues?.Name?.value;

            if (propertyName.includes('Comentarios')) {
                const isInternal = propertyValues.NominalValue.value?.toLocaleLowerCase().includes('interior');
                space.isInternal = isInternal;
            }

            if (propertyName.includes('Área')) {
                const area = round(+propertyValues.NominalValue._internalValue, 3);
                space.area = area;
            }
        }

        spacesData.push({
            spaceId,
            ...space,
        });
    }

    let totalArea = 0;
    spacesData.filter(space => space.isInternal).map(space => totalArea += space.area);
    return totalArea > 0 ? totalArea : undefined;
};