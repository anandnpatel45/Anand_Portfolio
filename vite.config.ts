// vite.config.ts
import { defineConfig } from 'vite'
import react      from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: '/', //command === 'serve' ? '/' : '/Anand_Portfolio/',
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
}))
