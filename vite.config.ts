import {  defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import serveResumePlugin from './convert-resume-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [serveResumePlugin(),react(),],
})
