import { NFTStorage, File } from "nft.storage";
import 'dotenv/config';
import { PinataSDK } from "pinata";

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

const toIpfsUri = (cid: string) => cid.startsWith("ipfs://") ? cid : `ipfs://${cid}`;

export async function uploadJSON(provider: Provider, filename: string, content: any): Promise<UploadResult> {
    const { nftClient, pinataClient } = initProviders();
    if (provider === "nftstorage") {
        if (!nftClient) throw new Error("NFT.Storage key not configured");
        const blob = new File([JSON.stringify(content)], filename, { type: "application/json" });
        const cid = await nftClient.storeBlob(blob);
        return { cid, uri: toIpfsUri(cid), provider: "nft.storage" };
    }

    if (provider === "pinata") {
        if (!pinataClient) throw new Error("Pinata keys not configured");// TODO:: add to BioKeys group
        const result = await pinataClient.pinJSONToIPFS(content, {
            pinataMetadata: { name: filename },
        });
        return { cid: result.IpfsHash, uri: toIpfsUri(result.IpfsHash), provider: "pinata" };
    }

    throw new Error(`Unknown provider: ${provider}`);
}
