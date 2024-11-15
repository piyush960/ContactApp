import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      VITE_REACT_ENV: process.env.VITE_REACT_ENV,
    },
  }  
})
