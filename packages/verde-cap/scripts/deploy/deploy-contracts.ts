import { Address, createPublicClient, createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { somniaTestnet } from "viem/chains"
import fs from 'fs'
import path, { join } from "path";
import 'dotenv/config';

import BiokeysCollectionAbi from "../../artifacts/contracts/BiokeyCollection.sol/BioKeysCollection.json";
import { buildDeploymentRecord, saveDeploymentRecord } from "./deployments";

const account = privateKeyToAccount(process.env.VERDE_CAP_ADMIN_PRIVATE_KEY as Hex);

const network = { ...somniaTestnet };

const walletClient = createWalletClient({
    account,
    chain: network,
    transport: http(),
});

const publicClient = createPublicClient({
    chain: network,
    transport: http(),
});

export const deployContract = async () => {
    try {
        const filePath = join(path.dirname('./'), 'assets/metadata/Biokeys/nft-uploaded.json');
        const manifest = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const initialNFTs = manifest?.nfts?.map(it => ({
            manifestRoot: it.manifest,
            metadataURI: it.tokenUri
        }));

        const constructorArgs = [
            "BioKeys",
            "BIKY",
            account.address,
            account.address,
            initialNFTs
        ];
        console.log('Transformed: ', initialNFTs);

        const hash = await walletClient.deployContract({
            abi: BiokeysCollectionAbi.abi,
            bytecode: BiokeysCollectionAbi.bytecode as Hex,
            args: constructorArgs,
        });

        console.log(`⏳ Deployment tx sent: ${hash}`);
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        console.log(`✅ Contract deployed at: ${receipt.contractAddress}`);
        const deploymentRecord = buildDeploymentRecord({
            contractName: "BiokeyCollection",
            contractAddress: receipt.contractAddress as Address,
            txHash: receipt.transactionHash,
            account: account.address,
            network: network.name,
            chainId: network.id,
            blockNumber: receipt.blockNumber,
            blockHash: receipt.blockHash,
            args: constructorArgs,
            abi: BiokeysCollectionAbi.abi,
        });

        await saveDeploymentRecord(deploymentRecord);
    } catch (error) {
        console.error(error);
    }
}


deployContract();