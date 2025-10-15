import { NFTStorage, File } from "nft.storage";
import 'dotenv/config';
import { PinataSDK } from "pinata";
import { readFile } from 'fs/promises';

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || "";
const PINATA_JWT = process.env.VERDECAP_PINATA_API_JWT || "";
const PINATA_GATEWAY = process.env.VERDECAP_PINATA_GATEWAY || "";

const initProviders = () => {
    const nftClient = new NFTStorage({ token: NFT_STORAGE_KEY })
    const pinataClient = new PinataSDK({
        pinataGateway: PINATA_GATEWAY,
        pinataJwt: PINATA_JWT,
    });

    return { nftClient, pinataClient };
}

export type Provider = "nftstorage" | "pinata";

export interface UploadResult {
    cid: string;
    uri: string;
    provider: string;
}

const toGatewayUri = (cid: string) => `https://${PINATA_GATEWAY}/ipfs/${cid}`

// Fallback gateways para cuando Pinata falla
const FALLBACK_GATEWAYS = [
    'https://gateway.pinata.cloud/ipfs/',
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://dweb.link/ipfs/'
];

// Función para verificar si un URI está disponible
export async function checkUriAvailability(uri: string): Promise<boolean> {
    try {
        const response = await fetch(uri, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Función para obtener un URI funcional con fallbacks
export async function getWorkingUri(cid: string): Promise<string> {
    const primaryUri = toGatewayUri(cid);

    // Verificar el gateway principal primero
    if (await checkUriAvailability(primaryUri)) {
        return primaryUri;
    }

    // Probar gateways de fallback
    for (const gateway of FALLBACK_GATEWAYS) {
        const fallbackUri = `${gateway}${cid}`;
        if (await checkUriAvailability(fallbackUri)) {
            console.warn(`⚠️  Pinata gateway failed, using fallback: ${gateway}`);
            return fallbackUri;
        }
    }

    // Si todos fallan, devolver el original (puede que sea un problema temporal)
    console.error(`❌ All gateways failed for CID: ${cid}`);
    return primaryUri;
}

export async function uploadJSON(provider = 'pinata' as Provider, filename: string, content: any): Promise<UploadResult> {
    const { pinataClient } = initProviders();
    if (provider !== 'pinata') throw new Error(`Unknown provider: ${provider}`);
    if (!pinataClient) throw new Error("Pinata keys not configured");
    const result = await pinataClient.upload.public.json(content, { metadata: { keyvalues: { name: filename } } })
    return { cid: result.cid, uri: toGatewayUri(result.cid), provider: "pinata" };
}

export async function uploadImageToPinata(filePath: string, groupId: string, fileNumber: string) {
    try {
        const { pinataClient: pinata } = initProviders();
        await pinata.testAuthentication();
        const readableStreamForFile = await readFile(filePath);
        const result = await pinata.upload.public.base64(readableStreamForFile.toString('base64'), { groupId, metadata: { keyvalues: { name: `Biokeys - ${fileNumber}` } } })
        return toGatewayUri(result.cid);
    } catch (error) {
        console.error("Error al subir la imagen a Pinata:", error);
        throw error;
    }
}

export async function uploadProjectSourcesToPinata({ ifcPath, xmlPath, projectId, groupId }: { ifcPath: string; xmlPath: string; projectId: number; groupId?: string; }) {
    try {
        const { pinataClient: pinata } = initProviders();
        await pinata.testAuthentication();

        const ifcBytes = await readFile(ifcPath);
        const xmlBytes = await readFile(xmlPath);

        const ifcName = `model_${projectId}.ifc`;
        const xmlName = `energy_${projectId}.xml`;

        const ifcResult = await pinata.upload.public.base64(
            ifcBytes.toString('base64'),
            { groupId, metadata: { keyvalues: { name: ifcName } } }
        );

        const xmlResult = await pinata.upload.public.base64(
            xmlBytes.toString('base64'),
            { groupId, metadata: { keyvalues: { name: xmlName } } }
        );

        const modelCid = ifcResult.cid;
        const energyCid = xmlResult.cid;
        const modelUri = toGatewayUri(modelCid);
        const energyUri = toGatewayUri(energyCid);

        console.log('✅ Archivos subidos modelado, certificado: ', modelUri, energyUri);
        return { modelCid, energyCid, modelUri, energyUri };
    } catch (error) {
        console.error("Error uploading project sources to Pinata:", error);
        throw error;
    }
}

export async function uploadEcotrackSchemaToPinata(projectId: number, schema: unknown) {
    const filename = `ecotrack-schema-${projectId}.json`;
    const { cid, uri, provider } = await uploadJSON('pinata', filename, schema);
    return { schemaCid: cid, schemaUri: uri, provider };
}