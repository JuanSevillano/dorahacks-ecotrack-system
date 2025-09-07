import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";

import * as dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  settings: { optimizer: { enabled: true, runs: 200 } },
  networks: {
    // 🔧 Testnets
    sepolia: {
      url: process.env.RPC_SEPOLIA || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.RPC_MUMBAI || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // 🟣 Producción
    polygon: {
      url: process.env.RPC_POLYGON || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    ethereum: {
      url: process.env.RPC_MAINNET || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_KEY || "",
      sepolia: process.env.ETHERSCAN_KEY || "",
      mainnet: process.env.ETHERSCAN_KEY || "",
    },
  },
};

export default config;
