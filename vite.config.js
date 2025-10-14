import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/google': {
        target: 'http://suggestqueries.google.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/google/, ''),
      },
      '/api/local': {
        target: `http://10.227.163.73`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
