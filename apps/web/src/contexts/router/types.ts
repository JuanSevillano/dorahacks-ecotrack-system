import { Address } from "viem";

export type IdParams = Readonly<{ id: string | number | Address }>

export type Paths = ReadonlyArray<{
        path: string;
        Component: React.ComponentType,
        icon?: React.ComponentType;
        libs?: string[];
    }>;
