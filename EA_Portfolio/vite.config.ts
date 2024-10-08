import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
  },
  server: {
    proxy: {
      '/ws': {
        target: 'ws://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/socialauth': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/backdoor': {
        target: 'http://localhost:8000',
        changeOrigin: false,
        secure: false,
      },
    }
  }
})
