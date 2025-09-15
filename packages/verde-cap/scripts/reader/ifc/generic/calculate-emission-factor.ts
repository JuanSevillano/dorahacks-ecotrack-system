export const EMISSION_FACTORS: Record<string, number> = {
    Concrete: 0.12,
    Steel: 2.0,
    Timber: 0.04,
    Adobe: 0.02,
    Glass: 1.5,
    Default: 0.1,
};

export function calculateEmissionFactor(materialName: string): number {
    const entry = Object.entries(EMISSION_FACTORS).find(([key]) =>
        materialName.toLowerCase().includes(key.toLowerCase())
    );
    return entry ? entry[1] : EMISSION_FACTORS.Default;
}