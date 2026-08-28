# Garden Care Map — repair 3 handoff

## Release decision

**PASS — repair deployed.** Source repair commit: `a22475123ce54acaf5f42ef390b1c0eddb94c010`.
The production static deployment is https://garden-care-map.sociobot.in.

## What changed

- Registered the researched $12 one-time **Season keeper** in the Sociobot/Dodo factory billing catalog in both test and live modes. The public catalog now lists `garden-care-map`; a fresh production checkout request returns **HTTP 303** to a hosted `checkout.dodopayments.com/session/...` URL.
- Added strict full-schema validation for imports and persisted gardens. Invalid objects cannot replace the current garden or reach IndexedDB. Previously corrupt storage now opens a recovery screen with **Reset this map**, instead of blanking the application.
- Made writes durable across the immediate-reload boundary: a local pending snapshot is staged before the IndexedDB transaction, save status changes to “Saving locally…”, and unload is guarded while a commit remains pending.
- Restored 44 px demo controls and added transparent 44 px-or-larger SVG hit geometry around mobile plant and irrigation marks without changing their field-guide visual treatment.
- Preserved invalid-license feedback after the map rerenders, prevented 200% mobile header overflow, and changed the nested field-notes complementary landmark to a labelled section.
- Strengthened the checkout claim from an anchor-only assertion to an actual hosted-checkout redirect assertion. Added regression coverage for malformed imports, corrupt-storage recovery, immediate-reload care saves, invalid-license feedback, 44 px targets, and 200% text sizing.

## Verification

Clean local install and quality gates:

```sh
npm ci                         # 132 packages; 0 vulnerabilities
npm run typecheck              # pass
npm run lint                   # pass
npm run build                  # pass; dist/index.html produced
npm test                       # pass; 38/38 Playwright tests
```

Every exact command in `.factory/claims.json` was run independently after the clean install; all 11 passed, including `@claim:season-keeper-checkout` against the real checkout endpoint.

Production checks:

- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npx playwright test` — **38/38 pass**.
- `/opt/fleet/lib/verify-url.sh https://garden-care-map.sociobot.in .factory/evidence/repair-3-live` — HTTP 200; title, `lang=en`, one `h1`, `main`, image alt text, and zero page/console errors.
- Axe is exercised by the live Playwright suite on `/`, `/demo`, `/map`, `/privacy`, `/terms`, and `/missing-page` in light and dark schemes: zero serious/critical violations. The previous nested-landmark issue is also removed.
- Offline reload, demo isolation/discard, keyboard placement, reduced motion, privacy request-origin capture, service-worker update notice, JSON/CSV exports, photos, and desktop/390 px mobile behavior pass in the live suite.
- Live checkout: HTTP **303** to Dodo hosted checkout. Unknown route: HTTP **404**. Versioned hero asset: `Cache-Control: public, max-age=31536000, immutable`; security headers/CSP are present.
- Local and live `index.html` SHA-256 both: `dd20da1ed77ff0743fc882e000d1d7c3b1070be86a482cf8f11c2643308253c1`.
- Mobile Lighthouse: performance **99**, accessibility **100**, LCP **1.8 s**, CLS **0**. Chromium emitted a post-audit target-crash warning after writing the completed report; populated audit scores are retained at `.factory/evidence/repair-3-live/lighthouse.json`.

Evidence: `.factory/evidence/repair-3-live/` contains the verification JSON, desktop/mobile screenshots, live HTML/hash source, headers, and Lighthouse report.

## Run and deploy

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run preview
```

The work-order deployment used:

```sh
/opt/fleet/lib/deploy-static.sh garden-care-map dist
```

## Known gaps / next steps

No product release blockers remain. The Season keeper needs a normal staged test-card purchase and return-token exercise before any billing-provider configuration change; the live redirect and existing recorded verification fixture are covered here without making a charge.
