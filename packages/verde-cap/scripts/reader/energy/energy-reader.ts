import { EcotrackEnergyCertificate } from "@ecotrack/types/src";
import fs from "fs";
import { parseStringPromise } from "xml2js";

const RATING = 'Calificacion';
const BUILDING_IDENTITY = 'IdentificacionEdificio';
const BUILDING_ADDRESS = 'Direccion';
const BUILDING_INTAKE = 'Consumo';
const NO_RENEWABLE_ENERGY_CONSUME = 'EnergiaPrimariaNoRenovable';
const RENEWABLE_ENERGY_GENERATION = 'EnergiasRenovables';
const ELECTRICITY = 'Electrica';
const CO2_EMISSIONS = 'EmisionesCO2'
const ELECTRICITY_AUTO_GENERATED_AND_INTAKED = 'EnergiaGeneradaAutoconsumida'
const SYSTEM = 'Sistema';

export const extractEnergyCertificateData = async (filePath: string): Promise<EcotrackEnergyCertificate & { address: string }> => {
    const xmlData = fs.readFileSync(filePath, "utf8");
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    const buildingData = parsed.DatosEnergeticosDelEdificio

    const address = buildingData[BUILDING_IDENTITY][BUILDING_ADDRESS]?.toLocaleLowerCase();

    const noRenewableEnergy = +buildingData[BUILDING_INTAKE][NO_RENEWABLE_ENERGY_CONSUME]?.Global;
    const energy_rating = buildingData[RATING][NO_RENEWABLE_ENERGY_CONSUME]?.Global;

    const co2_emissions_kg_m2_year = +buildingData[CO2_EMISSIONS]?.Global;
    const co2_rating = buildingData[RATING][CO2_EMISSIONS]?.Global;

    const electricity_generated_self_consumed_kWh_year = +buildingData[RENEWABLE_ENERGY_GENERATION][ELECTRICITY]?.[SYSTEM]?.[ELECTRICITY_AUTO_GENERATED_AND_INTAKED];

    return {
        address,
        consumption_kWh_m2_year: noRenewableEnergy,
        energy_rating,
        co2_emissions_kg_m2_year,
        co2_rating,
        electricity_generated_self_consumed_kWh_year,
    };
};
