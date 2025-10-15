import { NFTBase } from "@ecotrack/types/src";
import { uploadJSON } from "../../services/storage-provider";
import { createNFTBaseFromMetadata } from "./read-metadata";
import { writeFile } from "fs/promises";
import path, { join } from "path";

type NFTMedatadaSaved = NFTBase & {
    tokenUri: string
}

type CollectionReport = {
    name: string;
    description: string;
    image: string;
    nfts: Array<NFTMedatadaSaved>;
    createdAt: Date;
}

const NAME = "Biokeys";
const DESCRIPTION = "BIOHOUSES is the first collection of digital assets that certifies and tokenizes high-performance sustainable building designs on the blockchain.\nEach NFT in this collection functions as a digital property title over a unique, complete, and technically verifiable architectural model. Each design represents a real dwelling, existing in one of its development phases: project, completed construction, or under construction. This connection with a tangible physical asset provides the NFT with an additional fundamental value.\nThe underlying assets that guarantee this value are:\nThe BIM model in IFC format, which precisely documents the geometry and materials of each structural component and thermal envelope.\nThe Energy Certification, validating performance metrics such as embodied carbon footprint (kgCO₂e/m²) and calculated annual energy demand (kWh/m²a).\nThese data, immutable on the blockchain, establish a new verification standard for green assets, transforming ecological efficiency and technical performance into a tradable value.\nOwning a VBP asset means acquiring a pioneering instrument at the intersection of sustainable construction, BIM technology, and asset tokenization, aimed at a market that prioritizes verifiable data and connection with tangible projects.\n More than a digital asset: a verifiable bridge between innovative design and constructive reality.";
const IMAGE_URL = "https://lime-glamorous-moose-715.mypinata.cloud/ipfs/bafkreibk734vuhrx4umzseko3wjxkqykqm3ey54nre3y53q3u27r2mtrpu";
const collectionMetadata = {
    name: "Biokeys Collection",
    symbol: "BIKY",
    description: "BIOHOUSES is the first collection of digital assets that certifies and tokenizes high-performance sustainable building designs on the blockchain.\nEach NFT in this collection functions as a digital property title over a unique, complete, and technically verifiable architectural model. Each design represents a real dwelling, existing in one of its development phases: project, completed construction, or under construction. This connection with a tangible physical asset provides the NFT with an additional fundamental value.\nThe underlying assets that guarantee this value are:\nThe BIM model in IFC format, which precisely documents the geometry and materials of each structural component and thermal envelope.\nThe Energy Certification, validating performance metrics such as embodied carbon footprint (kgCO₂e/m²) and calculated annual energy demand (kWh/m²a).\nThese data, immutable on the blockchain, establish a new verification standard for green assets, transforming ecological efficiency and technical performance into a tradable value.\nOwning a VBP asset means acquiring a pioneering instrument at the intersection of sustainable construction, BIM technology, and asset tokenization, aimed at a market that prioritizes verifiable data and connection with tangible projects.\nMore than a digital asset: a verifiable bridge between innovative design and constructive reality.",
    image: IMAGE_URL
};

const uploadNFTItemsToPinata = async () => {
    try {
        const nftsSaved: Array<NFTMedatadaSaved> = [];
        const nfts = await createNFTBaseFromMetadata(NAME);
        for (const nft of nfts) {
            const { uri: tokenUri } = await uploadJSON('pinata', nft.name, nft);
            console.log('✅ NFT SAVED: ', tokenUri);
            nftsSaved.push({ ...nft, tokenUri })
        }
        const outputPath = join(path.dirname('./'), 'assets/metadata/Biokeys/nft-uploaded.json');
        const collectionReport: CollectionReport = {
            name: NAME,
            description: DESCRIPTION,
            image: IMAGE_URL,
            nfts: nftsSaved,
            createdAt: new Date()
        }
        await writeFile(outputPath, JSON.stringify(collectionReport, null, 2));
        console.log('Collecion report saved at: ', outputPath);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


uploadNFTItemsToPinata().then((nfts) => {
    console.log('✅ Collection Uploaded properly:')
})
