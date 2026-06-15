import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/fit-tracker/', // cambiá esto por el nombre exacto de tu repo
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Fit Tracker Marian',
        short_name: 'FitTracker',
        description: 'Calculadora de macros y suplementos',
        theme_color: '#1a56db',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/fit-tracker/',
        start_url: '/fit-tracker/',
        icons: [
          {
            src: '/fit-tracker/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/fit-tracker/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  server: {
    host: true,
    port: 5173
  }
})