import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  base: '/static/',
  build: {
    outDir: 'static/dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'static/src/main.js'),
        styles: resolve(__dirname, 'static/src/styles.css'),
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
  server: {
    origin: 'http://localhost:5173',
    cors: true,
  },
})
