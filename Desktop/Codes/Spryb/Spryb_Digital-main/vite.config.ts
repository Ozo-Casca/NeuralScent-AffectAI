import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [react(), tailwindcss(),
    // @ts-ignore
    compression({ algorithm: 'gzip' }),
    // @ts-ignore
    compression({ algorithm: 'brotliCompress' })],
  server: {
    host: true,
    port: 5000,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
})
