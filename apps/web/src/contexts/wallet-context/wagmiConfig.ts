import { createConfig, http } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
    chains: [polygonAmoy],
    connectors: [
        metaMask(),
        // walletConnect()
    ],
    transports: {
        [polygonAmoy.id]: http()
    },
})
