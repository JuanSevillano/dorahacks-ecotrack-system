import { Hash } from "viem";
import { Enum } from "../../types";

export type NFTAttributes = ReadonlyArray<{
    trait_type: string;
    value: string | number | boolean;
}>;

export type NFTBase = Readonly<{
    hash: Hash;
    id: number;
    name: string;
    description: string;
    image: string;
    external_url?: string;
    attributes: NFTAttributes;
}>;

export const ECO_ASSETS = {
    building: 'BUILDING',
    house: 'HOUSE',
    solarPlant: 'SOLAR_PLANT',
    forest: 'FOREST',
    other: 'OTHER',
    activity: 'ACTIVITY',
} as const;

type AssetType = keyof typeof ECO_ASSETS;

export const DataSourceTypes = {
    ifc: 'IFC',
    gltf: 'GLTF',
    gis: 'GIS',
    iot: 'IOT'
} as const;

type DataSourceType = Enum<typeof DataSourceTypes>

export type EcoBaseStructure = {
    schema_version: number;
    project_id: Hash | string;
    type: AssetType;
    data_source_type: DataSourceType;
}

type EcoTrackMaterials = ReadonlyArray<{
    guid: string;
    name: string;
    volume_m3: number;
    mass_kg: number;
    embodied_carbon_kgCO2e: number;
    recycled_content_percentage: number;
    // ADD MORE REPRESENTATIVE ACCORDING JIMMY
}>;

type EcoTrackCarbonImpact = {
    total_embodied_kgCO2e: number; // Carbono embebido total
    avoided_emissions_vs_conventional_kgCO2e: number; // Emisiones evitadas comparado con baseline
    offset_mechanisms: string[]; // Créditos, reforestación, etc.
};

type EcoTrackEneryEfficiency = {
    consumption_kWh_m2_year: number;
    renewable_percentage: number;
    production_kWh_year: number;
};

type EcoTrackWaterMesearument = {
    rainwater_harvesting: boolean;
    greywater_recycling: boolean;
    annual_consumption_m3: number;
};

type EcoTrackBiodiversity = {
    green_area_percentage: number; // % de área verde en el lote
    permeable_surface_percentage: number; // % de área permeable
    local_species_planted: number; // Cantidad de especies nativas plantadas
};

type EcoTrackGeolocation = {
    lat: number;
    lon: number;
    msnm: number;
};

type EcoTrackLifecycle = {
    construction_year?: number;
    expected_lifespan_years: number;
    deconstruction_strategy: string; // Ej: "Reciclaje 80%"
};

export type EcoSchema = NFTBase & {

    ecotrack_metadata: EcoBaseStructure & {

        materials: EcoTrackMaterials;

        carbon?: EcoTrackCarbonImpact;

        energy?: EcoTrackEneryEfficiency;

        water?: EcoTrackWaterMesearument;

        biodiversity?: EcoTrackBiodiversity;

        geolocation: EcoTrackGeolocation;

        lifecycle?: EcoTrackLifecycle;
    };
};
