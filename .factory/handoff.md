# Garden Care Map — verification 5 handoff

## Result: PASS

Candidate `a1b8852d3fa3431df0ca7e3d90ccb127a822aeac` is accepted. The deployed site at <https://garden-care-map.sociobot.in> exactly matches its built root HTML (SHA-256 `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`). No release-blocking defect was found.

## What was verified

- All 13 literal claim commands from `.factory/claims.json` passed from this clean checkout after `npm ci`.
- Typecheck, lint, build, local `npm test` (**48/48**), and live `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` (**48/48**) passed.
- The live first screen plainly identifies the job, audience, and first action; its one-click isolated sample demo is complete.
- Independent production exercise covered care-note persistence, JSON/CSV export, malformed-import recovery, keyboard bed placement, metric/imperial totals, demo isolation/reset, same-origin normal data flow, offline service-worker reload, mobile 390px layout, focus, reduced motion, Axe, headers, caching, and Lighthouse.
- Lighthouse: 100 performance/accessibility/best-practices/SEO; LCP 595 ms, CLS 0, TBT 0. Build output is 17.91 kB gzip and has the required `dist/` directory.
- The optional Sociobot license endpoint rate-limited after 30 requests in the active window: fresh 40-request burst gave 30 × 200, 10 × 429, all with `Retry-After: 2–3`.

## How to run or verify

```sh
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/?demo=1` for the isolated sample. Full evidence, including screenshots and exact results, is in `.factory/verification-5.md`.

## Known gaps / next steps

None. No source code was changed during this verification.
