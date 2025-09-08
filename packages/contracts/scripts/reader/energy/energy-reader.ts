// services/energyParser.ts
import { EnergyCertificate } from "@ecotrack/types";
import fs from "fs";
import { parseStringPromise } from "xml2js";

export const parseEnergyCertificate = async (filePath: string): Promise<EnergyCertificate> => {
    const xmlData = fs.readFileSync(filePath, "utf8");
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });

    const cert = parsed.certificadoEnergetico;
    const calificacion = cert.calificacionEnergetica;
    const consumoEnergia = calificacion.consumoEnergia;

    return {
        primary_energy_consumption_kWh_m2_year: Number(consumoEnergia.consumo),
        primary_energy_rating: consumoEnergia.calificacion,
        co2_emissions_kg_m2_year: Number(consumoEnergia.emisiones),
        co2_rating: consumoEnergia.calificacion, // a veces coinciden, se puede separar si el XML lo trae distinto
        electricity_generated_self_consumed_kWh_year: undefined, // campo opcional si el XML lo soporta
        heating_demand_kWh_m2_year: Number(calificacion.demandaCalefaccion),
        cooling_demand_kWh_m2_year: Number(calificacion.demandaRefrigeracion),
    };
};
