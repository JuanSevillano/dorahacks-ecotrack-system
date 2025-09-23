import { Hash } from "viem";

export type NFTAttributes = ReadonlyArray<{
    trait_type: string;
    value: string | number | boolean;
}>;

export type NFTBase = Readonly<{
    manifest: Hash;
    name: string;
    description: string;
    image: string;
    external_url?: string;
    attributes: NFTAttributes;
}>;
