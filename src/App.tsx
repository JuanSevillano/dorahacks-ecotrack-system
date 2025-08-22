import React from 'react';
import { ReactQueryProvider } from './contexts/react-query/provider';
import { ReactQueryTools } from './contexts/react-query/dev-tools';
import { AppRoutes, RouterProvider } from './contexts/router/provider';
import { Layout } from './components/layout/layout-context';
import { UIThemeProvider } from './contexts/theme/theme-context';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './contexts/wallet/wagmiConfig';
import { WalletProvider } from './contexts/wallet/WalletContext';



const App: React.FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <ReactQueryProvider>
        <ReactQueryTools>
          <WalletProvider>
            <RouterProvider>
                <UIThemeProvider>
                  <Layout>
                    <AppRoutes />
                  </Layout>
                </UIThemeProvider>
            </RouterProvider>
          </WalletProvider>
        </ReactQueryTools>
      </ReactQueryProvider >
    </WagmiProvider>

  );
};

export default App;
