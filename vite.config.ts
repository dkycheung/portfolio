import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import inject from '@rollup/plugin-inject';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools';
import plugins from './plugins/plugins';

const fileRegex = /^(?<path>.*\/)(?<filename>[^/]+?)\.(?<filetype>[^/.]+)(?:\?(?<query>[^#]*))?(?:#.*)?$/;

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    inject({ $: 'jquery', jQuery: 'jquery' }),
    ...plugins,
    // visualizer({ open: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
        additionalData: `
        @import '@/assets/main.scss';
        $resource-base: '/resources/';
        `,
      },
    },
    devSourcemap: false,
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: { allow: [path.resolve(__dirname), path.resolve(__dirname, '../resources')] },
    watch: {
      usePolling: true,
      interval: 1000,
      followSymlinks: false,
    },
  },
  preview: {
    strictPort: true,
    headers: { 'cache-control': 'public, max-age=0' },
  },
  build: {
    // chunkSizeWarningLimit: 1500, // in kB
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // Ensure dynamic imports are preserved
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('src/components/')) {
            const mg = id.match(fileRegex)?.groups;
            console.log(
              `Catch component: ${mg?.filename}.${mg?.filetype}${mg?.query != undefined ? ' (' + mg.query + ')' : ''}`,
            );
            // console.log(`Catch component: ${id}`);
            return mg?.filename ?? 'components';
          }
          if (id.includes('src/views/')) {
            const mg = id.match(fileRegex)?.groups;
            console.log(`Catch view: ${mg?.filename}.${mg?.filetype}${mg != undefined ? ' (' + mg.query + ')' : ''}`);
            // console.log(`Catch view: ${id}`);
            return mg?.filename ?? 'views';
            // return 'components';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['vue-router', 'bootstrap/scss/bootstrap.scss'],
    exclude: ['vue', '@vitejs/plugin-vue'],
  },
  cacheDir: './.vite_cache',
});
