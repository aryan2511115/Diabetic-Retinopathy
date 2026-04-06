import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['three', 'three-mesh-bvh', 'troika-three-text'],
  },
  resolve: {
    alias: {
      'three': path.resolve(__dirname, 'node_modules/three'),
      'three-mesh-bvh': path.resolve(__dirname, 'node_modules/three-mesh-bvh/build/index.module.js'),
      'troika-three-text': path.resolve(__dirname, 'node_modules/troika-three-text/dist/troika-three-text.umd.min.js'),
    },
  },
})
