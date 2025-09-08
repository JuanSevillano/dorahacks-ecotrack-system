import { CarbonRating } from "./carbon";

export const CATEGORIES = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G'
} as const;

export type EnergyRating = keyof typeof CATEGORIES;

export const EROPEAN_ENERGY_NO_RENEWABLE_STARTANDARD_CATEGORY: Record<EnergyRating, { min: number, max: number; }> = {
  A: {
    min: 0,
    max: 67.7
  },
  B: {
    min: 67.7,
    max: 104.0
  },
  C: {
    min: 104.0,
    max: 155.2
  },
  D: {
    min: 155.2,
    max: 231.1
  },
  E: {
    min: 231.1,
    max: 442.6
  },
  F: {
    min: 442.6,
    max: 517.8
  },
  G: {
    min: 517.8,
    max: Infinity
  }
};

export type EcotrackEnergyCertificate = {
  consumption_kWh_m2_year: number;
  energy_rating: EnergyRating;
  co2_emissions_kg_m2_year: number;
  co2_rating: CarbonRating;
  electricity_generated_self_consumed_kWh_year?: number;
  heating_demand_kWh_m2_year: number;
  cooling_demand_kWh_m2_year: number;
};

