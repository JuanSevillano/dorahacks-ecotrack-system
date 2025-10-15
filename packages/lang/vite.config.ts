import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

export default defineConfig({
    plugins: [react(), dts({ entryRoot: './src' })],
    build: {
        emptyOutDir: false,
        lib: {
            entry: './src/index.tsx',
            formats: ['es'],
            fileName: 'index',
        },
        sourcemap: true,
        rollupOptions: {
            external: [...Object.keys(peerDependencies), /^react(\/.+)?$/],
        },
    },
});
