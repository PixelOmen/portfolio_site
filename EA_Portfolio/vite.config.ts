import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
  },
  server: {
    proxy: {
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
        changeOrigin: true,
        secure: false,
      },      
    }
  }
})
