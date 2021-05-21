import { defineConfig } from 'vite'
import plugin from './plugin'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            input: './input1.js',
        },
    },
    plugins: [plugin()]
})