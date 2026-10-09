import { defineConfig } from 'vite'

export default defineConfig({
  base: '/admin/',
  server: {
    port: 5174,
    proxy: { '/api': 'http://localhost:5000' },
  },
})
