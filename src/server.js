import http from 'node:http';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { greet } from './greet.js';

const { version } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

export function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');

    if (req.method !== 'GET') {
      res.setHeader('allow', 'GET');
      return sendJson(res, 405, { error: 'method not allowed' });
    }
    if (url.pathname === '/health') {
      return sendJson(res, 200, { status: 'ok', version });
    }
    if (url.pathname === '/greet') {
      return sendJson(res, 200, { message: greet(url.searchParams.get('name')) });
    }
    return sendJson(res, 404, { error: 'not found' });
  });
}

// Start listening only when run directly (`npm start`), not when a test imports this file.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`practice-app ${version} listening on port ${port}`);
  });
}
