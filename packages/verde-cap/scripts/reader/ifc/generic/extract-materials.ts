import { IfcAPI, IFCELEMENTQUANTITY } from "web-ifc";
import { calculateEmissionFactor } from "./calculate-emission-factor";
import { n, round } from "../../../utils";
import { DataSourceTypes, EcotrackMaterial } from "@ecotrack/types/src";


export const extractMaterials = async (ifcApi: IfcAPI, modelID: number): Promise<EcotrackMaterial[]> => {
  const results = [];
  const qIDs = ifcApi.GetLineIDsWithType(modelID, IFCELEMENTQUANTITY);

  for (let i = 0; i < qIDs.size(); i++) {
    const qID = qIDs.get(i);
    const qset = ifcApi.GetLine(modelID, qID);
    if (!qset?.Quantities) continue;

    const guid: string = qset?.GlobalId?.value ?? `q-${qID}`;
    const name: string = qset?.Name?.value ?? "Name not found";
    const category: string = qset?.Description?.value ?? "Generic";

    let volume_m3: number | undefined;
    let mass_kg: number | undefined;

    for (const quantity of qset.Quantities) {
      const ifcLine = ifcApi.GetLine(modelID, quantity.value);
      if (ifcLine.__typename === "IFCQUANTITYVOLUME") volume_m3 = ifcLine?.VolumeValue?.value;
      if (ifcLine.__typename === "IFCQUANTITYWEIGHT") mass_kg = ifcLine?.WeightValue?.value;
    }


    // Densidad estimada si falta masa
    let density_kg_m3: number | undefined;
    if (volume_m3 && !mass_kg) {
      const low = name.toLowerCase();
      density_kg_m3 =
        low.includes("concrete") ? 2400 :
          low.includes("timber") || low.includes("wood") ? 600 :
            low.includes("adobe") ? 1700 :
              1000;
      mass_kg = volume_m3 * density_kg_m3;
    }

    const emissionFactor = calculateEmissionFactor(name); // kgCO2e/kg
    const embodied = mass_kg ? mass_kg * emissionFactor : undefined;

    results.push({
      guid,
      name,
      category,
      volume_m3: volume_m3,
      mass_kg: round(mass_kg),
      density_kg_m3: round(density_kg_m3),
      embodied_carbon_kgCO2e: round(embodied),
      emission_factor_kgCO2e_per_kg: emissionFactor,
      source: DataSourceTypes.ifc,
    });
  }

  return results;
};