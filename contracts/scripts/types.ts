import { Hex } from "viem";

export type ContractArg = string | number | { contract: string };

export type Address = `0x${string}`;

type ByteCode = {
    object: Address,
    sourceMap: string,
    linkReferences: Record<string, any>;
}

export type ContractConfig = {
    name: string;
    abi: any;
    bytecode: Hex | ByteCode;
    args?: ContractArg[],
    options?: { gas: bigint };
}