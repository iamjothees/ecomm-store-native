import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(), 
      tailwindcss(), 
      VitePWA({
        manifest: {
          "name": env.VITE_STORE_NAME,
          "short_name": env.VITE_STORE_SHORT_NAME || env.VITE_STORE_NAME,
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
    }
  };
})
