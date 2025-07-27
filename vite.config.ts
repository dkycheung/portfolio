import { fileURLToPath, URL } from 'node:url';
import { Connect, defineConfig, Plugin } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import inject from '@rollup/plugin-inject';
import fs from 'fs';
import path from 'path';
import http from 'node:http';
import { NextFunction } from 'express';
import plugins from './plugins/plugins';

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    inject({ $: 'jquery', jQuery: 'jquery' }),
    ...plugins,
    // shareResourcePlugin(),
    // debugUrl(),
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
        // additionalData: `
        // @import '@/assets/main.scss';
        // $resource-base: '${process.env.NODE_ENV === 'production' ? '/resources/' : '/resources/'}';
        // `,
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
            console.log(`Catch component: ${id}`);
            return 'components';
          }
          if (id.includes('src/views/')) {
            console.log(`Catch view: ${id}`);
            return 'components';
          }
          console.log(`Catch other: ${id}`);
        },

        // dir: "./build",
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // },
      },
    },
  },
  optimizeDeps: {
    include: ['vue-router', 'bootstrap/scss/bootstrap.scss'],
    exclude: ['vue', '@vitejs/plugin-vue'],
  },
  cacheDir: './.vite_cache',
});

// debug print
console.debug({ cwd: process.cwd() });

// function debugUrl(): Plugin {
//   return {
//     name: 'debug-urls',
//     transform(code, id) {
//       // console.log({ code, id });
//       if (code.includes('new URL(')) {
//         console.log(`URL construction in ${id}:`, code.match(/new UR:\(.*?\)/g));
//       }
//     },
//   };
// }

// function shareResourcePlugin(): Plugin {
//   return {
//     name: 'shared-resources',
//     configureServer(server) {
//       server.middlewares.use('/resources', sharedResourcesHandler());
//     },
//     configurePreviewServer(server) {
//       server.middlewares.use('/resources', sharedResourcesHandler());
//     },
//   };
// }

// function sharedResourcesHandler() {
//   return (req: Connect.IncomingMessage, res: http.ServerResponse, next: NextFunction) => {
//     const url = req.originalUrl ?? req.url ?? '';
//     const relPath = url.replace(/^\/resources/, '');
//     const filePath = path.join(__dirname, '../resources', relPath);
//     console.debug({ request: url, redirected: filePath });
//     try {
//       if (fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
//         res.setHeader('Content-Type', getMimeType(filePath));
//         fs.createReadStream(filePath).pipe(res);
//       } else {
//         res.statusCode = 404;
//         res.end('Not found');
//       }
//     } catch (err) {
//       next(err);
//     }
//   };
// }

// function getMimeType(filePath: string): string {
//   const ext = path.extname(filePath).toLowerCase();
//   const mimeTypes: Record<string, string> = {
//     '.jpg': 'image/jpeg',
//     '.jpeg': 'image/jpeg',
//     '.png': 'image/png',
//     '.html': 'text/html',
//     '.htm': 'text/html',
//     '.svg': 'image/svg+xml',
//     // Add other MIME types as needed
//   };
//   return mimeTypes[ext] || 'application/octet-stream';
// }
