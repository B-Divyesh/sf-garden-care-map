# Polish 3 — cumulative adversarial repairs

**Reviewed candidate:** `3ad41d497c3ec2f723b58b951682ed73f6feca50`  
**Review commit:** `564abe5ca00520f842bf44910870698f2bacfa03`  
**Repair commit:** `ab1022293b39d8909c5a706d6ac4d31ad813e5de`  
**Deployment:** `63598df7-9ab3-4d4b-95ef-4ec9696afe2b`  
**Live site:** <https://garden-care-map.sociobot.in/>

All blocking, high, and minor findings in `review-1.md`, `review-2.md`, and `review-3.md` were rechecked. Evidence below names a regression or claim test, a current production screenshot, and the cold live URL check.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | The mobile hero keeps the headline, action, outcome, and all three facts before the artwork. | Test: `all first-screen facts fit in the 390 pixel landing viewport`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/` at 390×844. |
| F-1-2 | The preview and the seeded map both state the measured `Water lines: 16.8 m`. | Tests: `landing preview matches the sample water total`, `@claim:water-total`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/` and `/?demo=1`. |
| F-1-3 | The narrow Sociobot-only license-origin claim and fixture-backed request recording remain in the contract. | Test: `@claim:license-network-origin`; screenshot: `.factory/evidence/polish-3-live/demo/screenshot-desktop.png`; live: `/map?license=recorded-license-token`. |
| F-1-4 | Unsupported refund wording remains removed from landing, README, and terms. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/` and `/terms`. |
| F-1-5 | Each app route sets its own title, description, canonical URL, Open Graph, and Twitter metadata. | Test: `every application route sets complete route metadata`; screenshot: `.factory/evidence/polish-3-live/demo/screenshot-desktop.png`; live: `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms`. |
| F-1-6 | The static 404 retains the product header, footer, legal links, icons, canonical, and social metadata. | Tests: `the static 404 has the required product shell and metadata`, `unknown routes present the static page-not-found state`; screenshot: `.factory/evidence/polish-3-live/routes/404-mobile.png`; live: `/missing-page` (HTTP 404). |
| F-1-7 | The dynamic and static missing-page heading is the direct `Page not found`. | Test: `unknown routes present the static page-not-found state`; screenshot: `.factory/evidence/polish-3-live/routes/404-mobile.png`; live: `/missing-page` (HTTP 404). |
| F-1-8 | The mood-only hero eyebrow remains absent. | Test: `@claim:sample-demo`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-9 | The preview section is labelled `Garden map preview`. | Test: accessibility baseline `/` in light mode; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-10 | The preview heading names the content rather than a vague outcome. | Test: accessibility baseline `/` in light mode; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-11 | The preview copy consistently names beds, plants, care notes, and water lines. | Test: `landing preview matches the sample water total`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-12 | The instructions section is headed `How to use the garden map`. | Test: accessibility baseline `/` in light mode; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-13 | The scope section is headed `What this tool does not do`. | Test: accessibility baseline `/` in light mode; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-14 | The paid label is `Paid season snapshots`. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-1-15 | The paid heading says `Save named season snapshots for $12`. | Test: `@claim:season-keeper-checkout`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-2-1 | One `leaveDemo()` flow clears the demo namespace for navigation, history, legal links, and Start for real without changing real data. | Test: `@claim:demo-isolation`; screenshot: `.factory/evidence/polish-3-live/demo/screenshot-mobile.png`; live: `/?demo=1` → `/map`, `/privacy`, history, reset, and re-entry. |
| F-2-2 | The h1 uses the precise terms `care notes` and `water lines`; related catalog wording uses the same terms. | Tests: `landing and map work at 390 pixels`, `@claim:sample-demo`; screenshot: `.factory/evidence/polish-3-live/home/screenshot-mobile.png`; live: `/`. |
| F-3-1 | Added the `sample-demo` claim to `.factory/claims.json` and retagged the hero-action regression. The test starts at a blank landing page, clicks the action, and proves the isolated URL, banner, four beds, five plants, four water lines, and a dated care note. | Test: `@claim:sample-demo`; screenshot: `.factory/evidence/polish-3-live/demo/screenshot-mobile.png`; live: `/?demo=1`. |

## Verification

- Clean clone: `/tmp/garden-care-map-polish-3.jEPmsS` at `ab1022293b39d8909c5a706d6ac4d31ad813e5de`; `npm ci` completed with zero vulnerabilities.
- Every command declared in `.factory/claims.json` passed individually: 13/13, including the new `@claim:sample-demo` claim.
- Clean-clone `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` passed. The browser suite was 48/48 and includes local privacy-origin recording, service-worker offline reload, route metadata, 390 px layout, keyboard interactions, and Axe scans in light and dark modes.
- Production `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` passed 48/48. `verify-url.sh` passed for `/` and `/?demo=1`; screenshots and JSON evidence are under `.factory/evidence/polish-3-live/`.
- The deployed root HTML and local `dist/index.html` both SHA-256 to `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
- Production Lighthouse mobile: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.7 s and CLS 0. Raw report: `.factory/evidence/polish-3-live/lighthouse.json`.
