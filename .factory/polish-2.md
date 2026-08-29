# Polish 2 — cumulative adversarial repairs

**Reviewed candidate:** `1e93130d175d50ef7f99583ad26952ad5a220be6`  
**Review commit:** `c8274c8d68ba46f59638621a40921af85d5415a4`  
**Repair commit:** `1811f947279b94c3a3c6d6a775c034a113ca6005`  
**Deployment:** Azure Static Web Apps deployment `1797fb20-06ff-4791-a58a-f997c1c2b2e3`  
**Live demo:** https://garden-care-map.sociobot.in/?demo=1

Every finding in `review-1.md` and `review-2.md` was checked again. No severity was deferred.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the mobile copy-first hero and verified the longer corrected headline still leaves all three facts inside 390×844. | Test: `all first-screen facts fit in the 390 pixel landing viewport`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/` cold at 390×844. |
| F-1-2 | Kept the preview and sample at the same measured `16.8 m` total. | Tests: `landing preview matches the sample water total`, `@claim:water-total`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/` and `/?demo=1`. |
| F-1-3 | Kept the narrow license-origin claim and fixture-backed origin recording. | Test: `@claim:license-network-origin`; screenshot: `.factory/evidence/polish-2-live/demo/screenshot-desktop.png`; live: `/map?license=recorded-license-token` in the deployed suite. |
| F-1-4 | Kept the unsupported refund assertion removed from landing, README, and terms. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-desktop.png`; live: `/` and `/terms`, plus source scan with no `Refunds are handled`. |
| F-1-5 | Preserved complete route-specific title, description, canonical, Open Graph, and Twitter metadata; added canonical handling for `?demo=1`. | Test: `every application route sets complete route metadata`; screenshot: `.factory/evidence/polish-2-live/demo/screenshot-desktop.png`; live: `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms`. |
| F-1-6 | Preserved the real styled HTTP 404 shell with header, footer, legal links, icons, canonical, and social metadata. | Tests: `the static 404 has the required product shell and metadata`, `unknown routes present the static page-not-found state`; screenshot: `.factory/evidence/polish-2-local/404.png`; live: `/missing-page` returned 404. |
| F-1-7 | Preserved the direct `Page not found` h1. | Test: `unknown routes present the static page-not-found state`; screenshot: `.factory/evidence/polish-2-local/404.png`; live: `/missing-page`. |
| F-1-8 | Kept the mood-only hero eyebrow removed. | Test: `the first-screen sample action opens the isolated query demo with reset controls`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-9 | Kept `Garden map preview` as the useful section label. | Test: accessibility route baseline plus landing regression suite; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-10 | Kept `Garden map preview` as the preview heading. | Test: accessibility route baseline plus landing regression suite; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-11 | Kept the concrete beds, plants, care notes, and water lines preview sentence. | Test: `landing preview matches the sample water total`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-12 | Kept `How to use the garden map` and no redundant mood eyebrow. | Test: accessibility route baseline; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-13 | Kept `What this tool does not do` as the boundary heading. | Test: accessibility route baseline; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-14 | Kept `Paid season snapshots` as the concrete tier label. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-15 | Kept `Save named season snapshots for $12` as the price heading. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |
| F-2-1 | Added one `leaveDemo()` path used by navigation, history, Start for real, and outbound links. Cold demo entry reseeds the sample, while reload preserves the current temporary session. The first-screen action and nav now open isolated `/?demo=1`; `/demo` remains an alias. Updated the claim contract to cover a pre-existing real bed, My map, Privacy, browser back and forward, reset, re-entry, and Start for real. | Test: `@claim:demo-isolation every demo exit discards edits without changing the real map`; screenshot: `.factory/evidence/polish-2-live/demo/screenshot-mobile.png`; live: `/?demo=1` → `/map`, `/privacy`, back, forward, reset, and re-entry all passed. |
| F-2-2 | Rewrote the h1 to `Map beds, plants, care notes, and water lines`; aligned home metadata, footer wording, catalog copy, and terminology audit. | Tests: `landing and map work at 390 pixels`, `the first-screen sample action opens the isolated query demo with reset controls`; screenshot: `.factory/evidence/polish-2-live/home/screenshot-mobile.png`; live: `/`. |

## Verification summary

- Final clean clone: `/tmp/garden-care-map-polish-2-final.0PEWxp` at `4d987b4096d61c2801f593f30f889b967f58e8fc`.
- Every exact command in `.factory/claims.json`: 12/12 passed individually.
- Clean-clone `npm test`: 48/48 passed.
- Work-order command `npm ci && npm test && npm run build`: passed; `dist/index.html` is 56,498 bytes and 17.91 kB gzip.
- Local Lighthouse mobile: performance 99, accessibility 100, best practices 100, SEO 100; LCP 2.0 s, CLS 0, TBT 110 ms.
- Post-deploy `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test`: 48/48 passed.
- Post-deploy `verify-url.sh` on `/` and `/?demo=1`: 200, no console errors, one h1, one main, `lang=en`, no missing alt text or unnamed buttons.
- Live route check: `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms` returned 200; `/missing-page` returned 404.
- Deployed and local `dist/index.html` SHA-256: `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
