import { EcotrackMaterial } from "@ecotrack/types";

export const findMainMaterial = (materials: EcotrackMaterial[], keyword: string): string | undefined => {
    const match = materials.find(m => m.name.toLowerCase().includes(keyword.toLowerCase()));
    return match?.name;
};