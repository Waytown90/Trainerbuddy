import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Replaces process.env.API_KEY in the source code with the actual value during build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    // historyApiFallback is handled automatically by Vite's dev server for index.html
    port: 3000
  }
});