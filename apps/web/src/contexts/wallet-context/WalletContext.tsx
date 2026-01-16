import { createContext, ReactNode } from 'react'
import { useAccount } from 'wagmi'

type WalletContextType = {
  isConnected: boolean
  address?: string
  status?: string
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected, status } = useAccount()

  return (
    <WalletContext.Provider value={{ isConnected, address, status }}>
      {children}
    </WalletContext.Provider>
  )
}
