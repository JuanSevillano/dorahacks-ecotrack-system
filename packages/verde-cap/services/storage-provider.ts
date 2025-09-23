import { NFTStorage, File } from "nft.storage";
import 'dotenv/config';
import { PinataSDK } from "pinata";
import { readFile } from 'fs/promises';

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY || "";
const VERDECAP_PINATA_API_KEY = process.env.VERDECAP_PINATA_API_KEY || "";
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

const toIpfsUri = (cid: string) => cid.startsWith("ipfs://") ? cid : `ipfs://${cid}`;

// export async function uploadJSON(provider: Provider, filename: string, content: any): Promise<UploadResult> {
//     const { nftClient, pinataClient } = initProviders();
//     if (provider === "nftstorage") {
//         if (!nftClient) throw new Error("NFT.Storage key not configured");
//         const blob = new File([JSON.stringify(content)], filename, { type: "application/json" });
//         const cid = await nftClient.storeBlob(blob);
//         return { cid, uri: toIpfsUri(cid), provider: "nft.storage" };
//     }

//     if (provider === "pinata") {
//         if (!pinataClient) throw new Error("Pinata keys not configured");// TODO:: add to BioKeys group
//         const result = await pinataClient.pinJSONToIPFS(content, {
//             pinataMetadata: { name: filename },
//         });
//         return { cid: result.IpfsHash, uri: toIpfsUri(result.IpfsHash), provider: "pinata" };
//     }

//     throw new Error(`Unknown provider: ${provider}`);
// }

export async function uploadImageToPinata(filePath: string, groupId: string) {
    try {
        const { pinataClient: pinata } = initProviders();
        await pinata.testAuthentication();
        const readableStreamForFile = await readFile(filePath);
        const result = await pinata.upload.public.base64(readableStreamForFile.toString('base64')).group(groupId);
        console.log("Archivo subido a Pinata. Resultado:", result);
        return result.cid;

    } catch (error) {
        console.error("Error al subir la imagen a Pinata:", error);
        throw error;
    }
}