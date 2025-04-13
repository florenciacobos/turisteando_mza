import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Turisteando MZA',
        short_name: 'Turisteando',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        "icons": [
          {
            "src": "icons/android/android-launchericon-192-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "icons/android/android-launchericon-512-512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "icons/ios/180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "icons/windows11/Square150x150Logo.scale-100.png",
            "sizes": "150x150",
            "type": "image/png"
          }
        ]

      }
    })
  ]
})
