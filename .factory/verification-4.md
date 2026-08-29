# Independent verification 4 — PASS

**Candidate commit:** `37a49097a9df6f2b306f2cd067ebf89db5d39811`
**Live URL:** https://garden-care-map.sociobot.in
**Verified:** 2026-08-29
**Decision:** **PASS — release candidate accepted.**

## First-read gate — PASS

A cold, new-browser visit to the live landing page plainly answers the required questions on the first screen:

- **What it does:** “Map beds, plants, care, and water.”
- **For whom:** “For small-space gardeners who need every planting and care note tied to its real place.”
- **What to do first:** the adjacent primary button is **Try it with sample data**, with “It opens a complete garden map. Demo changes stay separate.”

The action opens the isolated four-bed, five-plant sample with care history and irrigation; its persistent banner says “Demo — sample data, nothing is saved” and offers **Reset demo** and **Start for real**. This meets the plain-words and one-click demo requirements.

## Required claim checks — PASS (11/11)

`.factory/claims.json` exists. After `npm ci` in this clean checkout, every exact declared command was run. All passed; the complete local and deployed suites below reran the same tagged tests.

| Claim ID | Result |
| --- | --- |
| `offline-reload` | PASS |
| `local-private` | PASS |
| `demo-isolation` | PASS |
| `care-persistence` | PASS |
| `free-core-tools` | PASS |
| `json-export` | PASS |
| `csv-export` | PASS |
| `local-note-photo` | PASS |
| `water-total` | PASS |
| `license-verify` | PASS (recorded valid-verification fixture) |
| `season-keeper-checkout` | PASS (live hosted-checkout redirect assertion) |

## Clean checkout and deployed test gates

- `npm ci`: PASS; 132 packages installed, 0 reported vulnerabilities.
- `npm run lint`: PASS.
- `npm run typecheck`: PASS.
- `npm run build`: PASS; deployable `dist/` produced. Vite reports 55.03 kB HTML / 17.55 kB gzip.
- `npm test`: PASS; **38/38** local Chromium/390 px mobile tests.
- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test`: PASS; **38/38** against the deployed site.

The deployment is the tested candidate: local `dist/index.html` and live `/` both SHA-256 to `dd20da1ed77ff0743fc882e000d1d7c3b1070be86a482cf8f11c2643308253c1` (55,025 bytes). Local and live `/sw.js` both SHA-256 to `635eea418fa6a08a5776eeb6511ae2d87f5ecfc3b02da9c1db2faadf02fbb96f`.

## Independent product exercise

In a fresh 390 × 844 live-browser context, I selected basil, saved a dated care note, exported the resulting care CSV (header plus four notes), switched water totals to imperial (visible result: `Water lines: 55.1 ft`), submitted malformed import JSON, and reloaded offline after service-worker control. The note saved, CSV exported, malformed import retained the original four beds with the recovery message, and the offline reload showed “Offline — changes still save.” There was no horizontal overflow and no console or page error.

The deployed suite separately covers normal mapping and keyboard placement; JSON export; optional local photo persistence; demo reset and discard; invalid import and corrupt-storage recovery; blank required-note validation; 1.5 MB photo limit; immediate-reload persistence; invalid-license feedback; valid license snapshots; and hosted $12 checkout redirect. The checkout endpoint returned HTTP 303 to a `checkout.dodopayments.com/session/...` URL.

## Privacy, PWA, accessibility, and deployment policy

- The independent normal demo flow recorded only `https://garden-care-map.sociobot.in` requests. No third-party font/script requests occurred. License verification is the documented exception and contacts only `https://api.sociobot.in`.
- The app is local-first with isolated `demo:garden` and `real:garden` IndexedDB records. Normal garden use made no API call.
- The product has no product-owned server endpoint. Its external Sociobot license verification allowance is enforced: 40 concurrent calls from this client returned **30 × 200** and **10 × 429**, with every 429 carrying `Retry-After: 4` seconds. No sign-in is present, so the Entra tenant condition is not applicable.
- Live service-worker-controlled `/demo` reloads offline; the versioned manifest has standalone display, 192/512 and maskable icons, and a versioned start URL. The installed-worker update-notice path passes in the deployed suite.
- The factory `verify-url.sh` check passed: HTTP 200, 585 ms cold load, no console/page errors, title present, `lang=en`, one `h1`, `main`, zero missing image alts, and zero unnamed buttons.
- Playwright Axe checks passed on `/`, `/demo`, `/map`, `/privacy`, `/terms`, and the 404 route in light and dark schemes: **zero serious or critical findings**. Keyboard skip-link, route-focus restoration, visible focus CSS, keyboard map placement, 390 px use, 200% text layout, and reduced-motion behavior also pass. The standalone `npx @axe-core/cli` launcher could not locate a system Chrome in this container; the project’s pinned Playwright Axe integration ran successfully against the live Chromium pages and is the accepted alternative.
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200; an unknown path returns a real 404. Headers include HSTS, `nosniff`, strict-origin referrer policy, camera/microphone/geolocation denial, and a self-restricted CSP with only the Sociobot API permitted for billing. HTML, SW, and manifest are `no-cache`; the versioned hero image is `public, max-age=31536000, immutable`.

## Performance

Fresh mobile Lighthouse against production: **96 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.813 s; CLS 0**. The source budget inspection found 36,859 B JS / 12,619 B gzip, 16,388 B CSS / 4,708 B gzip, no web fonts, and a 58,388 B mobile hero image — all within the stated PWA budgets.

## Defects by severity

- **Critical:** none.
- **High:** none.
- **Medium:** none.
- **Low:** none.

No release-blocking defect was reproduced. The earlier deployment-only checkout, import recovery, touch-target, persistence, invalid-license, and zoom findings are resolved in this candidate and its live deployment.
