import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin({
    // eslint-disable-next-line
    identifiers: ({ hash }) => `kzzv_app_${hash}`
  })],
})
