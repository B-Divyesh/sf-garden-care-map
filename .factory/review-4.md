# Adversarial first-read review 4 — FAIL

**Reviewed:** 2026-08-29  
**Candidate:** `163b8e2902458eca035ba369e55cbe3a350f031f`  
**Live product:** <https://garden-care-map.sociobot.in>  
**Verdict:** **FAIL** — five findings remain. There were no failing declared claim tests, but the required zero-findings threshold is not met. No product code was modified.

## Cold first read

I opened the live site in new Chromium contexts with no existing site data, at 390 × 844 and 1440 × 900, before scrolling.

- **What it does:** It maps beds, plants, dated care notes, and irrigation water lines.
- **For whom:** Small-space gardeners who need planting and care tied to a real place.
- **What to click first:** **Try it with sample data**.

The first screen supplies all three answers at both sizes. At 390 px, the primary action is at y=373–420 and the three fact rows end at y=699, inside the 844 px viewport. The cold load made only same-origin requests and produced no page or console error. The headline, audience sentence, action, and outcome are clear enough to pass this gate.

## Findings

### High

#### F-4-1 — The mobile shared header removes the required Demo navigation link

**Location:** live `/`, `/map`, `/privacy`, and `/terms` at 390 px; `src/style.css:928-930`.

The header’s **Demo** link is `display: none` below 800 px. The mobile cold page exposes only **My map** and **Privacy** in the header. The hero happens to contain a demo action, but a visitor on My map, Privacy, Terms, or the 404 page has no visible Demo destination in the shared header.

This fails the required consistent header structure: wordmark, Demo, product section, and Privacy. It makes the isolated try-out harder to find after the first route change.

**Fix:** retain a visible **Demo** link at the mobile breakpoint. Rebalance the wordmark/navigation layout or use a clearly labelled, keyboard-accessible menu; do not hide the only shared Demo route. Add a 390 px browser test that checks the visible header links on every app route.

### Minor

#### F-4-2 — The merchant-of-record statement is an unlisted, untestable visitor claim

**Location:** landing paid card and `README.md`: **“Sociobot and Dodo are the merchant of record.”** The same statement also appears on `/terms`.

`.factory/claims.json` has `season-keeper-checkout`, whose claim is only **“The $12 one-time season keeper opens Sociobot checkout.”** Its test proves the price, Sociobot checkout URL, and a redirect to a Dodo session. It does not prove the legal merchant-of-record assertion. The statement is therefore a claim-like sentence with no matching listed claim and observable test.

**Fix:** remove the merchant-of-record wording from landing, README, and Terms; or link to current merchant terms that explicitly establish it and add a narrowly matching claim/test for that source. Keep the tested plain statement that the button opens Sociobot checkout.

#### F-4-3 — README makes unlisted storage-implementation promises

**Location:** `README.md`, **“Demo changes use `demo:garden`; the real map uses `real:garden`.”** and **“Stores beds, plants, optional note photos, and care history in IndexedDB.”**

The claim contract tests behavioral demo isolation and local photo persistence, but contains no `demo:garden`/`real:garden` namespace claim and no claim that asserts IndexedDB as the storage engine. A reader can rely on these implementation and privacy details, yet neither exact statement is declared or proven by its corresponding sandbox test.

**Fix:** either add exact, clean-browser claims that inspect the two IndexedDB records and verify their isolation, or rewrite the README to the already tested behavior: **“Demo changes stay separate from your map and are discarded when you leave.”** and **“Stores garden records and optional note photos in this browser.”** Keep the required namespace detail in `.factory/demo.md`, where it is documented for verifiers.

#### F-4-4 — The static 404 ignores the product’s dark-mode field-notebook design

**Location:** live unknown route (for example `/missing-page`); `public/404.html:25`.

The application changes to the dark notebook palette under `prefers-color-scheme: dark`; the static 404 fixes `color-scheme:light` and defines no dark-mode token override. A dark-mode visitor therefore receives the light fallback page rather than the documented product identity. This is a visible inconsistency in the required designed 404, not a generic browser fallback.

**Fix:** add the same dark palette token treatment and key surface adjustments used by `src/style.css` to `404.html`, then add a dark-scheme visual/colour regression check for the real 404 response.

#### F-4-5 — The static 404 footer does not identify its external destination

**Location:** live `/missing-page` footer: **“Built by Param Factory”** links to `https://sociobot.in/`; `public/404.html:55`.

The dynamic footer says **“Built by Param Factory (external site)”** to assist screen-reader users. The static 404 version only has `rel="external"`, which does not announce the destination to the visitor. This breaks the required consistent header/footer and the external-link labelling rule on the error route.

**Fix:** make the static footer link text match the dynamic shell, for example add a visually-hidden **“(external site)”** suffix, and test the accessible link name on the HTTP 404 page.

## Copy audit

Counts treat hyphenated compounds, URLs, and version strings as one word. The tables include visible landing text, control labels, and the currently hidden restore panel because it becomes visitor-visible after **Restore a license**. No copy unit exceeds 22 words. No banned marketing adjective, jargon, mood slogan, or non-result-naming button was found. The only copy-related flags are the factual claims in F-4-2 and F-4-3.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Clear skip-link instruction |
| Garden Care Map | 3 | Product wordmark |
| Demo | 1 | Clear route label; hidden on mobile (F-4-1) |
| My map | 2 | Clear route label |
| Privacy | 1 | Clear route label |
| Map beds, plants, care notes, and water lines | 8 | Clear job headline |
| For small-space gardeners who need every planting and care note tied to its real place. | 15 | Clear audience and situation |
| Try it with sample data | 5 | Result-naming primary action |
| It opens a complete garden map. | 6 | `sample-demo` |
| Demo changes stay separate. | 4 | `demo-isolation` |
| Start my blank map | 4 | Clear secondary action |
| Private | 1 | Fact label |
| Garden data stays in this browser. | 6 | `local-private` |
| Offline | 1 | Fact label |
| Reopens after your first visit. | 5 | `offline-reload` |
| Free core | 2 | Fact label |
| Every mapping and export tool is free. | 7 | `free-core-tools` |
| Keep the care record on the same map as the garden. | 11 | Useful product description |
| Garden map preview | 3 | Contextual section heading |
| Beds, plants, care notes, and water lines share one map. | 10 | Useful product description |
| Each plant keeps its own dated history. | 7 | `care-persistence` |
| Herbs / Salad / Tomato pots / Bean trough | 1 / 1 / 2 / 2 | Map labels, not sentences |
| Basil / Thyme / Lettuce / Tomato / Bean | 1 each | Sample plant labels, not sentences |
| Water lines: 16.8 m | 4 | `water-total` |
| How to use the garden map | 6 | Contextual section heading |
| Draw each bed | 3 | Clear step heading |
| Place beds and containers on a simple grid. | 8 | Clear instruction |
| Pin each plant | 3 | Clear step heading |
| Name the crop and variety where it grows. | 8 | Clear instruction |
| Record each visit | 3 | Clear step heading |
| Add dated care notes and measure water lines. | 8 | Clear instruction |
| What this tool does not do | 6 | Contextual scope heading |
| This tool records what you plant and do. | 8 | Useful scope statement |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful boundary |
| Paid season snapshots | 3 | Contextual paid-section label |
| Save named season snapshots for $12 | 6 | Plain price/result heading |
| The free map includes every core tool and data export. | 10 | `free-core-tools` |
| A one-time purchase adds named season snapshots on this device. | 10 | `license-verify` |
| $12 one-time purchase | 3 | `season-keeper-checkout` |
| Buy the season keeper | 5 | Result-naming checkout action |
| through Sociobot checkout | 3 | Accessible checkout destination detail |
| Restore a license | 3 | Clear recovery action |
| Sociobot and Dodo are the merchant of record. | 8 | F-4-2 |
| Restore your season keeper | 5 | Clear panel heading |
| License token | 2 | Clear field label |
| Verify license | 2 | Result-naming action |
| Map beds, plants, care notes, and water lines in one place. | 11 | Concrete footer description |
| Privacy (footer) | 1 | Clear legal route |
| Terms | 1 | Clear legal route |
| Built by Param Factory (external site) | 6 | Explicit external destination |
| v1.0.2 · Original generated field-guide artwork | 5 | Provenance/version label |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Garden Care Map | 3 | Document title |
| Garden Care Map is an offline field notebook for small-space gardeners. | 11 | Clear product/audience description |
| Draw beds, pin plants, record dated care, and measure connected water lines on one map. | 15 | Clear job description |
| Try the isolated sample at `/?demo=1` or `/demo`. | 8 | Clear demo instruction |
| Demo changes use `demo:garden`; the real map uses `real:garden`. | 11 | F-4-3 |
| Every demo exit deletes the demo changes. | 7 | `demo-isolation` |
| What it does | 4 | Contextual heading |
| Stores beds, plants, optional note photos, and care history in IndexedDB. | 11 | F-4-3 |
| Measures water-line segments in meters or feet and shows their total. | 11 | `water-total` |
| Exports the complete garden as JSON and every care note as CSV. | 12 | `json-export`; `csv-export` |
| Reopens offline after the first complete visit. | 7 | `offline-reload` |
| Keeps all normal map use on this device. | 8 | `local-private` |
| Verifies existing season keeper licenses through Sociobot billing. | 8 | `license-verify` |
| The free map includes all care, mapping, photo, and export tools. | 11 | `free-core-tools` |
| A $12 one-time season keeper license adds named season snapshots. | 10 | `license-verify`; `season-keeper-checkout` |
| Sociobot and Dodo are the merchant of record. | 8 | F-4-2 |
| Run and test | 3 | Contextual heading |
| Requirements: Node.js 20 or newer. | 6 | Clear requirement |
| Open `http://localhost:5173/?demo=1` for the sample. | 8 | Clear local-demo instruction |
| Run the full production and browser test gate. | 8 | Clear test instruction |
| Build the deployable static site. | 5 | Clear build instruction |
| The exact deploy output is `dist/`, with `dist/index.html` at its root. | 13 | Clear deployment detail |
| Preview it with `npm run preview`. | 6 | Clear preview instruction |
| Privacy and limits | 3 | Contextual heading |
| Garden data is local to the browser. | 7 | `local-private` |
| Export a backup before clearing site data or changing devices. | 10 | Useful recovery instruction |
| The tool records the gardener’s own observations. | 7 | Useful scope statement |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful boundary |
| See `/privacy` and `/terms` in the built site. | 8 | Clear legal-route instruction |
| License | 1 | Contextual heading |
| The source code is available under the MIT License. | 9 | Clear license statement |
| The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`. | 19 | Useful provenance statement |

The README’s shell commands are imperative code samples rather than sentences; they were read for correctness and need no word-count flag. Terminology is otherwise consistent: **bed**, **plant**, **care note**, **water line**, **garden map**, and **season snapshot**.

## Demo, sandbox, privacy, and claims

- One click on **Try it with sample data** opened `/?demo=1`. Its first product screen already showed the four-bed, five-plant, four-water-line Courtyard kitchen garden and a dated care note. The persistent **“Demo — sample data, nothing is saved”** banner exposed **Reset demo** and **Start for real**.
- In the clean-browser claim run, Reset restored four beds; demo edits were discarded through My map, Privacy, history, and Start for real; existing real-map data remained intact. The storage code uses separate `demo:garden` and `real:garden` records, but the README wording still needs contract coverage (F-4-3).
- Fresh-clone setup: `git clone --no-local /work/repo` followed by `npm ci` (132 packages, 0 vulnerabilities). Every literal command in `.factory/claims.json` passed: `offline-reload`, `local-private`, `sample-demo`, `demo-isolation`, `care-persistence`, `free-core-tools`, `json-export`, `csv-export`, `local-note-photo`, `water-total`, `license-verify`, `license-network-origin`, and `season-keeper-checkout`.
- `npm test` passed 48/48 locally, and `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` passed 48/48 against live. `npm run build` produced `dist/`; the clean-build `dist/index.html` and live `/` share SHA-256 `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
- The `local-private`, `local-note-photo`, and `license-network-origin` tests record request origins. Normal demo use contacted only `https://garden-care-map.sociobot.in`; the recorded license path permits only that origin plus `https://api.sociobot.in`. No third-party fonts or scripts appeared in the cold request log.

## History verification

I read `review-1.md`, `review-2.md`, `review-3.md`, `polish-1.md`, `polish-2.md`, `polish-3.md`, and the prior handoff, then verified each earlier finding again against live behavior and current source. None is merely marked fixed.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: all three fact rows intersect the 390 × 844 initial viewport. |
| F-1-2 | Fixed: landing and demo both say `Water lines: 16.8 m`; the total claim passes. |
| F-1-3 | Fixed: `license-network-origin` exists and passes its exact request-origin test. |
| F-1-4 | Fixed: no refund assertion remains on landing, README, or Terms. |
| F-1-5 | Fixed: all application routes set their own title, description, canonical, OG, and Twitter metadata. |
| F-1-6 | Fixed: an unknown route returns styled HTTP 404 with the product shell, legal links, icons, and metadata. |
| F-1-7 | Fixed: the unknown-route h1 is `Page not found`. |
| F-1-8 | Fixed: the mood-only hero eyebrow is absent. |
| F-1-9 | Fixed: the preview heading is `Garden map preview`. |
| F-1-10 | Fixed: the preview heading names its content. |
| F-1-11 | Fixed: preview copy uses beds, plants, care notes, and water lines. |
| F-1-12 | Fixed: the instruction heading is `How to use the garden map`. |
| F-1-13 | Fixed: the boundary heading is `What this tool does not do`. |
| F-1-14 | Fixed: the paid label is `Paid season snapshots`. |
| F-1-15 | Fixed: the paid heading is `Save named season snapshots for $12`. |
| F-2-1 | Fixed: every tested demo exit clears sample edits without changing the real map. |
| F-2-2 | Fixed: the h1 uses `care notes` and `water lines`. |
| F-3-1 | Fixed: `sample-demo` is declared and its hero-action test proves the complete sample. |

## Structure and missed leverage

`/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms` returned 200; `/missing-page` returned a real 404. Crawling their live anchors found no dead internal links; the hosted checkout returned 303 to a Dodo checkout session, and mail links were explicit. Titles, descriptions, canonicals, OG/Twitter cards, favicon/apple touch icon, robots, sitemap, service worker, skip link, one h1, focus restoration, and the designed field-guide identity all otherwise verify. The static 404 exceptions are F-4-4 and F-4-5.

The tool includes the brief-implied import/export and offline local-first behaviour. The brief does not imply an AI step or cloud sync; adding either would conflict with its private offline record purpose. No decorative AI feature or embedded provider key was found.

## What would make this perfect

Keep Demo visible in the 390 px shared navigation; remove or properly prove the merchant and README storage-engine assertions; and make the static 404 match the application’s dark-mode and external-link accessibility treatment. After those changes, rerun every declared claim command in a clean clone and add the new mobile-header, 404 dark-mode, external-link-name, and any retained storage-claim tests.
