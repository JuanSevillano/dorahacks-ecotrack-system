import { useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Address, Hex } from 'viem'
import { ContractsContext } from '../../contexts/contracts-context'
import { NFTBase } from '@ecotrack/types';

export const useNFTMetadata = (tokenId: number) => {
    const { nfts } = useContext(ContractsContext) || {}
    return useQuery({
        queryKey: ['nft', 'metadata', tokenId],
        queryFn: async () => {
            const tokenURI = await nfts?.read('tokenURI', [BigInt(tokenId)]) as string;
            const data = await fetchWithFallback(tokenURI);
            const nftData = await data.json() as NFTBase;

            // Fix the image URL to use a reliable gateway
            return {
                ...nftData,
                image: fixImageUrl(nftData.image)
            };
        },
        enabled: !!nfts && tokenId > 0
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

export const fetchWithFallback = async (uri: string): Promise<Response> => {
    const fallbackGateways = [
        uri, // Try original first
        uri.replace(/https:\/\/[^\/]+/, 'https://gateway.pinata.cloud'),
        uri.replace(/https:\/\/[^\/]+/, 'https://ipfs.io'),
        uri.replace(/https:\/\/[^\/]+/, 'https://cloudflare-ipfs.com'),
        uri.replace(/https:\/\/[^\/]+/, 'https://dweb.link')
    ];

    for (const gatewayUri of fallbackGateways) {
        try {
            const response = await fetch(gatewayUri);
            if (response.ok) {
                if (gatewayUri !== uri) {
                    console.warn(`⚠️  Using fallback gateway for: ${gatewayUri}`);
                }
                return response;
            }
        } catch (error) {
            console.warn(`Gateway failed: ${gatewayUri}`, error);
        }
    }

    throw new Error(`All gateways failed for URI: ${uri}`);
};

// Helper function to fix image URLs with fallback gateways
const fixImageUrl = (imageUrl: string): string => {
    // If it's already a working gateway, return as is
    if (imageUrl.includes('gateway.pinata.cloud') || imageUrl.includes('ipfs.io') ||
        imageUrl.includes('cloudflare-ipfs.com') || imageUrl.includes('dweb.link')) {
        return imageUrl;
    }

    // Extract CID from the URL and use a reliable gateway
    const cidMatch = imageUrl.match(/\/ipfs\/([^\/\?]+)/);
    if (cidMatch) {
        const cid = cidMatch[1];
        return `https://gateway.pinata.cloud/ipfs/${cid}`;
    }

    return imageUrl; // Return original if we can't extract CID
};

// Helper function to fetch multiple NFT metadata
const fetchNFTMetadata = async (nfts: any, tokenIds: number[]): Promise<NFTBase[]> => {
    return Promise.all(
        tokenIds.map(async (tokenId) => {
            const tokenURI = await nfts.read('tokenURI', [BigInt(tokenId)]);
            const data = await fetchWithFallback(tokenURI);
            const nftData = await data.json() as NFTBase;

            // Fix the image URL to use a reliable gateway
            return {
                ...nftData,
                image: fixImageUrl(nftData.image)
            };
        })
    );
};

export const useNFTMetadataBatch = (tokenIds: number[]) => {
    const { nfts } = useContext(ContractsContext) ?? {}
    return useQuery({
        queryKey: ['nft', 'metadata', 'batch', tokenIds],
        queryFn: () => fetchNFTMetadata(nfts, tokenIds),
        enabled: !!nfts && tokenIds.length > 0
    })
}

export const useCollectionMetadata = () => {
    const { nfts } = useContext(ContractsContext) ?? {}
    return useQuery({
        queryKey: ['nft', 'collection', 'metadata'],
        queryFn: async () => {
            if (!nfts) throw new Error('Contract not ready')
            const [name, symbol, contractUri, totalSupply] = await Promise.all([
                nfts.read<string>('name'),
                nfts.read<string>('symbol'),
                nfts.read<string>('contractURI'),
                nfts.read<bigint>('totalSupply'),
            ]);
            const data = await fetch(contractUri);
            const contractMetadata = await data.json();

            const tokenIds = Array.from({ length: Number(totalSupply) }).map((_, index) => index + 1);
            const items: NFTBase[] = await fetchNFTMetadata(nfts, tokenIds);
            return { name, symbol, ...contractMetadata, items } as NFTBase & {
                symbol: string,
                items: NFTBase[]
            }
        },
        enabled: !!nfts
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

