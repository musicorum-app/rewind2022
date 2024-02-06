/// <reference types="@types/node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react({
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        callback: resolve(__dirname, 'callback/index.html')
      }
    }
  }
})
