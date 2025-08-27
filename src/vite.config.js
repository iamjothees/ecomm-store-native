import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({
      manifest: {
        "name": "Ecomm Store Native",
        "short_name": "Ecomm Store",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#edf1ff",
        "theme_color": "#322d84",
        "icons": [
          {
            "src": "/logo.png",
            "sizes": "192x192",
            "type": "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
