import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { imagetools } from 'vite-imagetools';
import path from 'path';
export default defineConfig({
    plugins: [
        react(),
        imagetools({
            defaultDirectives: function (url) {
                if (url.searchParams.has('webp')) {
                    return new URLSearchParams('format=webp&quality=90');
                }
                return new URLSearchParams();
            },
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.png', 'favicon.webp', 'Oostboek.webp'],
            manifest: {
                name: 'Oostboek Client Portal',
                short_name: 'Oostboek',
                description: 'Oostboek Digital CRM Hub - Your accounting partner',
                theme_color: '#1e40af',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api\./i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24, // 24 hours
                            },
                        },
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
});
