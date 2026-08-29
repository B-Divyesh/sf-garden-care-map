# Adversarial first-read review 5 — PASS

**Reviewed:** 2026-08-29 UTC  
**Live product:** <https://garden-care-map.sociobot.in>  
**Verdict:** **PASS** — no blocking, high, medium, minor, unlisted-claim, or untested-claim findings remain. This was a fresh end-to-end review, not a diff-only review. No product code was changed.

## Cold first read

I opened the live root in new Chromium contexts with no existing site data, before scrolling, at 390 × 844 and 1440 × 900.

- **What it does:** map garden beds, plants, care notes, and water lines.
- **For whom:** small-space gardeners who want each planting and care note tied to its real place.
- **What to click first:** **Try it with sample data**.

The landing `<h1>` is **“Map beds, plants, care notes, and water lines”**; the next sentence names the audience and result; the primary button is present with the immediately useful outcome, **“It opens a complete garden map. Demo changes stay separate.”** At 390 px all three required fact rows end at 699 px of the 844 px viewport: private/local, offline, and free core. There was no horizontal overflow (`390 = scrollWidth`) or console/page error. Cold-load requests were only to `https://garden-care-map.sociobot.in`.

The presentation is a distinct botanical field notebook: warm paper, ruled grid, plant-plate art, serif display type, clipped ink controls, and a map-first layout. It does not use a generic SaaS hero or feature-card template.

## Copy audit

Word counts treat a hyphenated compound and a visible URL as one word. The audit includes visible sentences, headings, controls, labels, and meaningful image text so a context-free or action-language issue would be visible. No unit exceeds 22 words. No jargon, banned marketing adjective, mood slogan, inconsistent product term, context-free heading, or non-result-naming action was found. Terminology is consistent: **bed**, **plant**, **care note**, **water line**, **garden map**, and **season snapshot**.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear wordmark |
| Demo | 1 | Clear navigation |
| My map | 2 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Map beds, plants, care notes, and water lines | 8 | Clear verb-first headline |
| For small-space gardeners who need every planting and care note tied to its real place. | 15 | Names audience and result |
| Try it with sample data | 5 | Result-naming primary action |
| It opens a complete garden map. | 6 | `sample-demo` claim |
| Demo changes stay separate. | 4 | `demo-isolation` claim |
| Start my blank map | 4 | Result-naming action |
| Private | 1 | Plain fact label |
| Garden data stays in this browser. | 6 | `local-private` claim |
| Offline | 1 | Plain fact label |
| Reopens after your first visit. | 5 | `offline-reload` claim |
| Free core | 2 | Plain fact label |
| Every mapping and export tool is free. | 7 | `free-core-tools` claim |
| A painted field-guide view of raised beds, pots, herbs, and a red irrigation hose. | 14 | Useful image alt text |
| Keep the care record on the same map as the garden. | 11 | Concrete product description |
| Garden map preview | 3 | Context-free section heading |
| Beds, plants, care notes, and water lines share one map. | 10 | Concrete product description |
| Each plant keeps its own dated history. | 7 | Covered by `care-persistence` |
| Water lines: 16.8 m | 4 | Covered by `water-total`; matches sample |
| How to use the garden map | 6 | Context-free section heading |
| Draw each bed | 3 | Clear step |
| Place beds and containers on a simple grid. | 8 | Clear instruction |
| Pin each plant | 3 | Clear step |
| Name the crop and variety where it grows. | 8 | Clear instruction |
| Record each visit | 3 | Clear step |
| Add dated care notes and measure water lines. | 8 | Clear instruction |
| What this tool does not do | 6 | Context-free scope heading |
| This tool records what you plant and do. | 8 | Plain scope statement |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Plain limitation, not a capability promise |
| Paid season snapshots | 3 | Context-free paid label |
| Save named season snapshots for $12 | 6 | Clear paid result and price |
| The free map includes every core tool and data export. | 10 | `free-core-tools` claim |
| A one-time purchase adds named season snapshots on this device. | 10 | `license-verify` claim |
| $12 one-time purchase | 3 | `season-keeper-checkout` claim |
| Buy the season keeper | 4 | Result-naming checkout action |
| Restore a license | 3 | Result-naming recovery action |
| The purchase button opens Sociobot checkout. | 6 | `season-keeper-checkout` claim |
| Map beds, plants, care notes, and water lines in one place. | 11 | Clear footer description |
| Original generated field-guide artwork | 4 | Useful provenance label |

The preview names — Herbs, Basil, Thyme, Salad, Lettuce, Tomato pots, Tomato, Bean trough, and Bean — are concrete labels rather than sentences and use the same product vocabulary.

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear title |
| Garden Care Map is an offline field notebook for small-space gardeners. | 11 | Clear product and audience |
| Draw beds, pin plants, record dated care, and measure connected water lines on one map. | 15 | Clear job description |
| Try the isolated sample at `/?demo=1` or `/demo`. | 8 | Clear demo instruction |
| Demo changes stay separate from your map and are discarded when you leave. | 13 | `demo-isolation` claim |
| What it does | 3 | Clear documentation heading |
| Stores garden records and optional note photos in this browser. | 10 | `local-private` and `local-note-photo` claims |
| Measures water-line segments in meters or feet and shows their total. | 11 | `water-total` claim |
| Exports the complete garden as JSON and every care note as CSV. | 12 | `json-export` and `csv-export` claims |
| Reopens offline after the first complete visit. | 7 | `offline-reload` claim |
| Keeps all normal map use on this device. | 8 | `local-private` claim |
| Verifies existing season keeper licenses through Sociobot billing. | 8 | `license-verify` claim |
| The free map includes all care, mapping, photo, and export tools. | 11 | `free-core-tools` claim |
| A $12 one-time season keeper license adds named season snapshots. | 10 | `license-verify` and `season-keeper-checkout` claims |
| The purchase opens Sociobot checkout. | 5 | `season-keeper-checkout` claim |
| Run and test | 3 | Clear documentation heading |
| Requirements: Node.js 20 or newer. | 6 | Clear requirement |
| Open `http://localhost:5173/?demo=1` for the sample. | 5 | Clear instruction |
| Run the full production and browser test gate. | 8 | Clear instruction |
| Build the deployable static site. | 5 | Clear instruction |
| The exact deploy output is `dist/`, with `dist/index.html` at its root. | 13 | Clear deployment detail |
| Preview it with `npm run preview`. | 5 | Clear instruction |
| Privacy and limits | 3 | Clear documentation heading |
| Garden data is local to the browser. | 7 | `local-private` claim |
| Export a backup before clearing site data or changing devices. | 10 | Useful recovery instruction |
| The tool records the gardener’s own observations. | 7 | Plain scope statement |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Plain limitation, not a capability promise |
| See `/privacy` and `/terms` in the built site. | 8 | Clear route instruction |
| License | 1 | Clear documentation heading |
| The source code is available under the MIT License. | 9 | License fact |
| The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`. | 19 | Provenance fact |

The two scope-limit sentences deliberately say what the tool does not attempt; they do not assert an untested outcome or external service property. Every visitor-facing operational, privacy, price, export, demo, persistence, or checkout promise maps to a listed claim above.

## Demo, sandbox, and privacy

- The hero action reaches `/?demo=1` in one click. The first displayed product screen already has the realistic **Courtyard kitchen garden** sample: four beds, five plants, four water lines, and dated care history.
- The persistent **“Demo — sample data, nothing is saved”** banner includes **Reset demo** and **Start for real**.
- `@claim:demo-isolation` exercises My map, Privacy, browser back/forward, Reset demo, and Start for real. It adds demo data, confirms each exit restores the four-bed sample on re-entry, and confirms real-map data remains unchanged. Source uses separate `demo:garden` and `real:garden` records and clears the demo record on every non-demo navigation.
- `@claim:local-private` and `@claim:local-note-photo` record requests while using the demo and accept only the product origin. A fresh live cold visit independently recorded only `https://garden-care-map.sociobot.in`.
- `@claim:offline-reload` waits for service-worker control, takes the demo browser offline, reloads, and confirms the sample and offline state return.
- No runtime AI feature, embedded provider key, or decorative AI control exists. The brief is a local garden record; JSON/CSV export already supplies the implied portability feature, while cloud sync or plant-advice AI would conflict with the stated local-first scope.

## Claims gate

After a clean `npm ci`, I ran every literal command listed in `.factory/claims.json`; all 13 passed. The full `npm test` run passed **56/56**, including the exact tagged browser test for every claim.

| Claim id | Result |
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
| license-verify | PASS (recorded fixture) |
| license-network-origin | PASS (recorded fixture) |
| season-keeper-checkout | PASS (HTTP 303 to hosted Dodo checkout) |

The live checkout URL currently returns HTTP 303. No live landing or README operational claim was found without an entry in `.factory/claims.json`.

## Structure, routing, and accessibility

- Live `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms`, and `/404.html` return 200; an unknown path returns a designed HTTP 404. The checkout returns 303; the Param Factory link returns 200. No landing-page link is dead.
- Routes have the required route-specific titles, descriptions, canonicals, OG/Twitter metadata, favicon, Apple icon, and one h1/main. The title pattern is plain and under 60 characters: for example, **“Garden Care Map — Map care notes and water lines”** and **“Demo — Garden Care Map.”**
- Header, skip link, navigation, footer, Privacy, Terms, and external-link announcement are consistent. Deep links load correctly; the app test verifies back navigation and focus returning to the new h1.
- The actual 404 has the full site shell, legal links, field-guide design, direct **“Page not found”** h1, proper metadata, and a home action.
- Local lint and typecheck passed. Accessibility tests cover all app routes plus 404 in light and dark modes with no serious/critical Axe issue, keyboard order and map placement, 44 px mobile hit targets, 200% text, and reduced motion.

## Earlier-history verification

I read every earlier review, polish, verification report, and handoff. The current live site and source were checked rather than trusting a “fixed” label.

| Earlier finding(s) | Current result | Current evidence |
| --- | --- | --- |
| F-1-1 | Fixed | 390 px facts end at 699/844 px; mobile regression passes. |
| F-1-2 | Fixed | Landing and demo both show 16.8 m; regression and `water-total` pass. |
| F-1-3 through F-1-4 | Fixed | Sociobot-only license-origin claim/test exists; unsupported refund statement is absent. |
| F-1-5 through F-1-7 | Fixed | Per-route social metadata and full designed HTTP 404 verified. |
| F-1-8 through F-1-15 | Fixed | Current landing copy has the concrete headings and terms recorded in this audit. |
| F-2-1 | Fixed | `demo-isolation` covers visible exits, history, reset, real-data preservation, and discard. |
| F-2-2 | Fixed | Current h1 names care notes and water lines. |
| F-3-1 | Fixed | `sample-demo` is declared and tests the landing action through a complete seeded sample. |
| F-4-1 | Fixed | Demo, My map, and Privacy remain visible on every 390 px shared-header route. |
| F-4-2 through F-4-3 | Fixed | Unsupported merchant/storage implementation claims remain absent from visitor copy. |
| F-4-4 through F-4-5 | Fixed | Static 404 has dark field-notebook tokens and an external-destination suffix. |
| Earlier verification defects: contrast, checkout 404, import corruption/recovery, touch targets, immediate-save race, invalid-license feedback, 200% overflow, nested landmark, real 404, skip-link order, caching | Fixed | Current 56-test suite covers each regression and passed; live checkout is 303, unknown route is 404, and the fresh 390 px cold audit has no overflow or errors. |

The polish reports themselves leave no additional open finding. No historical defect was reproduced in this review.

## What would make this perfect

The product currently meets the zero-open-findings standard. Maintain that state by rerunning the complete cold-start, copy, demo-isolation, claims, privacy, history, route/link, and accessibility checklist after any copy, storage, billing, or deployment change.
