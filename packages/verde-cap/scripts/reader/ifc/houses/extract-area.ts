import { IfcAPI, IFCSPACE, IFCRELDEFINESBYPROPERTIES, IFCPROPERTYSINGLEVALUE } from "web-ifc";

// Interfaz para los datos del espacio
type SpaceData = {
    name: string;
    grossFloorArea: number | null;
    netFloorArea: number | null;
    volume: number | null;
}

export const extractTotalArea = async (ifcApi: IfcAPI, modelID: number): Promise<number | undefined> => {
    const spacesData: SpaceData[] = [];
    const spaceIDs = ifcApi.GetLineIDsWithType(modelID, IFCSPACE);
    let totalArea = 0;

    console.log('CANTIDAD DE IFC-SPACE:  ', spaceIDs.size());
    // Obtener propiedades del espacio
    
    // Buscar propiedades específicas en los Property Sets
    // const grossFloorArea = findPropertyValue(properties, 'GrossFloorArea');
    // const netFloorArea = findPropertyValue(properties, 'NetFloorArea');
    // const volume = findPropertyValue(properties, 'Volume');
    
    for (let i = 0; i < spaceIDs.size(); i++) {
        const spaceId = spaceIDs.get(i);
        // const properties = ifcApi.GetPropertySets(modelID, spaceId);
        const space = ifcApi.GetLine(modelID, spaceId);
        console.log(space)
        const areaProp = space?.GrossFloorArea?.value || space?.NetFloorArea?.value;

        if (areaProp) totalArea += areaProp;
    }

    return totalArea > 0 ? totalArea : undefined;
};


// Función auxiliar para buscar valores de propiedades
const findPropertyValue = (propertySets: any[], propertyName: string): number | null => {
    for (const set of propertySets) {
        if (set.HasProperties) {
            for (const prop of set.HasProperties) {
                if (prop.Name?.value === propertyName) {
                    return prop.NominalValue?.value || null;
                }
            }
        }
    }
    return null;
}
