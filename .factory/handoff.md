# Garden Care Map — polish 4 handoff

## Result: PASS

All 23 findings from adversarial reviews 1–4 are fixed and reverified. The repair preserves the botanical field-guide identity and the static offline PWA deployment class. There are no known gaps or deferred minor items.

## What changed

- Restored a visible Demo destination across the 390 px shared header without horizontal overflow or displacing the first-screen facts.
- Removed unprovable merchant-of-record and README storage-engine assertions. Landing, legal, README, claims, and the copy audit now use the same tested language.
- Completed the static 404’s dark field-notebook palette and external-link accessible name.
- Added focused mobile-header, static-404 light/dark Axe, dark-color, external-name, unsupported-copy, claims-manifest, and reduced-motion regressions.
- Fixed a reproduced prior persistence race by journaling a validated save before IndexedDB opens. Immediate reload passed 10 consecutive focused repetitions afterward.
- Bumped the release to `v1.0.3` and the service-worker cache to `garden-care-map-v8`.

The complete finding-to-change-to-evidence matrix is in `.factory/polish-4.md`.

## Exact verification evidence

- Repair code commits: `f36d2d8` and `ac841a4f26f744022f87bd145ae017a194e1ed28`.
- Clean clone: `/tmp/garden-care-map-polish-4-final.tY4RIA` at `ac841a4f26f744022f87bd145ae017a194e1ed28`.
- Clean `npm ci`: 132 packages, 0 vulnerabilities.
- Every literal command in `.factory/claims.json`: 13/13 passed independently.
- Clean-clone `npm run lint`: passed.
- Clean-clone `npm run typecheck`: passed.
- Clean-clone `npm test`: 56/56 passed.
- Clean-clone `npm run build`: passed; `dist/index.html` is 56,409 bytes and 17,711 gzip bytes.
- Immediate-save stress run: 10/10 passed.
- Local Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 2.0 s, TBT 90 ms, CLS 0.
- Deployment ID: `3e341c94-ec91-4769-9447-3347acb5c6e0` via `/opt/fleet/lib/deploy-static.sh garden-care-map /work/repo/dist` after the work-order build command.
- Live `npm test`: 56/56 passed against <https://garden-care-map.sociobot.in>.
- Live Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.8 s, TBT 110 ms, CLS 0.
- Live `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms`: HTTP 200. Live `/missing-page`: HTTP 404. Hosted checkout: HTTP 303.
- Local/live `index.html` SHA-256: `95d6d1bc24d9ef1ba7af21a711e667e27fd887bba5058a6cc9b9cb337e8b4dc8`.
- Cold verifier evidence: `.factory/evidence/polish-4-live/home/` and `.factory/evidence/polish-4-live/demo/`.
- Dark real-404 evidence: `.factory/evidence/polish-4-live/routes/404-dark-mobile.png`.

## Run and verify

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Open `http://127.0.0.1:4173/?demo=1` after `npm run preview` for the isolated sample.

## Known gaps and next steps

None.
