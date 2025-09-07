import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const target = process.env.VITE_API_PROXY_TARGET;

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: target
      ? {
          '/api': {
            target,
            changeOrigin: true,
          },
        }
      : undefined,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom'] }
      }
    }
  }
})
