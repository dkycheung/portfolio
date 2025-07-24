import { fileURLToPath, URL } from 'node:url';
import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import inject from '@rollup/plugin-inject';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [vue(), vueJsx(), vueDevTools(), inject({ $: 'jquery', jQuery: 'jquery' }), shareResourcePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
        additionalData: `@import '@/assets/main.scss';
        $resource-base: '/resources/';
        `,
        // additionalData: `
        // @import '@/assets/main.scss';
        // $resource-base: '${process.env.NODE_ENV === 'production' ? '/resources/' : '/resources/'}';
        // `,
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    fs: { allow: [path.resolve(__dirname), path.resolve(__dirname, '../resources')] },
  },
});

function shareResourcePlugin(): Plugin {
  return {
    name: 'shared-resources',
    configureServer(server) {
      server.middlewares.use('/resources', (req, res, next) => {
        const url = req.originalUrl ?? req.url ?? '';
        const relPath = url.replace(/^\/resources/, '');
        const filePath = path.join(__dirname, '../resources', relPath);
        console.debug({ request: url, redirected: filePath });
        try {
          if (fs.existsSync(filePath) && !fs.lstatSync(filePath).isDirectory()) {
            res.setHeader('Content-Type', getMimeType(filePath));
            fs.createReadStream(filePath).pipe(res);
          } else {
            res.statusCode = 404;
            res.end('Not found');
          }
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.svg': 'image/svg+xml',
    // Add other MIME types as needed
  };
  return mimeTypes[ext] || 'application/octet-stream';
}
