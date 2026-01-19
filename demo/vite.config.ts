import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))


export default defineConfig({
  plugins: [svgr(), react()],
  base: '/progress-bars/',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5174,
        host: true,
    },
    build: {
        outDir: 'dist',
    },

})
