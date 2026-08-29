# Garden Care Map — polish 1 handoff

## Result

Repair commit: `e8eb8da2288f2ba96043a420f189c4832b22036d` (based on release candidate `37a49097a9df6f2b306f2cd067ebf89db5d39811`). It resolves every finding in `.factory/review-1.md` and preserves the botanical field-guide visual system.

## What changed

- The mobile hero now puts the job, action, and all three privacy/offline/free facts before the artwork.
- Rewrote every flagged first-read copy unit; removed unsupported refund wording.
- Added a recorded-fixture license-network-origin claim and test; `.factory/claims.json` now has 12 claims, each with exactly one tagged test.
- Made preview and demo water totals match at 16.8 m.
- Added complete per-route title, description, canonical, Open Graph, and Twitter metadata.
- Rebuilt the actual static 404 shell with header, legal/footer links, favicon, Apple touch icon, metadata, and a plain `Page not found` heading.
- Bumped the PWA cache and release asset query version so an updated service worker precaches the repaired shell.

The complete finding-to-change mapping is in `.factory/polish-1.md`. The verb-first catalog description is in `.factory/catalog-description.txt`.

## Verification

Fresh dependency install: `npm ci` — PASS (132 packages; 0 vulnerabilities).

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run build` — PASS; `dist/index.html` produced, 55.78 kB / 17.70 kB gzip
- `npm test` — PASS; 45 Playwright tests, including light/dark axe scans, mobile, offline, privacy, routing, and regression coverage
- Every exact command in `.factory/claims.json` — PASS individually: offline-reload, local-private, demo-isolation, care-persistence, free-core-tools, json-export, csv-export, local-note-photo, water-total, license-verify, license-network-origin, season-keeper-checkout
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ .factory/evidence/polish-1-local` — PASS: 200, 542 ms, no console/page errors, title/lang/one h1/main/alt/button checks pass

Evidence:

- `.factory/evidence/polish-1-home-390.png` — cold 390 × 844 landing with all three facts visible.
- `.factory/evidence/polish-1-404.png` — styled 404 route.
- `.factory/evidence/polish-1-local/verify.json` — URL smoke report and screenshots.
- `.factory/evidence/polish-1-live/verify.json` — deployed cold-load report: 706 ms, no errors, title/lang/one h1/main/alt/button checks pass.
- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` — PASS; 45/45 production-browser tests after deployment.

## Run and deploy

```sh
npm ci
npm test
npm run build
```

Deploy `dist/` through the configured static work order by pushing `main`. After the push, cold-check `https://garden-care-map.sociobot.in/`, `/demo`, `/privacy`, `/terms`, and an unknown path; rerun the live browser suite with:

```sh
PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test
```

## Live deployment

Deployed through `/opt/fleet/lib/deploy-static.sh garden-care-map dist` to the existing Azure Static Web App (`lively-rock-0f0965110.7.azurestaticapps.net`) and custom domain `https://garden-care-map.sociobot.in`.

Cold production checks pass: `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200; an unknown path returns a real 404. The live root contains `Garden map preview` and `Water lines: 16.8 m` (not the former 15.3 m value).

## Known gaps

None.
