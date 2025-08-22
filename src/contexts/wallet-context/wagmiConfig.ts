import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
    chains: [mainnet],
    connectors: [
        metaMask(),
        // walletConnect()
    ],
    transports: {
        [mainnet.id]: http()
    },
})
