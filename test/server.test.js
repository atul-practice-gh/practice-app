import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/server.js';

let server;
let base;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('GET /health says ok and names the version', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.match(body.version, /^\d+\.\d+\.\d+$/);
});

test('GET /greet greets the name it is given', async () => {
  const res = await fetch(`${base}/greet?name=Ada`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { message: 'Hello, Ada!' });
});

test('GET /greet without a name greets the world', async () => {
  const res = await fetch(`${base}/greet`);
  assert.deepEqual(await res.json(), { message: 'Hello, world!' });
});

test('an unknown path is 404', async () => {
  const res = await fetch(`${base}/nope`);
  assert.equal(res.status, 404);
});

test('a method other than GET is 405', async () => {
  const res = await fetch(`${base}/health`, { method: 'POST' });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'GET');
});
