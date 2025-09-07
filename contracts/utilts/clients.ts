import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;
if (!PRIVATE_KEY) throw new Error("❌ Missing PRIVATE_KEY in .env");

const NETWORK = process.env.NETWORK || "amoy";
const rpcUrl = process.env.RPC_URL_AMOY!; // Default testnet

const CHAIN =chains.polygonAmoy; (chains as any)[NETWORK];
if (!CHAIN) throw new Error(`❌ Unsupported network: ${NETWORK}`);

export const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

export const walletClient = createWalletClient({
  account,
  chain: CHAIN,
  transport: http(rpcUrl || ""),
});

export const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http(rpcUrl || ""),
});
