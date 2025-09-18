import fs from "fs-extra";
import path from "path";
import { createVerdeCapSchema, uploadParts, createManifest, createNFTMetadata } from "./create-manifest";;
import { NFTBase } from "@ecotrack/types/src";
import { generateUniqueBioKey } from "../biokeys/utils";

async function main() {
    const [schemaPath, outDir, providersArg, manifestProvidersArg] = process.argv.slice(2);
    if (!schemaPath || !outDir) {
        console.error("Usage: ts-node scripts/generateManifest.ts <schema.json> <outDir> [providers] [manifestProviders]");
        process.exit(1);
    }
    const providers = providersArg ? providersArg.split(",") : ["nftstorage"];
    const manifestProviders = manifestProvidersArg ? manifestProvidersArg.split(",") : providers;

    const schema = JSON.parse(await fs.readFile(schemaPath, "utf8"));
    const verdecap = createVerdeCapSchema(schema);

    // 1. upload parts
    const { partsProviders, localPaths } = await uploadParts(verdecap, outDir, providers as any);

    // 2. create manifest & merkle root
    const { manifest, manifestUri, proofs } = await createManifest(verdecap, partsProviders, outDir, manifestProviders as any);

    console.log("Manifest URI:", manifestUri);
    console.log("Merkle Root:", manifest.merkle_root);
    const id = await generateUniqueBioKey()
    // opcional: crear NFT metadata
    // ejemplo NFTBase (rellenar con tus datos)
    const base: NFTBase = {
        id,
        hash: '0x...',
        name: "VerdeCap Asset #1",
        description: "Ejemplo",
        image: "ipfs://.../image.png",
        attributes: [{ trait_type: "Asset Type", value: verdecap.asset_type }]
    };

    const nftMetadata = createNFTMetadata(base, manifest);
    const nftMetadataPath = path.join(outDir, "nft.metadata.json");
    await fs.writeFile(nftMetadataPath, JSON.stringify(nftMetadata, null, 2), "utf8");

    console.log("NFT metadata saved to:", nftMetadataPath);
    console.log("Proofs sample:", Object.entries(proofs)[0]);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
