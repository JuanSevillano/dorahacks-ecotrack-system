import { IfcAPI } from "web-ifc";

type ReturnedValue = {
    name: string;
    value: string | number;
    expressID: number;
    type?: number;
    Unit?: string;
}

type FindPropertyParams = {
    ifcApi: IfcAPI;
    modelId: number;
    propertyName: string;
    propertiesIds: number[];
}
export const findPropertyById = async ({ ifcApi, modelId, propertyName, propertiesIds }: FindPropertyParams):
    Promise<ReturnedValue> => {
    const notFound = {
        expressID: 0,
        name: 'Not found',
        value: 'Not found',
    }
    if (!propertiesIds) return notFound;
    for (const propertyId of propertiesIds) {
        const propertyValue = await ifcApi.properties.getItemProperties(modelId, propertyId, false);
        const _propertyName = propertyValue?.Name?.value;
        if (_propertyName.toLocaleLowerCase().includes(propertyName)) return {
            name: propertyValue.Name.value,
            value: propertyValue.NominalValue.value,
            expressID: propertyValue.expressID
        };
        if (!_propertyName.toLocaleLowerCase().includes(propertyName)) continue;
        else throw new Error('Not property found')
    }

    return notFound;
}