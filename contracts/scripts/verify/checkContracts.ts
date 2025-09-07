import { publicClient } from "../../utilts/clients";
import amoy from "../utils/deployments/amoy.json";

async function checkContracts() {
    for (const [name, address] of Object.entries(amoy)) {
        try {
            const code = await publicClient.getCode({ address: address as `0x${string}` });
            if (code === "0x") {
                console.log(`❌ ${name} NO tiene código en la blockchain`);
            } else {
                console.log(`✅ ${name} tiene contrato desplegado en: ${address}`);
            }
        } catch (err) {
            console.log(`❌ Error al consultar ${name}:`, err);
        }
    }
}

checkContracts();