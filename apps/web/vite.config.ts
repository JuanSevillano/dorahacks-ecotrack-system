import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'path';

// Plugin personalizado para recargar cuando los contratos cambien
const contractWatchPlugin = () => ({
  name: 'contract-watch',
  configureServer(server: any) {
    const contractPath = resolve(__dirname, '../../packages/contracts/dist');
    server.watcher.add(contractPath);
    server.watcher.on('change', (path: any) => {
      if (path.startsWith(contractPath)) {
        server.ws.send({ type: 'full-reload' });
      }
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({
      // eslint-disable-next-line
      identifiers: ({ hash }) => `kzzv_app_${hash}`
    }),
    contractWatchPlugin()
  ],
  resolve: {
    alias: {
      '@contracts': resolve(__dirname, '../../packages/contracts/dist'),
      '@ecotrack/types': resolve(__dirname, '../../packages/shared-types/dist'),
      '@app': resolve(__dirname, './src'),
    }
  }
})
