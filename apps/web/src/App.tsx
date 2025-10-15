import React from 'react';
import { ReactQueryProvider } from './contexts/react-query/provider';
import { ReactQueryTools } from './contexts/react-query/dev-tools';
import { AppRoutes, RouterProvider } from './contexts/router/provider';
import { Layout } from './contexts/layout-context/layout-context';
import { UIThemeProvider } from './contexts/theme-context/theme-context';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './contexts/wallet-context/wagmiConfig';
import { WalletProvider } from './contexts/wallet-context/WalletContext';
import { ContractsProvider } from './contexts/contracts-context';
import { LangProvider } from '@ecotrack/lang';

const App: React.FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ReactQueryProvider>
        <ReactQueryTools>
          <WalletProvider>
            <ContractsProvider>
              <LangProvider>
                <RouterProvider>
                  <UIThemeProvider>
                    <Layout>
                      <AppRoutes />
                    </Layout>
                  </UIThemeProvider>
                </RouterProvider>
              </LangProvider>
            </ContractsProvider>
          </WalletProvider>
        </ReactQueryTools>
      </ReactQueryProvider >
    </WagmiProvider>

  );
};

export default App;
