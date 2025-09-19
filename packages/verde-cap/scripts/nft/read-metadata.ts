import { NFTBase } from '@ecotrack/types/src';
import { readFile } from 'fs/promises';
import { generateUniqueBioKey } from '../biokeys/utils';
import path, { join } from 'path';
import fs from 'fs';
import { uploadImageToPinata } from '../../services/storage-provider';

type HouseMetadata = {
    name: string;
    description: string;
    imageCid: string
}

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
            const imageCid = await uploadImageToPinata(imagePath);

            const metadata = JSON.parse(rawData);
            metadataList.push({
                ...metadata,
                imageCid
            });
        } catch (error) {
            console.error(`Error reading metadata from folder ${i}:`, error);
        }
    }
    return metadataList;
}

export const createNFTBaseFromMetadata = async (): Promise<NFTBase[]> => {
    try {
        const metadata = await readBiokeysHouseMetadata();
        const nftBases: NFTBase[] = await Promise.all(
            metadata.map(async (meta) => {
                const bioKey = await generateUniqueBioKey();
                const nftBase: NFTBase = {
                    id: bioKey,
                    name: meta.name,
                    description: meta.description,
                    attributes: [],
                    image: meta.imageCid,
                    hash: "0x8gsdgagsd",
                };

                return nftBase;
            })
        );
        const outputPath = join(path.dirname('./'), 'assets/metadata/Biokeys/nft-bases.json');
        fs.writeFileSync(outputPath, JSON.stringify(nftBases, null, 2));
        return nftBases;
    } catch (error) {
        console.error('Error creating NFT bases:', error);
        throw error;
    }
}

createNFTBaseFromMetadata().then(nfts => {
    console.log('llego todo: ', nfts)
});