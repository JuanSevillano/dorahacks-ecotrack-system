import { createPublicClient, createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { somniaTestnet } from "viem/chains"
import fs from 'fs'
import { resolve } from "path";

import BiokeysCollectionAbi from "../../artifacts/contracts/BiokeyCollection.sol/BioKeysCollection.json";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
const walletClient = createWalletClient({
    account,
    chain: somniaTestnet,
    transport: http(),
});

const publicClient = createPublicClient({
    chain: somniaTestnet,
    transport: http(),
});

export const deployContract = async () => {
    const filePath = resolve('.', './assets/metadata/nft-bases.json');
    const manifest = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const merkleRoot: Hex = manifest.merkleRoot as Hex;
    const hash = await walletClient.deployContract({
        abi: BiokeysCollectionAbi.abi,
        bytecode: BiokeysCollectionAbi.bytecode as Hex,
        args: [
            "BioKeys",
            "BIKY",
            merkleRoot,
            account.address,
        ],
    });
    console.log(`⏳ Deployment tx sent: ${hash}`);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`✅ Contract deployed at: ${receipt.contractAddress}`);
}
