import { Hash } from "viem";
import { EcotrackEnergyCertificate } from "./energy";
import { BuildingInfo } from "./building";

export const ECO_ASSETS = {
    BUILDING: 'BUILDING',
    HOUSE: 'HOUSE',
    SOLAR_PLANT: 'SOLAR_PLANT',
    FOREST: 'FOREST',
    OTHER: 'OTHER',
    ACTIVITY: 'ACTIVITY',
} as const;

export type AssetType = keyof typeof ECO_ASSETS;

export const DataSourceTypes = {
    ifc: 'IFC',
    gltf: 'GLTF',
    gis: 'GIS',
    iot: 'IOT',
    calculated: 'CALCULATED',
    xml: 'XML'
} as const;

type DataSourceType = keyof typeof DataSourceTypes | string;

export type EcoBaseStructure = {
    schema_version: number;
    project_id: Hash | string;
    type: AssetType;
    data_source_type: DataSourceType;
}

export type EcotrackMaterial = {
    guid: string;
    name: string;
    category?: string;
    density_kg_m3?: number;
    volume_m3?: number;
    mass_kg?: number;
    embodied_carbon_kgCO2e?: number;
    recycled_content_percentage?: number;
    source: "IFC" | "Calculated" | "XML";
};

export type EcotrackMaterials = ReadonlyArray<EcotrackMaterial>;

type EcoTrackCarbonImpact = {
    total_embodied_kgCO2e: number;
    avoided_emissions_vs_conventional_kgCO2e: number;
    offset_mechanisms: string[];
};

type EcoTrackWaterMesearument = {
    rainwater_harvesting: boolean;
    greywater_recycling: boolean;
    annual_consumption_m3: number;
};

type EcoTrackBiodiversity = {
    green_area_percentage: number;
    permeable_surface_percentage: number;
    local_species_planted: number;
};

export type EcoTrackGeolocation = {
    lat: number;
    lon: number;
    msnm: number;
} | { address: string };

type EcoTrackLifecycle = {
    construction_year?: number;
    expected_lifespan_years: number;
    deconstruction_strategy: string;
};

export type EcotrackSchema = EcoBaseStructure & {

    materials: EcotrackMaterials;

    building?: BuildingInfo;

    carbon?: EcoTrackCarbonImpact;

    energy?: EcotrackEnergyCertificate;

    water?: EcoTrackWaterMesearument;

    biodiversity?: EcoTrackBiodiversity;

    geolocation: EcoTrackGeolocation;

    lifecycle?: EcoTrackLifecycle;
};

