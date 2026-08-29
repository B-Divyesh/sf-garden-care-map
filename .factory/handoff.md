# Garden Care Map — polish 3 handoff

## Result

Perfection-loop round 3 is complete. `F-3-1`, the last cumulative finding, is repaired: the landing promise **“It opens a complete garden map”** is now the `sample-demo` claim, with one tagged end-to-end test that starts on the landing page and proves the realistic isolated demo result.

The botanical field-guide visual identity, local-first PWA artifact class, and static deployment remain intact. No review finding of any severity is unresolved.

## Repair and deployment

- Repair commit: `ab1022293b39d8909c5a706d6ac4d31ad813e5de` (`test: cover complete sample demo claim`)
- Deployment: Azure Static Web Apps `63598df7-9ab3-4d4b-95ef-4ec9696afe2b`
- Live product: <https://garden-care-map.sociobot.in/>
- One-click isolated demo: <https://garden-care-map.sociobot.in/?demo=1>
- Readable demo alias: <https://garden-care-map.sociobot.in/demo>

## What changed

- Added `sample-demo` to `.factory/claims.json`: **“Try it with sample data opens a complete sample garden map.”**
- Retagged and strengthened the first-screen browser regression. From a fresh landing page it clicks the action and asserts `?demo=1`, the persistent no-save banner, four beds, five plants, four water lines, and a visible dated care note.
- Updated the catalog sentence to the verb-first, 81-character line: “Map beds, plants, care notes, and water lines in a private offline garden record.”
- Updated the copy audit and added `.factory/polish-3.md`, which maps every `F-1-*`, `F-2-*`, and `F-3-1` finding to the fix and fresh live evidence.

## Exact verification evidence

Clean clone: `/tmp/garden-care-map-polish-3.jEPmsS`, commit `ab1022293b39d8909c5a706d6ac4d31ad813e5de`.

- `npm ci`: passed; 132 packages installed; zero vulnerabilities.
- Every exact claim command in `.factory/claims.json`: **13/13 passed individually** — `offline-reload`, `local-private`, `sample-demo`, `demo-isolation`, `care-persistence`, `free-core-tools`, `json-export`, `csv-export`, `local-note-photo`, `water-total`, `license-verify`, `license-network-origin`, and `season-keeper-checkout`.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: passed, **48/48**. This includes the offline service-worker reload, same-origin privacy checks, demo isolation, exports/import recovery, licenses, complete route metadata, real 404, keyboard, mobile 390 px/200% text, and light/dark Playwright Axe coverage.
- `npm run build`: passed; `dist/index.html` is 56,498 bytes (17.91 kB gzip). The compiled JavaScript and CSS remain under the static-product payload budgets.
- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test`: passed, **48/48** after deployment.
- `verify-url.sh` passed on `/` and `/?demo=1`: HTTP 200, no console or page errors, title, `lang=en`, one h1, main landmark, no missing image alt text, and no unnamed buttons.
- Cold route checks: `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms` returned HTTP 200; `/missing-page` returned HTTP 404 with the styled product shell and legal links.
- Live headers include CSP, `X-Content-Type-Options`, `Referrer-Policy`, HSTS, and `Permissions-Policy`. The CSP permits only same-origin resources plus the documented Sociobot billing API.
- Local and live root HTML SHA-256 match: `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.7 s and CLS 0. Report: `.factory/evidence/polish-3-live/lighthouse.json`.

Fresh visual evidence is in `.factory/evidence/polish-3-live/`, including the mobile first screen, isolated demo, and real 404 screenshots.

## Run locally

```sh
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/?demo=1` for the isolated sample.

## Known gaps and next steps

None for this work order.
