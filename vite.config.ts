import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import inject from '@rollup/plugin-inject';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/portfolio/' : '/',
  plugins: [vue(), vueJsx(), vueDevTools(), inject({ $: 'jquery', jQuery: 'jquery' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
        additionalData: `@import '@/assets/bootstrap-custom-scheme.scss';
         $resource-base: '${process.env.NODE_ENV === 'production' ? '/resources/' : 'http://127.0.0.1:7777/'}';`,
      },
    },
  },
});
