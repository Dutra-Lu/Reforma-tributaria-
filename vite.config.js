import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' permite publicar no GitHub Pages sem ajustar o caminho
export default defineConfig({ plugins: [react()], base: './' })
