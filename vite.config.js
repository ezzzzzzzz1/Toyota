import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/Toyota/', // Base URL for GitHub Pages deployment
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-forklift.code95.info',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
