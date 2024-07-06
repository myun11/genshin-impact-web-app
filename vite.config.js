import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  base: "https://myun11.github.io/genshin-impact-web-app/",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})