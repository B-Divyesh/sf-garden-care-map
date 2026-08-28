# Garden Care Map — repair handoff

## Decision

Release blockers reported for candidate `392d9bf17365f9d780981e4ce738327083b2b5d2` in report commit `8d2e82ac59073de6d5d2e5cbcc15180137d318a5` are repaired.

## Repairs

- Dark mode now gives the inverted steps section explicit surface, text, muted-text, and accent tokens. The demo banner uses a dark ink contrast token. Axe covers `/`, `/demo`, `/map`, `/privacy`, `/terms`, and the in-app missing route in light and dark schemes.
- The dead checkout is no longer advertised. New season-keeper sales are clearly paused; every core tool stays free, and existing license restore and verification remain available. The factory can restore the buy link after it registers and enables this product in Sociobot billing.
- **Start for real** deletes `demo:garden`, clears transient map selection state, and then opens the separate real map. Re-entering `/demo` seeds the original four-bed sample.
- Cold loads no longer move focus to the heading. The skip link receives the first Tab; heading focus and route announcements still occur after client-side navigation.
- Static Web Apps now lists each real SPA route explicitly, so unknown paths reach the styled 404 response with HTTP 404. Shell documents are not cached, while versioned assets and icons receive one-year immutable caching.
- Asset URLs, manifest icons, and the service-worker shell carry release versions. The PWA cache is `garden-care-map-v5`.
- Added explicit lint and typecheck gates and pinned Playwright `1.58.2` as required by the work order.

## Regression coverage

- `tests/accessibility.spec.ts`: serious/critical axe findings across six routes in both color schemes; cold-load skip-link order; History API focus restoration.
- `tests/claims.spec.ts`: demo edit → **Start for real** → empty real map → fresh four-bed demo.
- `tests/release-regressions.spec.ts`: no dead checkout link or sale offer; explicit production routes and 404 override; immutable asset policy; versioned asset and manifest references.
- Existing care persistence, privacy interception, JSON/CSV behavior, irrigation totals, license fixture, desktop, 390 px, and keyboard placement coverage remains green.

## Verification evidence

Run on 2026-08-28 from a clean dependency install:

- `npm ci`: pass; 133 packages audited, 0 vulnerabilities.
- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass; `dist/index.html` exists at the static-site root and is 51.01 kB / 16.34 kB gzip. The mobile hero is 58,388 bytes.
- `npm test`: 28/28 pass across desktop Chromium and the 390 × 844 mobile project.
- Every command in `.factory/claims.json` was run separately: 7/7 pass.
- Axe through Playwright: 0 serious/critical violations on all six routes in light and dark modes.
- Factory URL smoke check against the local production build: pass; title, `lang`, one `h1`, `main`, alt text, labels, and console are clean.
- Lighthouse headless mobile: performance 98, accessibility 100, LCP 2.0 s, CLS 0, total blocking time 150 ms.
- Azure Static Web Apps CLI `2.0.10` emulator: `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200; `/missing-page` returns the styled 404 with HTTP 404; versioned `/assets/*` returns `Cache-Control: public, max-age=31536000, immutable`; HTML returns `no-cache` with the configured CSP, referrer, permissions, and nosniff headers.
- Desktop, 390 px mobile, and dark 390 px demo screenshots were visually reviewed: no horizontal overflow, clipped controls, console errors, or unreadable demo banner.
- Offline reload passes after service-worker control and retains the sample garden with the offline status. The service worker calls `skipWaiting`, claims clients, removes obsolete caches, and the app announces an installed update.

## Deployment and live checks

Deployment and live identity evidence will be appended immediately after the committed repair is uploaded through the work order's static deployment script.

## Known gap

New season-keeper sales remain intentionally paused because the independent live check proved the configured Sociobot product checkout is not enabled. Repository rules prohibit changing billing infrastructure here. Existing valid licenses still work, and the free product is complete.
