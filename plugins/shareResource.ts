import { Plugin, Connect } from 'vite';
import { NextFunction } from 'express';
import http from 'node:http';
import path from 'node:path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';

console.debug(`shareResources.ts: `, {});

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
    const url = req.originalUrl ?? req.url ?? '';
    const dir = fileURLToPath(import.meta.url);
    const relPath = url.replace(/^\/resources/, '');
    const filePath = path.join(__dirname, '../../resources', relPath);
    console.debug({ dir, originalUrl: req.originalUrl, url: req.url });
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
