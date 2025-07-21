import e from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

console.log('Start server.ts');

async function start() {
  const app = e();

  // 1. Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // 2. Serve Vite-powered Vue app
  app.use('/portfolio', vite.middlewares);

  // 3. Serve static resources
  app.use('/resources', e.static(path.resolve(__dirname, '../../resources')));

  // 4. Start server
  app.listen(5173, () => {
    console.log(`
      Dev server running:
      - App:      http://localhost:5173/portfolio
      - Resources: http://localhost:5173/resources
    `);
  });
}

start().catch((err) => {
  console.error('Server error:', err);
  process.exit(1);
});
