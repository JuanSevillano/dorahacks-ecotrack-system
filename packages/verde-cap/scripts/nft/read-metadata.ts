import { NFTBase } from '@ecotrack/types/src';
import { readFile } from 'fs/promises';
import { generateUniqueBioKey } from '../biokeys/utils';
import path, { join } from 'path';
import fs from 'fs';
import { uploadImageToPinata } from '../../services/storage-provider';
import { mapEcotrackSourceDataToSchema } from '../reader';

type HouseMetadata = {
    name: string;
    description: string;
    imageCid: string
}

const CURRENT_NFT_SIZE = 5;
const BUILDING_TRAITS_TRANSLATIONS = {
    total_area_m2: 'ÁREA HABITABLE M2',
    structureVolume: 'MATERIAL ESTRUCTURAL PRINCIPAL',
    isolationMaterial: 'MATERIAL DE AISLAMIENTO ',
    storeys: 'HABITACIONES'
}
const ENERGY_TRAIT_TRANSLATIONS = {
    consumption_kWh_m2_year: 'CONSUMO DE ENERGÍA PRIMARIA NO RENOVABLE(kWh/ m²-año)',
    energy_rating: "CATEGORIA ENERGIA",
    co2_emissions_kg_m2_year: 'EMISIONES DE DIÓXIDO DE CARBONO(kg CO2 / m²-año)',
    co2_rating: 'CATEGORIA EMISIONES',
    electricity_generated_self_consumed_kWh_year: 'ENERGÍA ELECTRICA GENERADA Y AUTOCONSUMIDA(kWh / año)',
}

const mapAttributesToNFT = async ({ folderPath }: { folderPath: string }) => {
    const attributes = await mapEcotrackSourceDataToSchema(folderPath);
    if (!attributes) return [];

    const { building, geolocation, materials, energy } = attributes;
    if (!building) return [];
    const buildingAttrs = Object.keys(building).map((key) => {
        const transformedKey = key as keyof typeof BUILDING_TRAITS_TRANSLATIONS;
        const keyTranslation = BUILDING_TRAITS_TRANSLATIONS[transformedKey]
        const realValue = building[transformedKey];
        if (!realValue) return { trait_type: keyTranslation, value: 0 };
        return {
            trait_type: keyTranslation,
            value: typeof realValue === 'number' ? realValue : realValue?.value
        }
    })

    if (!energy) return buildingAttrs;
    const energyAttr = energy && Object.keys(energy).map((key) => {
        const transformedKey = key as keyof typeof ENERGY_TRAIT_TRANSLATIONS;
        const keyTranslation = ENERGY_TRAIT_TRANSLATIONS[transformedKey]
        const realValue = energy[transformedKey];
        if (!realValue) return { trait_type: keyTranslation, value: 0 };
        return { trait_type: keyTranslation, value: realValue }
    })

    return [...buildingAttrs, ...energyAttr]
}

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
        const basePath = join(path.dirname('./'), 'assets/metadata/Biokeys');
        const metadata = await readBiokeysHouseMetadata();
        const nftBases: NFTBase[] = await Promise.all(
            metadata.map(async (meta, index) => {
                const bioKey = await generateUniqueBioKey();
                const folderPath = join(basePath, index.toString());
                const attributes = await mapAttributesToNFT({ folderPath });

                const nftBase: NFTBase = {
                    id: bioKey,
                    name: meta.name,
                    description: meta.description,
                    attributes: attributes,
                    image: meta.imageCid,
                    hash: "0x8gsdgagsd",
                };

                return nftBase;
            })
        );
        const outputPath = join(path.dirname('./'), 'assets/metadata/Biokeys/nft-bases.json');
        console.log('Saving nftBases en: ', outputPath)
        fs.writeFileSync(outputPath, JSON.stringify(nftBases, null, 2));
        return nftBases;
    } catch (error) {
        console.error('Error creating NFT bases:', error);
        throw error;
    }
}

createNFTBaseFromMetadata().then(nfts => {
    nfts && console.log('Finished properly')
});