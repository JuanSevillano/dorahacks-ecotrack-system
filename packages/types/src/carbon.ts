import { CATEGORIES } from "./energy";

export type CarbonRating = keyof typeof CATEGORIES;

export const EUROPEAN_CARBON_EMISSION_STANDARD_CATEGORY: Record<CarbonRating, { min: number; max: number; }> = {
    A: {
        min: -Infinity,
        max: 15.1
    },
    B: {
        min: 15.1,
        max: 23.2
    },
    C: {
        min: 23.2,
        max: 34.5
    },
    D: {
        min: 34.5,
        max: 51.5
    },
    E: {
        min: 51.5,
        max: 102.3
    },
    F: {
        min: 102.3,
        max: 119.7
    },
    G: {
        min: 119.7,
        max: Infinity
    }
};