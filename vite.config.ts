import { defineConfig } from 'vite';
import { internalIpV4 } from 'internal-ip';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(async () => {
    const host = await internalIpV4();

    /** @type {import('vite').UserConfig} */
    const config = {
        plugins: [svelte()],

        // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
        //
        // 1. prevent vite from obscuring rust errors
        clearScreen: false,
        // 2. tauri expects a fixed port, fail if that port is not available
        server: {
            host: '0.0.0.0', // listen on all addresses
            port: 5173,
            strictPort: true,
            hmr: {
                protocol: 'ws',
                host,
                port: 5183,
            },
            watch: {
                // 3. tell vite to ignore watching `src-tauri`
                ignored: ['**/src-tauri/**'],
            },
        },
    };

    return config;
});
