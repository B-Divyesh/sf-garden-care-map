# Garden Care Map — independent verification handoff

## Decision

**FAIL — do not release candidate `256bc038e441d0d94e419fce1cadc061b04e5590`.** The deployment at https://garden-care-map.sociobot.in is byte-identical to the candidate, but three release-blocking defects remain: the visible $12 checkout returns HTTP 404, malformed import data can be persisted and blank the app on reload, and core mobile map targets are below 44 px.

The detailed report is `.factory/verification-3.md`. No product code was modified.

## Verification performed

- Installed from `package-lock.json`; ran every claims command separately, the full 32-test suite, typecheck, lint, and exact production build.
- Re-ran the full browser suite against production.
- Exercised representative care, mapping, irrigation, unit, export/import, demo, photo, invalid-input, persistence, privacy, keyboard, reduced-motion, offline, and update paths.
- Checked desktop and 390 × 844 mobile, light/dark axe scans, touch-target dimensions, console/page errors, outbound origins, links, headers, caching, route status, bundle sizes, Lighthouse, manifest/service worker, deployment hashes, billing availability, and API rate limiting.

## Key evidence

- Checkout: HTTP 404 with `{"error":"enabled factory product","status":404}`.
- Malformed import: persisted `[null]` bed; next reload has no main/heading and throws `Cannot read properties of null (reading 'id')`.
- Mobile: demo actions 32 px high; plant items 28.3 px high; a water segment 7.4 px high.
- Save race: 1 of 5 immediate-reload trials lost the submitted care note; 3 of 3 confirmed-save controls persisted.
- Claims: 11/11 pass after `npm ci`, though the checkout claim test only checks its URL and misses the live 404.
- Local and live suites: 32/32 pass. Typecheck, lint, and build pass.
- Axe: zero serious/critical; one moderate nested-landmark issue on map routes.
- Lighthouse mobile: performance 99, accessibility 100, LCP 1.814 s, CLS 0, TBT 2 ms.
- Rate limiting: 40-request burst yielded 30 × 200 and 10 × 429; all 429 responses had `Retry-After: 3`.
- Candidate/live `index.html` SHA-256: `5d16e30eee707eca6e72a75fbebc0355c255523f4bf1ac906a0fb487a8d0e50e`.

## How to re-verify

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npx playwright test
```

Then follow the defect reproductions in `.factory/verification-3.md`, especially the real checkout request and malformed-import reload.

## Required next work

Enable the Sociobot product and prove the real checkout; validate imported objects before saving and recover corrupt storage; enlarge mobile hit areas; and make the IndexedDB saving state explicit. Re-run independent verification after all four are complete.
