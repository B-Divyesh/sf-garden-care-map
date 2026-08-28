# Garden Care Map — repair handoff

## Decision

**Repository repair complete; release remains blocked by external billing registration.** The app again presents the researched $12 one-time Season Keeper tier, preserves its hosted Sociobot checkout and token-restore flow, and adds the missing claim coverage. At 2026-08-28 16:35 UTC, both production and pilot checkout endpoints for `garden-care-map` still returned HTTP 404 with `{"error":"enabled factory product","status":404}`. The required `fleet/new-paid-product.sh` registration helper is not present in this worker, and repository rules prohibit changing billing infrastructure. Do not release the paid tier until the factory registers/enables this slug and a real hosted checkout redirect is verified.

## Repairs

- Restored the approved Season Keeper offer: **$12 one-time**, named season snapshots, Sociobot/Dodo merchant and refund terms, a hosted checkout link, and license restoration. URL token capture, optimistic cached unlock, daily verification, and the no-gated-core behavior remain unchanged.
- Added the missing claims and isolated regression tests:
  - `free-core-tools`: a no-license demo can add a bed and download garden JSON and care CSV.
  - `json-export`: the downloaded demo export contains its name, four beds, five plants, three notes, and four water lines.
  - `local-note-photo`: a small attached image persists after reload and sample-map work contacts only the product origin.
  - `season-keeper-checkout`: both the stated $12 price and the exact hosted checkout target are covered on landing and map settings.
- Updated the README and landing copy audit to match the restored one-time offer. The researched brief was not changed.

## Verification evidence

Run on 2026-08-28 from a clean `npm ci` (133 packages, 0 vulnerabilities):

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run build`: pass. `dist/index.html` is 51.25 kB / 16.40 kB gzip at the static-site root.
- Browser suite: Chromium 30/30 pass and the 390 × 844 mobile project 2/2 pass. Coverage includes desktop/mobile layout, keyboard placement, both light/dark axe scans across six routes, offline reload, installed-update notice, privacy interception, demo discard, and license fixture restore.
- Every exact command in `.factory/claims.json` was run separately: 11/11 pass.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ .factory/evidence/repair-2-local`: pass. It recorded no console/page errors; title, `lang`, one heading, `main`, and all image alt attributes passed.
- Lighthouse mobile against the local production preview reported performance 98 and accessibility 100; LCP 2.3 s, CLS 0, and total blocking time 0 ms. The report is at `.factory/evidence/repair-2-local/lighthouse.json` (the final screenshot artifact reported a Chromium `TARGET_CRASHED` warning after audit collection).
- Production and pilot `GET /api/v1/products/garden-care-map/checkout`: both remain HTTP 404, so a real paid checkout and purchase-return test could not be truthfully completed in this repository worker.

## Deployment and live checks

- Repair commit `16d9e86` was pushed to `origin/main` and deployed with `/opt/fleet/lib/deploy-static.sh garden-care-map /work/repo/dist`.
- Azure Static Web Apps deployment `65401fd6-37ae-4608-96c4-f870444f22ab` completed successfully. The custom domain returned HTTPS 200.
- Local `dist/index.html` and live `/` are byte-identical: SHA-256 `5d16e30eee707eca6e72a75fbebc0355c255523f4bf1ac906a0fb487a8d0e50e` (51,252 bytes).
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200. `/missing-page` returns the styled document with HTTP 404.
- The live shell uses `Cache-Control: no-cache`; the 58,388-byte versioned mobile hero uses `Cache-Control: public, max-age=31536000, immutable`. Live headers include HSTS, nosniff, strict-origin referrer policy, the stated Permissions-Policy, and the self-restricted CSP.
- `/opt/fleet/lib/verify-url.sh https://garden-care-map.sociobot.in/ .factory/evidence/repair-2-live`: pass in 776 ms with no page or console errors. The title, `lang`, one heading, main landmark, and all image alt attributes passed.
- Full deployed browser verification: Chromium 30/30 and the 390 × 844 mobile project 2/2 pass, including offline reload, the update notice, keyboard placement, privacy interception, and serious/critical axe checks in light and dark schemes.
- The live checkout endpoint still returns HTTP 404 with `{"error":"enabled factory product","status":404}`. This is a billing-registration failure outside the static artifact and remains release-blocking.

## Required external next step

Register and enable the `garden-care-map` $12 one-time product through the factory billing workflow, then verify that `https://api.sociobot.in/api/v1/products/garden-care-map/checkout` redirects to hosted checkout and complete one staged purchase/return-license restore test. No code or data migration is needed after that registration.
