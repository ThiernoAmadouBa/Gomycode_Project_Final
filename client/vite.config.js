import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias pour simplifier les importations
    },
  },
  server: {
    port: 4000, // Définit le port du serveur de développement
    open: true, // Ouvre automatiquement le navigateur
    proxy: {
      '/api': {
        target: 'https://gomycode-project-final.onrender.com', // Proxy pour les requêtes API
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
