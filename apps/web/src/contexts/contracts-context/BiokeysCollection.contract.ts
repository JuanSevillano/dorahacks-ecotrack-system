import { readContract, writeContract } from 'wagmi/actions';
import { VerdeCapContracts } from '@ecotrack/verde-cap/scripts';
import { useConfig } from 'wagmi';
import type { Abi } from 'viem';
import { useMemo } from 'react';
import type { Contracts } from '.';

export const useNFTContract = () => {
    const config = useConfig();
    return useMemo<Contracts['nfts']>(() => ({
        read: async <T = unknown>(functionName: string, args: readonly unknown[] = []) => {
            const result = await readContract(config, {
                address: VerdeCapContracts.biokeyCollection.address,
                abi: VerdeCapContracts.biokeyCollection.contract.abi,
                functionName,
                args,
            });
            return result as T;
        },
        write: async (functionName: string, args: readonly unknown[] = []) => {
            return await writeContract(config, {
                address: VerdeCapContracts.biokeyCollection.address,
                abi: VerdeCapContracts.biokeyCollection.contract.abi as Abi,
                functionName,
                args,
            }) as `0x${string}`;
        }
    }), [config]);
}