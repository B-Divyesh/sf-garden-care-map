# Independent verification 6 — Garden Care Map

**Verdict: PASS**

- Candidate commit: `a28697ec3a32115240b41d095ffad9cc49ca6a30`
- Verified URL: <https://garden-care-map.sociobot.in>
- Verification date: 2026-08-29 UTC
- Scope: clean-install local build and browser suite, plus an independent live PWA/product audit. No product code was changed.

## First-read and demo check

A cold Chromium visit to the live home page gives all three required answers on its first screen:

- **What it does:** “Map beds, plants, care notes, and water lines.”
- **For whom:** small-space gardeners who need planting and care tied to its real place.
- **What to do first:** the visible primary button is **Try it with sample data**, with adjacent text saying it opens a complete garden map and keeps demo changes separate.

The action is one click. It opens `/?demo=1` with the persistent “Demo — sample data, nothing is saved” banner, Reset demo, Start for real, four beds, five plants, four irrigation lines, and dated care notes. This passes the plain-words and demo-sandbox gates.

## Required claims gate

`.factory/claims.json` exists and contains 13 unique declarations. After a clean `npm ci`, every literal command in its `test` field was invoked against the supplied demo entry point. A consolidated `npm test -- --grep @claim:` run then recorded all 13 passing:

| Claim | Result |
| --- | --- |
| offline-reload | PASS |
| local-private | PASS |
| sample-demo | PASS |
| demo-isolation | PASS |
| care-persistence | PASS |
| free-core-tools | PASS |
| json-export | PASS |
| csv-export | PASS |
| local-note-photo | PASS |
| water-total | PASS |
| license-verify | PASS (recorded valid response) |
| license-network-origin | PASS (recorded response) |
| season-keeper-checkout | PASS |

The consolidated evidence was **13/13 passed in 24.9 s**. The suite also verifies one and only one tagged browser test per claim.

## Clean local quality gates

All commands were run at the candidate commit after `npm ci` (132 packages; 0 vulnerabilities):

```text
npm run lint       PASS
npm run typecheck  PASS
npm test           PASS — 56/56 in 1.2 m
npm run build      PASS
```

The exact production build wrote `dist/`. `dist/index.html` is 56,409 bytes / 17,695 gzip bytes (well below the 200 KB initial-JS budget) and has SHA-256:

```text
95d6d1bc24d9ef1ba7af21a711e667e27fd887bba5058a6cc9b9cb337e8b4dc8
```

## Live deployment identity and end-to-end evidence

The cold live `/` response and the locally built `dist/index.html` have the same SHA-256 above; `cmp` returned 0. Live version/caches are `v1.0.3` / `garden-care-map-v8`.

`PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npx playwright test` passed **56/56 in 1.3 m**. This exercised desktop and 390 px mobile, landing/demo/map/privacy/terms/404 routes, normal and invalid import paths, stored-data recovery, keyboard placement, downloads, invalid-license recovery, route history, reduced motion, service-worker update announcement, and all claim flows.

Separately, a fresh live-browser demo audit added and persisted a care note, exported the complete sample JSON and care CSV, reloaded offline after the service worker became controlling, and tested 390 px horizontal overflow. It observed:

```json
{
  "outgoingOriginsDuringNormalDemoUse": ["https://garden-care-map.sociobot.in"],
  "consoleOrPageErrors": [],
  "offlineReload": true,
  "mobileHorizontalOverflow": false
}
```

The focused live unit conversion check waited for the rendered total and returned `Water lines: 55.1 ft`.

## Privacy, headers, PWA, accessibility, and performance

- Normal demo-map activity made requests only to the product origin. The landing cold load also requested only the product page and its self-hosted artwork; there are no third-party fonts or scripts.
- A normal invalid Sociobot license verification returned `200`, `Cache-Control: no-store`, and `{valid:false, reason:"invalid"}`. It is the only documented external runtime origin.
- Fresh rate-limit burst: 40 simultaneous invalid-license probes from one client produced **30 × 200** and **10 × 429**. A sampled 429 included `Retry-After: 2` and `x-ratelimit-after: 2`; observed active-window allowance is **30 requests**.
- Live HTML has HSTS, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, a restrictive CSP with `frame-ancestors 'none'`, Permissions-Policy restrictions, and no browser CSP errors. Fingerprinted artwork has `Cache-Control: public, max-age=31536000, immutable`.
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200; `/missing-page` returns 404; `/404.html` returns 200.
- The manifest, 192/512/maskable icons, versioned precache shell, `skipWaiting`, `clientsClaim`, offline reload, and update toast are all covered. Actual offline reload passed from a fresh live browser context.
- The local and live 56-test suites include `@axe-core/playwright` on eight routes in light and dark themes. They found **zero serious or critical axe violations**. They also cover one `<h1>`, `lang`, main landmark, skip-link-first keyboard order, visible keyboard behavior, 44 px controls, 200%/narrow-width overflow, and reduced motion.
- Live Lighthouse mobile (`/?demo=1`, Chromium headless) scored **92 Performance, 100 Accessibility, 100 Best Practices, 100 SEO**; LCP 1.1 s, CLS 0, and 30 KiB total transferred in the measured run.

## Defects by severity

None found.

## Notes

No sign-in flow exists, so no identity-provider integration applies. This is a local-first static PWA; there is no first-party product backend. The only server-side capability reachable by the product is the Sociobot license endpoint, whose observed rate-limit behavior is recorded above.
