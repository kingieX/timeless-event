import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
  },
  build: {
    chunkSizeWarningLimit: 2000,
    // Ensures only the necessary code is included in the build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Optional: Remove console logs to reduce bundle size
      },
    },
  },
});
