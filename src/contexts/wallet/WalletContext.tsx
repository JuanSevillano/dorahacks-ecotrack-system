import { createContext, useContext, ReactNode } from 'react'
import { useAccount } from 'wagmi'

type WalletContextType = {
  isConnected: boolean
  address?: string
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount()

  return (
    <WalletContext.Provider value={{ isConnected, address }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet debe usarse dentro de WalletProvider')
  return ctx
}
