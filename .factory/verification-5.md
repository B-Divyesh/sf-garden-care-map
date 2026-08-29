# Independent verification 5 — PASS

**Candidate commit:** `a1b8852d3fa3431df0ca7e3d90ccb127a822aeac`  
**Live URL:** <https://garden-care-map.sociobot.in>  
**Verified:** 2026-08-29  
**Decision:** **PASS — the live deployment matches and accepts this candidate.**

## First-read gate — PASS

Cold-loading the live page in a new browser context gave this plain answer:

- It maps beds, plants, dated care notes, and irrigation water lines.
- It is for small-space gardeners who need every planting and note tied to its real location.
- The first action is **Try it with sample data**; adjacent copy says it opens a complete garden map and that demo changes remain separate.

One click opened the persistent **Demo — sample data, nothing is saved** banner with Reset demo and Start for real, plus a realistic four-bed, five-plant, four-water-line sample and dated care history. The required first-screen plain-words and demo-sandbox gates pass. Cold-load evidence: `evidence/verification-5-live-cold.png`.

## Mandatory claims — PASS (13/13)

`.factory/claims.json` exists. From this clean checkout, after `npm ci`, I ran every literal declared `test` command separately through the product's browser demo entry point. All passed:

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS |
| `local-private` | PASS |
| `sample-demo` | PASS |
| `demo-isolation` | PASS |
| `care-persistence` | PASS |
| `free-core-tools` | PASS |
| `json-export` | PASS |
| `csv-export` | PASS |
| `local-note-photo` | PASS |
| `water-total` | PASS |
| `license-verify` | PASS (recorded valid-response fixture) |
| `license-network-origin` | PASS |
| `season-keeper-checkout` | PASS |

## Local and live quality gates — PASS

- `npm ci`: PASS; 132 packages installed; audit reported 0 vulnerabilities.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm test`: PASS, **48/48**.
- `npm run build`: PASS and produced `dist/`; `dist/index.html` is 56,498 bytes / **17.91 kB gzip**.
- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test`: PASS, **48/48** against production.
- The local production `dist/index.html` and live `/` have identical SHA-256: `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`. This is fresh deployment-identity evidence for the candidate.

## Independent end-to-end exercise — PASS

On the deployed app I saved a new Basil care note, reloaded, and reopened it successfully. JSON export contained the garden, four beds, five plants, four water lines, and the new note; care CSV had the expected `date,plant,variety,bed,action,note` header and one row per note. A malformed JSON import displayed **“Import failed. Choose a Garden Care Map JSON export.”** without changing the sample map.

I created two real-map beds using the keyboard map tool, switched demo totals to imperial (**Water lines: 55.1 ft**), then left demo. The real map retained its two beds and a new `/demo` visit reset to four sample beds. The browser test suite additionally passed the required blank-note, 1.5 MB photo, corrupt-storage recovery, optional local photo, valid/invalid license, checkout, and reset/discard paths.

## Privacy, accessibility, PWA, and live policy — PASS

- A recorded normal demo flow sent requests only to `https://garden-care-map.sociobot.in`; it had no console or page errors. Normal garden data therefore remains local. The explicitly optional license check is restricted to `https://api.sociobot.in`.
- Browser Axe on the live demo reported **0 violations**, including **0 serious/critical**. The live 48-test suite also passed light/dark route accessibility checks, skip link, keyboard placement, mobile/200% layout, focus, and reduced-motion coverage. Independently observed `:focus-visible` outline was a designed 3 px solid ring.
- At 390 × 844 there was no horizontal overflow (`scrollWidth=390`, `innerWidth=390`); screenshot: `evidence/verification-5-live-mobile.png`.
- With reduced motion, the live page reported no running animations and `transition-duration: 0s`.
- The service worker controlled `/demo`; after switching the context offline, a reload returned HTTP 200 and restored the demo map with four beds. Source and deployed tests cover skip-waiting, clients-claim, and the in-app update notice.
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms` return 200. `/missing-page` returns a real 404. Headers include HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, denied camera/microphone/geolocation, and a CSP limited to self plus the Sociobot API. HTML/SW/manifest are `no-cache`; the versioned 152,672-byte hero image is `public, max-age=31536000, immutable`.
- There is no sign-in, so the Entra tenant requirement does not apply.

## Performance — PASS

Fresh production mobile Lighthouse (provided throttling) scored **100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO**. LCP was **595 ms**, CLS **0**, total blocking time **0 ms**, and total transferred bytes **173,538**. Initial app JS is within the 200 kB static-product budget; the mobile hero is below 300 kB.

## Server-side allowance — PASS

The static product has no product-owned API. Its Sociobot license verification call was checked from one client using a fresh 40-request concurrent invalid-token burst: **30 × HTTP 200**, then **10 × HTTP 429**. Every 429 included `Retry-After` (six at 2 seconds, four at 3 seconds). Observed allowance: **30 requests per active window**.

## Defects by severity

- Critical: none.
- High: none.
- Medium: none.
- Low: none.

No prior deployment-only failure was reproduced. This report supersedes earlier verification reports for commit `a1b8852d3fa3431df0ca7e3d90ccb127a822aeac`.
