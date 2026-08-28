# Garden Care Map — build handoff

## What shipped

- A responsive garden canvas for placing patterned beds, plants, and connected irrigation segments.
- Plant records with variety, active/finished state, dated care notes, and optional local photos.
- Automatic water-line length totals in metric or imperial units.
- Local-first IndexedDB persistence, complete JSON export/import, and care-history CSV export.
- A separate `/demo` namespace with four beds, five plants, four water segments, three notes, reset, and an explicit exit to real data.
- A service worker, install manifest, offline fallback, update notice, app icons, and offline reload support.
- Home, map, demo, privacy, terms, and styled 404 routes with history navigation and route focus management.
- A free core product plus a $12 one-time season keeper. The Sociobot checkout, return token, daily verification cache, restore form, and downloadable season snapshots are implemented without a hardcoded billing product ID.
- Original botanical field-guide artwork and an authored sprout mark. Prompt and provenance are in `.factory/design.md`.

## Run and verify

```sh
npm install
npm test
npm run build
```

The deploy command is `npm run build`. It creates `dist/index.html` and a 576 KB complete static output. The bundled app shell is 16.22 KB gzip, including 11.52 KB gzip JavaScript and 4.56 KB gzip CSS. The 640 px hero is 58 KB; the 1024 px hero is 150 KB.

Final checks on 2026-08-28:

- `npm test`: 18 passed in Chromium, including a separate 390 × 844 mobile project.
- Seven tests match the seven entries in `.factory/claims.json`.
- Playwright axe: no serious or critical findings on `/`, `/demo`, `/map`, `/privacy`, `/terms`, or the 404 route.
- Worker URL verification on `/demo`: HTTP 200, no console errors, one h1, `lang=en`, main landmark, and no missing alt text.
- Offline: `/demo` reloaded with the browser network disabled and retained its sample map.
- Lighthouse mobile: Performance 97, Accessibility 100, Best Practices 100, SEO 100.
- Lighthouse lab metrics: LCP 2.0 s, CLS 0, total blocking time 170 ms.
- `npm audit --audit-level=high`: zero vulnerabilities.
- Screenshot and verifier output: `.factory/evidence/`.

## Known gaps and next steps

- The canvas uses a fixed scale of ten grid units per selected meter. A future version could let gardeners calibrate the grid to a measured reference.
- Beds can be renamed or replaced, but direct drag and resize handles are not part of v1.
- Photos stay inside IndexedDB and are limited to 1.5 MB each. There is no compression or cross-device sync.
- Billing verification is implemented against the production Sociobot URL. The factory still needs to register the product and set its checkout price to $12 before release.
- Real-device install testing on Android and iOS remains a release check; browser PWA installation and offline behavior are covered here.
