# Independent verification 2 — FAIL

**Candidate:** `5655e346ed8543e9687405bbbfbd114dd87af25e`  
**Live URL:** https://garden-care-map.sociobot.in  
**Verified:** 2026-08-28  
**Decision:** **FAIL — do not release this candidate.**

The local build and live deployment are healthy and byte-identical, but two acceptance-contract failures remain: the stated one-time monetization cannot be purchased, and the site has visitor-facing claims that have no mandatory sandbox claim test.

## Release-blocking defects

### High — paid season-keeper feature has no working purchase path

The researched brief specifies one-time monetization. The application retains a paid feature: named season snapshots require an active season-keeper license. However, the live app says **“Sales paused”**, presents no price or buy action, and the required Sociobot checkout endpoint is unavailable:

```text
GET https://api.sociobot.in/api/v1/products/garden-care-map/checkout
HTTP/2 404
{"error":"enabled factory product","status":404}
```

This is an honest UI rather than a dead visible link, but it does not meet the brief's one-time monetization or the paid-unlock contract for an existing paid tier. The product must be registered/enabled in Sociobot billing and expose the hosted one-time checkout (with price, return-token handling, and restore) before release; alternatively, remove the paid tier and amend the approved product brief.

### High — unlisted, untested visitor claims

The claims policy requires every visitor-reliant claim on the live landing page or README to have an entry and exactly one `@claim:<id>` sandbox test. `.factory/claims.json` has seven entries, but does not cover these claims:

- Landing and README: **“Every mapping and export tool is free.”**
- README: **“Exports the complete garden as JSON.”** The existing `csv-export` claim covers CSV only.
- README/UI: optional note photos are stored locally / **“Photo (optional, stored here)”**. The tests only check rejection above 1.5 MB, not successful local-only photo storage and persistence.

The normal UI behavior appears consistent with those statements, but that is not sufficient under the claims acceptance contract. Add one isolated observable demo test per claim, add entries to `.factory/claims.json`, and rerun them from a clean clone; otherwise remove the statements.

## Required claim tests — PASS

Started from a clean checkout at the tested commit after `npm ci`. Every exact command in `.factory/claims.json` was run separately; all passed.

| Claim | Exact command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `local-private` | `npm test -- --grep @claim:local-private` | PASS |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS |
| `care-persistence` | `npm test -- --grep @claim:care-persistence` | PASS |
| `csv-export` | `npm test -- --grep @claim:csv-export` | PASS |
| `water-total` | `npm test -- --grep @claim:water-total` | PASS |
| `license-verify` | `npm test -- --grep @claim:license-verify` | PASS (recorded valid response) |

## First-read test — PASS

Cold-loaded the live landing page at desktop and 390 px. In plain words, it is a map for small-space gardeners to record beds, plants, care, and water lines. It names that audience in the supporting sentence. The first action is the visible **“Try it with sample data”** button, beside the immediate result: **“It opens a complete garden map. Demo changes stay separate.”** One click opens a realistic four-bed, five-plant garden with three dated care notes and four irrigation segments. No normal-route console or page error occurred.

## Successful verification evidence

### Build and automated gate

- `npm ci`: PASS; 133 packages audited, 0 vulnerabilities.
- `npm test`: PASS; 29/29 Chromium tests (including axe in light/dark, demo isolation, mobile, keyboard, offline, and update-notice checks).
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS; `dist/index.html` produced, 51,003 bytes / 16,185 gzip bytes.
- Mobile Lighthouse on live `/`: performance **99**, accessibility **100**, LCP **1.8 s**, CLS **0**, total blocking time **30 ms**.
- Main document bundle is below the 200 KB static-PWA budget. The mobile hero WebP is 58,388 bytes, below the 300 KB budget. No external fonts or runtime third-party scripts were found.

### Deployment identity, routes, policies, and links

- Local `dist/index.html` and live `/` SHA-256 match exactly: `e4d9bfd8c89a5af2e39a1dbb751e8d0c29853f40f9cefecc07d9d911e409cc09` (51,003 bytes). `public/sw.js` also matched live byte-for-byte.
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms` return HTTP 200; `/missing-page` returns the styled real HTTP 404.
- All discovered internal links returned 200; the only non-HTTP links were the two documented `mailto:` addresses. The Param Factory link returned 200.
- HTML is `no-cache`; versioned hero and icon assets return `Cache-Control: public, max-age=31536000, immutable`; service worker and manifest are `no-cache`.
- Live headers include HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, camera/microphone/geolocation Permissions-Policy, and a self-restricted CSP with only the intended Sociobot billing API in `connect-src`.

### Function, recovery, privacy, and PWA checks

- Normal demo flow: selected Basil, saved a care note, reloaded, and reopened the record successfully. CSV download had the required header and every displayed note. Water total initially read 16.8 m; the declared claim test confirmed 55.1 ft after unit conversion.
- Invalid JSON import displayed **“Import failed. Choose a Garden Care Map JSON export.”** An over-1.5 MB photo was rejected with **“The photo is over 1.5 MB. Choose a smaller photo.”**
- Edited demo data, selected **Start for real**, reached an empty real map, and re-entered `/demo` to a fresh four-bed sample. The demo and real IndexedDB namespaces remained separate.
- Recording all network origins during normal sample-map work produced only `https://garden-care-map.sociobot.in`. License verification is the deliberately separate Sociobot request; no sign-in flow is present.
- On live `/demo`, after service-worker control and `context.setOffline(true)`, reload retained **Courtyard kitchen garden** and showed **“Offline — changes still save.”** A synthetic installed-worker update displayed **“An update is ready. Reload to use it.”**
- A 40-request concurrent burst to the live invalid-license verification endpoint returned **30 × 200** then **10 × 429**, each 429 including `Retry-After: 3`. The observed threshold is 30 requests per active window.

### Accessibility and responsive checks

- Independent live axe scans on `/`, `/demo`, `/map`, `/privacy`, `/terms`, and `/missing-page`, in both light and dark color schemes: **zero serious or critical violations**.
- Every normal route had exactly one `h1`, one `main`, `lang="en"`, route-specific title, meaningful hero alt text, and visible designed focus styling. Cold keyboard Tab starts on the skip link; the test suite also verifies keyboard bed placement.
- Desktop and 390 × 844 mobile cold loads showed no horizontal overflow. The first-screen primary action remained visible and usable. Reduced-motion and 390 px checks pass in the shipped Playwright suite.

## Severity summary

| Severity | Finding |
| --- | --- |
| High | One-time paid snapshot tier has no active Sociobot checkout or price/purchase path. |
| High | Three visitor-facing claims are missing required `.factory/claims.json` entries and demo-observable tests. |
| None found | Core garden-map job, demo isolation, accessibility, privacy behavior, PWA offline/update behavior, performance, deployment identity, response policy, and rate limiting. |

## Re-verification steps

1. Enable/register the product checkout in Sociobot billing, then test an actual hosted checkout and return-license restore flow.
2. Add or remove the three unlisted claims above. Each retained claim needs one clean-state demo test tagged `@claim:<id>` and one corresponding `claims.json` entry.
3. Run `npm ci`, every listed claim command, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`; deploy and compare the resulting `dist/index.html` hash with the live page.
