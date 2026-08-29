# Adversarial first-read review 3 — FAIL

**Reviewed:** 2026-08-29  
**Live product:** https://garden-care-map.sociobot.in  
**Candidate:** `3ad41d497c3ec2f723b58b951682ed73f6feca50` (live HTML SHA-256 matched the clean-clone build: `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`)  
**Verdict:** **FAIL** — one minor finding remains. Per the requested zero-findings threshold, this is not a pass. No product code was modified.

## Cold first read

Fresh Chromium contexts, with no existing storage, were used at 390 × 844 and 1440 × 900 before scrolling.

- **What it does:** maps beds, plants, care notes, and water lines.
- **For whom:** small-space gardeners.
- **What to click first:** **Try it with sample data**.

The first screen answers all three questions at both sizes. At 390 px, the headline, audience sentence, result-naming action, outcome text, and all three facts are visible without scrolling. The facts are concrete: local browser storage, offline reopening, and free mapping/export tools. The botanical field-guide presentation is distinct and map-first; it is not a generic SaaS hero or card grid.

## Findings

### Minor

#### F-3-1 — The landing demo-result promise is unlisted in the claim contract

**Location:** landing hero, immediately beside **“Try it with sample data”**: **“It opens a complete garden map.”**

This is a visitor-facing operational promise. `.factory/claims.json` has `demo-isolation`, but its claim is only **“Demo changes stay separate from the real map and are discarded on every exit.”** No listed claim states that the landing action opens the sample, and no listed tagged test asserts the complete seeded result reached from that action. The repository has an untagged regression, `the first-screen sample action opens the isolated query demo with reset controls`, but the claims contract requires the promise itself to have a claims entry and an `@claim:` test.

The manual live check did confirm the behavior: one click opened `/?demo=1` with the banner, four beds, five active plants, and four water-line segments. That does not make the published promise listed or continuously verified as a claim.

**Fix:** add, for example, `sample-demo` to `.factory/claims.json` with the claim **“Try it with sample data opens a complete sample garden map”**, where **“landing hero action”**, and a test command `npm test -- --grep @claim:sample-demo`. Tag the existing first-screen-action regression (or a replacement) `@claim:sample-demo`; from a fresh context it must click the action and assert `/?demo=1`, the persistent demo banner, four beds, five plants, four water lines, and visible dated care notes.

## Copy audit

Word counts treat hyphenated compounds and route strings as one word. Every visitor-facing sentence, heading, label, button, and caption on the landing page and in `README.md` was checked. No item exceeds 22 words; no banned marketing adjective, jargon, mood slogan, non-informative heading, inconsistent product term, or non-result-naming button was found. The only copy-related flag is F-3-1 above.

### Landing page

| Copy unit | Words | Check |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear wordmark |
| Demo | 1 | Clear navigation |
| My map | 2 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Map beds, plants, care notes, and water lines | 8 | Clear, verb-first h1 |
| For small-space gardeners who need every planting and care note tied to its real place. | 15 | Clear audience and outcome |
| Try it with sample data | 5 | Result-naming action |
| It opens a complete garden map. | 6 | F-3-1 |
| Demo changes stay separate. | 4 | `demo-isolation` |
| Start my blank map | 4 | Result-naming action |
| Private | 1 | Clear fact label |
| Garden data stays in this browser. | 6 | `local-private` |
| Offline | 1 | Clear fact label |
| Reopens after your first visit. | 5 | `offline-reload` |
| Free core | 2 | Clear fact label |
| Every mapping and export tool is free. | 7 | `free-core-tools` |
| Keep the care record on the same map as the garden. | 11 | Useful product context |
| Garden map preview | 3 | Context-free heading |
| Beds, plants, care notes, and water lines share one map. | 10 | Concrete product description |
| Each plant keeps its own dated history. | 7 | `care-persistence` |
| Water lines: 16.8 m | 4 | `water-total` |
| How to use the garden map | 6 | Context-free heading |
| Draw each bed | 3 | Clear step heading |
| Place beds and containers on a simple grid. | 8 | Clear instruction |
| Pin each plant | 3 | Clear step heading |
| Name the crop and variety where it grows. | 8 | Clear instruction |
| Record each visit | 3 | Clear step heading |
| Add dated care notes and measure water lines. | 8 | Clear instruction |
| What this tool does not do | 6 | Context-free heading |
| This tool records what you plant and do. | 8 | Clear scope |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful boundary |
| Paid season snapshots | 3 | Context-free label |
| Save named season snapshots for $12 | 6 | Clear result and price |
| The free map includes every core tool and data export. | 10 | `free-core-tools` |
| A one-time purchase adds named season snapshots on this device. | 10 | `license-verify` and `season-keeper-checkout` |
| $12 one-time purchase | 3 | `season-keeper-checkout` |
| Buy the season keeper | 4 | Result-naming checkout action |
| Restore a license | 3 | Result-naming recovery action |
| Sociobot and Dodo are the merchant of record. | 8 | `season-keeper-checkout` |
| Map beds, plants, care notes, and water lines in one place. | 11 | Clear footer description |
| Original generated field-guide artwork | 4 | Useful provenance label |

The preview labels **Herbs**, **Basil**, **Thyme**, **Salad**, **Lettuce**, **Tomato pots**, **Tomato**, **Bean trough**, and **Bean** are clear names, not sentences.

### README

| Copy unit | Words | Check |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear title |
| Garden Care Map is an offline field notebook for small-space gardeners. | 11 | Clear product and audience |
| Draw beds, pin plants, record dated care, and measure connected water lines on one map. | 15 | Clear job |
| Try the isolated sample at `/?demo=1` or `/demo`. | 8 | Clear instruction |
| Demo changes use `demo:garden`; the real map uses `real:garden`. | 11 | Concrete storage detail |
| Every demo exit deletes the demo changes. | 7 | `demo-isolation` |
| What it does | 3 | Context-free heading |
| Stores beds, plants, optional note photos, and care history in IndexedDB. | 11 | Storage implementation detail |
| Measures water-line segments in meters or feet and shows their total. | 11 | `water-total` |
| Exports the complete garden as JSON and every care note as CSV. | 12 | `json-export`, `csv-export` |
| Reopens offline after the first complete visit. | 7 | `offline-reload` |
| Keeps all normal map use on this device. | 8 | `local-private` |
| Verifies existing season keeper licenses through Sociobot billing. | 8 | `license-verify` |
| The free map includes all care, mapping, photo, and export tools. | 11 | `free-core-tools` |
| A $12 one-time season keeper license adds named season snapshots. | 10 | `license-verify`, `season-keeper-checkout` |
| Sociobot and Dodo are the merchant of record. | 8 | `season-keeper-checkout` |
| Run and test | 3 | Context-free heading |
| Requirements: Node.js 20 or newer. | 6 | Clear requirement |
| Open `http://localhost:5173/?demo=1` for the sample. | 8 | Clear instruction |
| Run the full production and browser test gate. | 8 | Clear instruction |
| Build the deployable static site. | 5 | Clear instruction |
| The exact deploy output is `dist/`, with `dist/index.html` at its root. | 13 | Clear deployment detail |
| Preview it with `npm run preview`. | 6 | Clear instruction |
| Privacy and limits | 3 | Context-free heading |
| Garden data is local to the browser. | 7 | `local-private` |
| Export a backup before clearing site data or changing devices. | 10 | Useful recovery instruction |
| The tool records the gardener’s own observations. | 7 | Clear scope |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful boundary |
| See `/privacy` and `/terms` in the built site. | 8 | Clear route instruction |
| License | 1 | Context-free heading |
| The source code is available under the MIT License. | 9 | Clear license statement |
| The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`. | 19 | Clear provenance |

Terminology remains consistent: **bed**, **plant**, **care note**, **water line**, **garden map**, and **season snapshot**.

## Demo, sandbox, claims, and privacy checks

- One click on the first-screen action opened `/?demo=1`. After rendering, it showed a real-looking working map with four beds, five plants, four water segments, and dated sample care records.
- The persistent banner read **“Demo — sample data, nothing is saved”** and supplied **Reset demo** and **Start for real**. After adding a bed, reset returned to four beds; Start for real opened `/map` with no demo banner and an empty real map.
- A fresh demo flow generated only `https://garden-care-map.sociobot.in` requests. There were no console or page errors on a cold landing load. The local-private and local-photo claim tests independently recorded the same result. The service-worker offline claim passed.
- In a disposable clean clone at `/tmp/garden-care-map-review3.nQipK1`, `npm ci` succeeded with zero vulnerabilities. All 12 exact commands declared by `.factory/claims.json` passed: `offline-reload`, `local-private`, `demo-isolation`, `care-persistence`, `free-core-tools`, `json-export`, `csv-export`, `local-note-photo`, `water-total`, `license-verify`, `license-network-origin`, and `season-keeper-checkout`.
- The full clean-clone gate also passed: `npm test` (48/48), `npm run lint`, `npm run typecheck`, and `npm run build`. The build produced `dist/index.html` at 56.50 kB / 17.91 kB gzip.
- Claim coverage is otherwise complete for the landing and README: local storage/privacy, offline reopen, demo isolation, care persistence, free tools, JSON and CSV export, local photo handling, water totals, active-license snapshots, Sociobot-only license traffic, and $12 Sociobot-hosted checkout. F-3-1 is the one remaining missing claim entry.

## Earlier-review verification

Every earlier finding was rechecked on the live build and in source; none is merely accepted because a prior document labels it fixed.

| Earlier id | Status | Live/code evidence |
| --- | --- | --- |
| F-1-1 | Fixed | All three plain facts fit in the 390 × 844 cold viewport. |
| F-1-2 | Fixed | Landing preview and sample map both show `Water lines: 16.8 m`. |
| F-1-3 | Fixed | `license-network-origin` is declared and its exact claim command passed. |
| F-1-4 | Fixed | No refund assertion appears on landing, README, or terms. |
| F-1-5 | Fixed | `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms` set route-specific title, description, canonical, OG, and Twitter metadata. |
| F-1-6 | Fixed | An unknown live path returns the styled HTTP 404 with product shell, legal links, icons, and social metadata. |
| F-1-7 | Fixed | Unknown live paths have the direct h1 `Page not found`. |
| F-1-8 | Fixed | The mood-only hero eyebrow is absent. |
| F-1-9 | Fixed | The preview heading is `Garden map preview`. |
| F-1-10 | Fixed | The preview heading names the section. |
| F-1-11 | Fixed | Preview copy names beds, plants, care notes, and water lines. |
| F-1-12 | Fixed | The instructions heading is `How to use the garden map`. |
| F-1-13 | Fixed | The boundary heading is `What this tool does not do`. |
| F-1-14 | Fixed | The paid label is `Paid season snapshots`. |
| F-1-15 | Fixed | The price heading is `Save named season snapshots for $12`. |
| F-2-1 | Fixed | The shared demo-exit code clears the demo namespace for My map, legal navigation, history, Start for real, and outbound links; the exact isolation claim passed. |
| F-2-2 | Fixed | The h1 now uses the precise terms `care notes` and `water lines`. |

## Structure and missed-leverage checks

- Live `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms` returned 200. `/missing-page` returned a real 404. Every checked application route had one h1, a main landmark, `lang=en`, a title, meta description, canonical URL, OG/Twitter metadata, favicon, and Apple touch icon.
- Titles follow the required product/plain-job pattern: the home title is **“Garden Care Map — Map care notes and water lines”**; legal, map, and demo routes identify their route and product. Browser back restored the home route and moved focus to its h1; direct SPA navigation moved focus to the destination h1.
- The header is consistent, includes the skip link and home wordmark, and the footer includes Privacy, Terms, and Built by Param Factory. The sitemap and robots file list the routes. Internal links returned 200; the hosted checkout returned 303 to Dodo and the Param Factory link returned 200.
- No obvious valuable feature is missing from the brief. The product already supports the implied local data backup paths through JSON and CSV export. Sync conflicts with its explicit local-first privacy model. Plant diagnosis, advice, or decorative AI would exceed the stated record-keeping scope, so no AI feature is expected here. No provider key is embedded.

## What would make this perfect

Add the one narrow, tagged `sample-demo` claim and test for the first-screen demo result. Then rerun the 13 claim commands and the full clean-clone suite. With no unlisted landing promise left, the review can pass with zero findings.
