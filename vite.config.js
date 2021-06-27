import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { VitePWA } from 'vite-plugin-pwa'
import styleImport from 'vite-plugin-style-import'

const pwaConfig = {
  manifest: {
    theme_color: '#132968',
    background_color: '#132968',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Map Tracker',
    short_name: 'DAT Map',
    description: 'Dat Map Tracker for fast claim assigment',
    icons: [
      {
        src: 'images/manifest-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: 'images/manifest-icon-512.png',
        sizes: '384x384',
        type: 'image/png'
      }
    ]
  },
  workbox: {
    // workbox options for generateSW
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaConfig),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: name => {
            name = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${name}.scss`
          },
          resolveComponent: name => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: ['socket.io-client']
  },
  build: {
    rollupOptions: {
      external: ['@googlemaps/js-api-loader']
    }
  }
})
