# practice-app

A tiny HTTP service (Node.js, no dependencies) used to practise agent-driven delivery.

## Commands

Run from the repository root. Node 22 or newer.

| What | Command | Expect |
|---|---|---|
| Install | `npm ci` | exits 0; there are no dependencies, so nothing is downloaded |
| Test (all) | `npm test` | every test passes, in about a second |
| One test file | `node --test test/greet.test.js` | its tests pass |
| Run locally | `npm start` | `practice-app <version> listening on port 3000` (set `PORT` to change it) |

## Layout

- `src/greet.js`: the greeting logic, a pure function.
- `src/server.js`: the HTTP server. `GET /health` and `GET /greet?name=`; anything else is 404, any method but GET is 405.
- `test/`: unit tests, Node's built-in test runner (`node:test`). Each new behaviour gets a test here.

## Rules

- Keep it dependency-free unless a ticket says otherwise.
- Never push to `main`; work on a branch and open a pull request. CI must be green before merge.
- Do not edit `.github/workflows/` or anything under `tests/acceptance/`.
- Never commit a secret. This repository is public.
