# Polish 4 — cumulative adversarial repairs

**Reviewed candidate:** `a1b8852d3fa3431df0ca7e3d90ccb127a822aeac`  
**Review commit:** `4bc123a224f05da352f8175e0b7b9f66d5700e42`  
**Repair commits:** `f36d2d8`, `ac841a4`  
**Deployment:** `3e341c94-ec91-4769-9447-3347acb5c6e0`  
**Live site:** <https://garden-care-map.sociobot.in/>

Every blocking, high, and minor finding in reviews 1–4 was rechecked. No severity was deferred.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the copy-first phone hero with the action, outcome, and all three facts inside 390×844. | Test `all first-screen facts fit in the 390 pixel landing viewport`; screenshot `.factory/evidence/polish-4-live/home/screenshot-mobile.png`; cold live `/`. |
| F-1-2 | Kept landing and sample water totals aligned at `16.8 m`. | Tests `landing preview matches the sample water total` and `@claim:water-total`; live `/` and `/?demo=1`. |
| F-1-3 | Kept the exact Sociobot-only license-origin claim and request-origin recording. | Test `@claim:license-network-origin`; live fixture flow on `/map?license=recorded-license-token`. |
| F-1-4 | Kept the unsupported refund assertion absent from landing, Terms, and README. | Source/copy audit; live `/` and `/terms`. |
| F-1-5 | Kept route-specific title, description, canonical, Open Graph, and Twitter metadata. | Test `every application route sets complete route metadata`; live `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms`. |
| F-1-6 | Kept a full static 404 shell with wordmark, navigation, legal links, icons, metadata, and footer. | Tests `the static 404 has the required product shell and metadata` and both `/404.html` Axe checks; live `/missing-page` returned 404. |
| F-1-7 | Kept the direct `Page not found` h1. | Test `unknown routes present the static page-not-found state`; screenshot `.factory/evidence/polish-4-live/routes/404-dark-mobile.png`. |
| F-1-8 | Kept the mood-only hero eyebrow removed. | `.factory/copy-audit.md`; screenshot `.factory/evidence/polish-4-live/home/screenshot-mobile.png`; live `/`. |
| F-1-9 | Kept `Garden map preview` as the section label. | `.factory/copy-audit.md`; live `/`. |
| F-1-10 | Kept `Garden map preview` as the concrete preview heading. | `.factory/copy-audit.md`; live `/`. |
| F-1-11 | Kept beds, plants, care notes, and water lines as the consistent nouns. | Test `landing preview matches the sample water total`; `.factory/copy-audit.md`; live `/`. |
| F-1-12 | Kept `How to use the garden map` as the instruction heading. | Landing Axe checks; live `/`. |
| F-1-13 | Kept `What this tool does not do` as the scope heading. | Landing Axe checks; live `/`. |
| F-1-14 | Kept `Paid season snapshots` as the paid label. | Test `@claim:season-keeper-checkout`; live `/`. |
| F-1-15 | Kept `Save named season snapshots for $12` as the price heading. | Test `@claim:season-keeper-checkout`; live `/`. |
| F-2-1 | Kept one exit path that clears demo edits for My map, Privacy, history, reset, and Start for real without changing real data. | Test `@claim:demo-isolation`; screenshot `.factory/evidence/polish-4-live/demo/screenshot-mobile.png`; live `/?demo=1`. |
| F-2-2 | Kept the verb-first h1 with the precise terms `care notes` and `water lines`. | Tests `landing and map work at 390 pixels` and `@claim:sample-demo`; cold live `/`. |
| F-3-1 | Kept `sample-demo` in the claims contract and proved the hero action reaches the complete seeded sample. | Test `@claim:sample-demo`; live `/` → `/?demo=1`. |
| F-4-1 | Restored Demo in the shared 390 px header on every app route. The compact phone wordmark leaves all three 44 px navigation links visible without overflow. | Test `the shared mobile header keeps every required destination visible`; home/demo screenshots above; live `/`, `/map`, `/privacy`, `/terms`, and `/missing-page`. |
| F-4-2 | Removed the merchant-of-record assertion from landing, README, and Terms. Copy now states only the tested Sociobot-checkout behavior. | Tests `unsupported merchant and storage-engine claims are absent from visitor copy` and `@claim:season-keeper-checkout`; live `/` and `/terms`. |
| F-4-3 | Rewrote README storage details as tested behavior. Exact namespace details remain only in `.factory/demo.md` for verifiers. Privacy copy was aligned too. | Test `unsupported merchant and storage-engine claims are absent from visitor copy`; claim tests `@claim:local-private`, `@claim:local-note-photo`, and `@claim:demo-isolation`. |
| F-4-4 | Added the field-notebook dark tokens, dark theme color, dark action contrast, and dark marker treatment to the static 404. | Test `the static 404 uses the dark field-notebook palette and names its external footer link`; dark Axe check; screenshot `.factory/evidence/polish-4-live/routes/404-dark-mobile.png`; live `/missing-page`. |
| F-4-5 | Added the visually hidden `(external site)` suffix to the static footer link, matching the app shell. | Same static-404 regression asserts the full accessible name; live `/missing-page`. |

## Additional cumulative regression closed

The clean-clone run reproduced the earlier verification-3 immediate-save race once. `saveGarden()` now writes its validated pending journal before waiting for IndexedDB to open. The regression `care notes survive an immediate reload once submitted` then passed 10 consecutive focused runs, the clean-clone suite, and the live suite.

## Verification

- Clean clone `/tmp/garden-care-map-polish-4-final.tY4RIA` at `ac841a4f26f744022f87bd145ae017a194e1ed28`: `npm ci` found 0 vulnerabilities; all 13 literal claim commands passed separately.
- Clean-clone `npm run lint`, `npm run typecheck`, `npm test` (56/56), and `npm run build` passed. `dist/index.html` is 56,409 bytes and 17,711 gzip bytes.
- Work-order build passed 56/56 immediately before deployment. Production `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` passed 56/56.
- Local Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 2.0 s, TBT 90 ms, CLS 0.
- Production Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.8 s, TBT 110 ms, CLS 0. Report: `.factory/evidence/polish-4-live/lighthouse.json`.
- `verify-url.sh` passed cold `/` and `/?demo=1` with one h1, one main, `lang=en`, no missing alt text, no unnamed buttons, and no console errors. Evidence is under `.factory/evidence/polish-4-live/`.
- Local `dist/index.html` and live `/` share SHA-256 `95d6d1bc24d9ef1ba7af21a711e667e27fd887bba5058a6cc9b9cb337e8b4dc8`.
