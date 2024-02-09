import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'


export default defineConfig({
  base: '/feedback-vue-app/',
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url' // or 'raw'
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
