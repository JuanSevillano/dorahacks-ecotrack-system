import { EcotrackEnergyCertificate } from "@ecotrack/types";
import fs from "fs";
import { parseStringPromise } from "xml2js";

export const extractEnergyCertificateData = async (filePath: string): Promise<EcotrackEnergyCertificate> => {
    const xmlData = fs.readFileSync(filePath, "utf8");
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });

    const cert = parsed.certificadoEnergetico;
    const calificacion = cert.calificacionEnergetica;
    const consumoEnergia = calificacion.consumoEnergia;

    console.log(JSON.stringify(parsed));

    return {
        consumption_kWh_m2_year: Number(consumoEnergia.consumo),
        energy_rating: consumoEnergia.calificacion,
        co2_emissions_kg_m2_year: Number(consumoEnergia.emisiones),
        co2_rating: consumoEnergia.calificacion,
        electricity_generated_self_consumed_kWh_year: undefined,
        heating_demand_kWh_m2_year: Number(calificacion.demandaCalefaccion),
        cooling_demand_kWh_m2_year: Number(calificacion.demandaRefrigeracion),
    };
};
