import { useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Address, Hex } from 'viem'
import { ContractsContext } from '../../contexts/contracts-context'
import { NFTBase } from '@ecotrack/types';

export const useNFTMetadata = (tokenId: number) => {
    const { nfts } = useContext(ContractsContext) || {}
    return useQuery({
        queryKey: ['nft', 'tokenURI', tokenId],
        queryFn: async () => {
            const tokenURI = await nfts?.read('tokenURI', [BigInt(tokenId)]) as string;
            const data = await fetch(tokenURI);
            return await data.json() as NFTBase
        },
        enabled: !!nfts
    })
}

export const useGetOwnerOf = (tokenId: number) => {
    const { nfts } = useContext(ContractsContext) ?? {}
    return useQuery({
        queryKey: ['nft', 'ownerOf', tokenId],
        queryFn: async () => {
            if (!nfts) throw new Error('Contract not ready')
            return await nfts.read<Address>('ownerOf', [BigInt(tokenId)])
        },
        enabled: !!nfts && tokenId > 0
    })
}

type MintArgs = { to: Address; manifestRoot: Hex; metadataURI: string }

export const useMintNFT = () => {
    const { nfts } = useContext(ContractsContext) ?? {}
    return useMutation({
        mutationKey: ['nft', 'mint'],
        mutationFn: async ({ to, manifestRoot, metadataURI }: MintArgs) => {
            if (!nfts) throw new Error('Contract not ready')
            const hash = await nfts.write('mint', [to, manifestRoot, metadataURI])
            return hash
        }
    })
}

