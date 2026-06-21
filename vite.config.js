import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile()],
    base: './',
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'esbuild',
        assetsInlineLimit: 100000000,
        rollupOptions: {
            output: {
                manualChunks: undefined,
                inlineDynamicImports: true
            }
        }
    },
    server: {
        port: 5173,
        open: false,
        // Proxy configuration for future API integration
        proxy: {}
    }
});
