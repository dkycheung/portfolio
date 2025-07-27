import { NextFunction } from 'express';
import fs from 'fs';
import http from 'node:http';
import path from 'node:path';
import { Connect, Plugin } from 'vite';

export default function shareResourcePlugin(): Plugin {
  return {
    name: 'shared-resources',
    configureServer(server) {
      server.middlewares.use('/resources', sharedResourcesHandler());
    },
    configurePreviewServer(server) {
      server.middlewares.use('/resources', sharedResourcesHandler());
    },
  };
}

function sharedResourcesHandler() {
  return (req: Connect.IncomingMessage, res: http.ServerResponse, next: NextFunction) => {
    const rawUrl = req.originalUrl ?? req.url ?? '';
    const dir = path.resolve(__dirname, '../../resources');
    const relPath = rawUrl.replace(/^\/resources/, '');
    const filePath = URL.parse(path.join(dir, relPath))?.pathname ?? '';
    // const url = URL.parse(filePath);
    console.debug({ request: rawUrl, redirected: filePath /* debug: { dir, url, relPath, meta: import.meta } */ });

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
