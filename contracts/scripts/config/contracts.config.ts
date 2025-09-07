import {
    PaymentManager,
    P2PPayment,
    PayrollPayment,
    BridgeAdapter,
} from "../../build-contracts";
import { ContractConfig } from "../types";


const wormhole = '0x6b9C8671cdDC8dEab9c719bB87cBd3e782bA6a35'; // TODO: must be a .env

export const contractsConfig = [
    {
        name: "BridgeAdapter",
        abi: BridgeAdapter.abi,
        bytecode: BridgeAdapter.bytecode,
        args: [wormhole],
    },
    {
        name: "PaymentManager",
        abi: PaymentManager.abi,
        bytecode: PaymentManager.bytecode,
        args: [{ contract: "BridgeAdapter" }],
    },
    {
        name: "P2PPayment",
        abi: P2PPayment.abi,
        bytecode: P2PPayment.bytecode,
        args: [{ contract: "PaymentManager" }],
    },
    {
        name: "PayrollPayment",
        abi: PayrollPayment.abi,
        bytecode: PayrollPayment.bytecode,
        args: [{ contract: "PaymentManager" }],
    },
] satisfies ReadonlyArray<ContractConfig>;
