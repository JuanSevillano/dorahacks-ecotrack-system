export type ChainKey = 'sepolia' | 'amoy';

export interface ChainConfig {
  rpcUrl: string;
  chainId: number;
  name: string;
  wormholeRouter?: `0x${string}`;
}

export const CHAINS: Record<ChainKey, ChainConfig> = {
  sepolia: {
    rpcUrl: process.env.RPC_URL_GOERLI!,
    chainId: 11155111,
    name: 'goerli',
    wormholeRouter: '0x0000000000000000000000000000000000000000',
  },
  amoy: {
    rpcUrl: process.env.RPC_URL_AMOY!,
    chainId: 137,
    name: 'mumbai',
    wormholeRouter: '0x0000000000000000000000000000000000000000',
  },
};
