import React from 'react';
import { ReactQueryProvider } from './contexts/react-query/provider';
import { ReactQueryTools } from './contexts/react-query/dev-tools';
import { AppRoutes, RouterProvider } from './contexts/router/provider';
import { Layout } from './contexts/layout-context/layout-context';
import { UIThemeProvider } from './contexts/theme-context/theme-context';
import { SimpleThemeTransition } from './contexts/theme-context/SimpleThemeTransition';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './contexts/wallet-context/wagmiConfig';
import { WalletProvider } from './contexts/wallet-context/WalletContext';
import { ContractsProvider } from './contexts/contracts-context';
import { LangProvider } from '@ecotrack/lang/src/LangProvider';

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
                    <SimpleThemeTransition>
                      <Layout>
                        <AppRoutes />
                      </Layout>
                    </SimpleThemeTransition>
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
