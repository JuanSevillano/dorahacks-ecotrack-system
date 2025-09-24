import { Hash } from "viem";

export type NFTAttributes = ReadonlyArray<{
    trait_type: string;
    value: string | number | boolean;
}>;

export type NFTBase = Readonly<{
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: NFTAttributes;
    manifest: Hash;
    verdeCapSchemaUri: string;
}>;
