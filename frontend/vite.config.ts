import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import proxyOptions from './proxyOptions';

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    Icons({ compiler: 'vue3' }),
    Components(),
  ],
  base: command === 'build' ? '/assets/fileonix/web/' : '/',
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: proxyOptions
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue-router': path.resolve(__dirname, 'node_modules/vue-router'),
    }
  },
  build: {
    outDir: '../fileonix/public/web',
    emptyOutDir: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
}));
