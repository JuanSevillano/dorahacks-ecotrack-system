export type BuildingInfo = {
    total_area_m2: number;
    storeys?: number;
    structureVolume: {
        material: string | number;
        value: number;
        unit: string;
    };
    isolationMaterial: {
        unit: string;
        value: number;
    };
};
