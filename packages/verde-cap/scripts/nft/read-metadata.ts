import { NFTBase } from '@ecotrack/types/src';
import { readFile } from 'fs/promises';
import path, { join } from 'path';
import fs from 'fs';
import { uploadImageToPinata } from '../../services/storage-provider';
import { mapAttributesToNFT } from './map-nft-metadata';

const APP_URL = process.env.VERDE_CAP_APP_URL || ''
const BIOKEYS_GROUP_ID = process.env.VERDECAP_PINATA_BIOKEYS_GROUD_ID || '';

type HouseMetadata = {
    name: string;
    description: string;
    imageCid: string
};

const CURRENT_NFT_SIZE = 5;
export const readBiokeysHouseMetadata = async (): Promise<HouseMetadata[]> => {
    const basePath = join(path.dirname('./'), 'assets/metadata/Biokeys');
    const metadataList: HouseMetadata[] = [];
    for (let i = 0; i <= CURRENT_NFT_SIZE; i++) {
        try {
            const folderPath = join(basePath, i.toString());
            const metadataPath = join(folderPath, 'metadata.json');
            const rawData = await readFile(metadataPath, 'utf-8');
            const imagePath = join(basePath, i.toString(), 'image.webp');
            const imageCid = await uploadImageToPinata(imagePath, BIOKEYS_GROUP_ID, i.toString());
            const metadata = JSON.parse(rawData);
            metadataList.push({ ...metadata, imageCid });
        } catch (error) {
            console.error(`Error reading metadata from folder ${i}:`, error);
        }
    }
    return metadataList;
}

export const createNFTBaseFromMetadata = async (projectName: string): Promise<NFTBase[]> => {
    try {
        const basePath = join(path.dirname('./'), 'assets/metadata/Biokeys');
        const metadata = await readBiokeysHouseMetadata();
        const nftBases = await Promise.all(metadata.map(async (meta, index) => {
            const folderPath = join(basePath, index.toString());
            const projectId = index + 1;
            const { attributes, merkleHash: manifest, verdeCapSchemaUri } = await mapAttributesToNFT({ folderPath, projectId });
            const nftBase: NFTBase = {
                name: meta.name,
                description: meta.description,
                attributes: attributes,
                image: meta.imageCid,
                manifest,
                verdeCapSchemaUri,
                external_url: `${APP_URL}/${projectName}/${projectId}`
            };

            return nftBase;
        }));
        const outputPath = join(path.dirname('./'), 'assets/metadata/Biokeys/nft-bases.json');
        console.log('Saving nftBases en: ', outputPath)
        fs.writeFileSync(outputPath, JSON.stringify(nftBases, null, 2));
        return nftBases;
    } catch (error) {
        console.error('Error creating NFT bases:', error);
        throw error;
    }
}
