// FILE: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },
  server: {
    port: 5173,
    // Proxy API calls to avoid CORS during development
    proxy: {
      '/api': {
        target: 'http://localhost:5160',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
