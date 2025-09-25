import { useContext } from "react"
import { WalletContext } from "../../contexts/wallet-context/WalletContext"

export const useWallet = () => {
    const ctx = useContext(WalletContext)
    if (!ctx) throw new Error('useWallet debe usarse dentro de WalletProvider')
    return ctx
}
