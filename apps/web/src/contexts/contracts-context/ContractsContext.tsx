import { createContext, ReactNode } from 'react'
import { useNFTContract } from './BiokeysCollection.contract';

export type Contracts = {
    nfts: {
        read: <T = unknown>(fn: string, args?: readonly unknown[]) => Promise<T>;
        write: (fn: string, args?: readonly unknown[]) => Promise<`0x${string}`>;
    };
}

export const ContractsContext = createContext<Contracts | undefined>(undefined);

export const ContractsProvider = ({ children }: { children: ReactNode }) => {

    const value = {
        nfts: useNFTContract()
    }

    return (
        <ContractsContext.Provider value={value}>
            {children}
        </ContractsContext.Provider>
    )
}

