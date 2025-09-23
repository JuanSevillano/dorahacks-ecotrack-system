import { Hex } from "viem";
import { mapEcotrackSourceDataToSchema } from "../reader";
import { buildSchemaMerkleTree } from "./merkle";

const BUILDING_TRAITS_TRANSLATIONS = {
    total_area_m2: 'ÁREA HABITABLE M2',
    structureVolume: 'MATERIAL ESTRUCTURAL PRINCIPAL',
    isolationMaterial: 'MATERIAL DE AISLAMIENTO ',
    storeys: 'HABITACIONES'
};

const ENERGY_TRAIT_TRANSLATIONS = {
    consumption_kWh_m2_year: 'CONSUMO DE ENERGÍA PRIMARIA NO RENOVABLE(kWh/ m²-año)',
    energy_rating: "CATEGORIA ENERGIA",
    co2_emissions_kg_m2_year: 'EMISIONES DE DIÓXIDO DE CARBONO(kg CO2 / m²-año)',
    co2_rating: 'CATEGORIA EMISIONES',
    electricity_generated_self_consumed_kWh_year: 'ENERGÍA ELECTRICA GENERADA Y AUTOCONSUMIDA(kWh / año)',
};

const GEOLOCATION_TRANSLATIONS = {
    lat: "Lat",
    lon: "Lon",
    msnm: "msnm",
    address: 'Dirección'
};

type ReturnAttributes = {
    attributes: Array<{ trait_type: string, value: number | string }>,
    merkleHash: Hex;
}

export const mapAttributesToNFT = async ({ folderPath, projectId }: { folderPath: string, projectId: number }): Promise<ReturnAttributes> => {
    const initialValue = {
        attributes: [],
        merkleHash: '0x000' as Hex
    };

    const attributes = await mapEcotrackSourceDataToSchema(folderPath, projectId);
    if (!attributes) return initialValue;

    const { building, geolocation, energy } = attributes;
    const buildingAttrs = building && Object.keys(building).map((key) => {
        const transformedKey = key as keyof typeof BUILDING_TRAITS_TRANSLATIONS;
        const keyTranslation = BUILDING_TRAITS_TRANSLATIONS[transformedKey]
        const realValue = building[transformedKey];
        if (!realValue) return { trait_type: keyTranslation, value: 0 };
        return {
            trait_type: keyTranslation,
            value: typeof realValue === 'number' ? realValue : realValue?.value
        }
    })

    const energyAttr = energy && Object.keys(energy).map((key) => {
        const transformedKey = key as keyof typeof ENERGY_TRAIT_TRANSLATIONS;
        const keyTranslation = ENERGY_TRAIT_TRANSLATIONS[transformedKey]
        const realValue = energy[transformedKey];
        if (!realValue) return { trait_type: keyTranslation, value: 0 };
        return { trait_type: keyTranslation, value: realValue }
    })

    const geolocationAttrs = geolocation && Object.keys(geolocation).map(key => {
        const transformedKey = key as keyof typeof GEOLOCATION_TRANSLATIONS;
        const keyTranslation = GEOLOCATION_TRANSLATIONS[transformedKey];
        const realValue = geolocation[transformedKey];
        if (!realValue) return { trait_type: keyTranslation, value: 0 };
        return { trait_type: keyTranslation, value: realValue }
    }, []);

    // Merkle root (canonical keccak256 Merkle tree of selected schema parts)
    const { root } = buildSchemaMerkleTree({ building, geolocation, energy });

    return {
        attributes: buildingAttrs && energyAttr && geolocationAttrs ? [...buildingAttrs, ...energyAttr, ...geolocationAttrs] : [],
        merkleHash: root
    }
}
