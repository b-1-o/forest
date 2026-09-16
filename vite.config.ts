import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/forest/',
  build: { target: 'es2020', cssMinify: 'lightningcss' }
})
