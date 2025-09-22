import { keccak256, toHex } from "viem";
import { MerkleTree } from "merkletreejs";
import fs from "fs";

export const generateUniqueBioKey = (): Promise<number> => new Promise((resolve) => {
    const timestamp = Date.now();
    const randomHex = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    const bioKey = `BIO-${timestamp}-${randomHex}`.toUpperCase();
    resolve(+bioKey);
});

// carga manifest
const manifest = JSON.parse(fs.readFileSync("./manifest.json", "utf-8"));

const leaves = manifest.nfts.map((nft: any) =>
    keccak256(
        toHex(`${nft.id}:${nft.metadata_uri}`, { size: 32 })
    )
);

const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

const root = tree.getHexRoot();
console.log("Merkle Root:", root);

// guardar manifest con root incluido
manifest.merkle_root = root;
fs.writeFileSync("./manifest.final.json", JSON.stringify(manifest, null, 2));

// ejemplo proof para NFT id=1
const leaf = keccak256(toHex(`1:ipfs://QmX1.../1.json`, { size: 32 }));
const proof = tree.getHexProof(leaf);

console.log("Proof for NFT 1:", proof);
