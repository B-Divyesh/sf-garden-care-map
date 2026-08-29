# Adversarial first-read review 1 — FAIL

**Reviewed:** 2026-08-29  
**Live product:** https://garden-care-map.sociobot.in  
**Verdict:** **FAIL** — 15 findings remain, including four blocking contract failures. This was a full review, not a diff review. No product code was changed.

## Cold first read

I used new Chromium contexts at 390 × 844 and 1440 × 900, with no pre-existing site data.

- **What it does:** a garden map that keeps beds, plants, dated care, and irrigation together.
- **For whom:** small-space gardeners.
- **What to click first:** **Try it with sample data**.

Those three answers are present without scrolling at both sizes, so the narrow first-read question passes. The visual treatment is a distinctive botanical field guide, not a generic SaaS template. However, at 390 px the three mandatory plain facts are below the first viewport; that is a separate blocking finding below.

## Findings

### Blocking

#### F-1-1 — Mobile first screen omits all three mandatory plain facts

**Location:** `/`, 390 × 844 cold load. The hero art occupies the top of the mobile layout; **Private / Garden data stays in this browser**, **Offline / Reopens after your first visit**, and **Free core / Every mapping and export tool is free** all begin below the first viewport.

The visitor can identify the job and demo, but cannot see privacy, offline, or price facts before scrolling. The plain-words first-screen contract requires these three facts on that screen.

**Fix:** at the mobile breakpoint, place the hero copy, primary action, outcome text, and three facts before the artwork (or make the artwork small enough for all of them to remain in the 390 × 844 first viewport). Add a 390 × 844 visual/DOM test asserting all three fact rows intersect the viewport on first load.

#### F-1-2 — Landing preview shows an unproven, conflicting irrigation total

**Location:** `/`, product preview: **“Hose total: 15.3 m”**. `/demo` instead displays the shipped sample’s **“Water lines: 16.8 m”**.

This looks like live product output but is neither the demo value nor asserted by `@claim:water-total`; that test asserts 16.8 m and 55.1 ft. The quantitative landing claim therefore has no test for the value shown and creates an avoidable contradiction before the visitor tries the demo.

**Fix:** make the preview match the shipped sample (16.8 m), then extend the water-total claim test to assert the landing preview too; or replace the number with non-quantitative text such as **“Irrigation lines shown on the map”**.

#### F-1-3 — README privacy-routing claim is absent from the claims contract

**Location:** `README.md`, What it does: **“License checks contact only Sociobot.”**

`.factory/claims.json` has no entry for this statement. `@claim:license-verify` uses a recorded route fixture and `@claim:local-private` records demo-map traffic only; neither records a real license-verification flow and asserts that the only external origin is `https://api.sociobot.in`. A visitor can rely on this privacy statement, so it needs the required observable test.

**Fix:** add a `license-network-origin` claim and clean-state browser test that records requests during a fixture-backed verification and permits only the product origin plus `https://api.sociobot.in`; or remove the sentence.

#### F-1-4 — Refund assertion is unlisted and untested

**Location:** `/` paid card and `README.md`: **“Refunds are handled there.”**

This is a visitor-facing purchase-policy claim. No claim entry or sandbox test verifies it. The checkout test proves a 303 to a Dodo checkout session, not refund handling or its terms.

**Fix:** link to the merchant’s applicable refund terms and state the policy only if that link is current, with a test for the link/target; otherwise remove the assertion. Do not represent a third-party refund process without verifiable support.

### High

#### F-1-5 — Route metadata is stale outside the landing page

**Location:** live `/demo`, `/map`, `/privacy`, and `/terms`; `src/main.ts:61-67`.

The document title and canonical change, but Open Graph and Twitter metadata stay at the landing page. For example, `/demo` has title **“Demo — Garden Care Map”** and canonical `/demo`, while `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description` still describe `/`. `/privacy` and `/terms` also retain the landing description **“Draw your garden, record plant care, and measure irrigation lines in one private offline map.”**

Shared route links therefore describe the wrong page, and legal pages have misleading descriptions.

**Fix:** make `routeTitle` set title, description, canonical, `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description` from a per-route metadata map. Add a browser test for every route’s complete metadata.

#### F-1-6 — The real 404 omits the required site shell and metadata

**Location:** live unknown path (HTTP 404); `public/404.html`.

The response is a real 404 and gives a way home, but it has no header, no footer, no Privacy/Terms links, no favicon/Apple icon, no canonical link, no meta description, and no Open Graph/Twitter tags. It also does not use the consistent product shell required on every route.

**Fix:** build a static 404 shell that includes the wordmark/home link, Privacy and Terms links, footer, favicon/Apple touch icon, canonical, description, social tags, and the existing field-guide visual language. Test the actual HTTP-404 response, not only the SPA fallback.

#### F-1-7 — The 404 headline is a metaphor instead of the page state

**Location:** live unknown path and `public/404.html`: **“This marker is off the map”**.

A first-time visitor cannot tell from the heading alone that this is a missing page. The supporting sentence clarifies it, but headings must make sense out of context.

**Fix:** use **“Page not found”** as the `<h1>` and retain the garden phrasing only as optional supporting copy.

### Minor — copy flags

All copy units are within the 22-word cap. No banned marketing adjective was found, and every landing action is a result-naming verb. The following headings/sentences nevertheless fail the plain-words heading rule.

#### F-1-8 — Mood eyebrow

**Location:** `/` hero eyebrow: **“A FIELD NOTEBOOK FOR YOUR GARDEN”**.

It names a mood/object rather than a section or useful action.

**Fix:** delete it; the headline already names the job.

#### F-1-9 — Context-free section eyebrow

**Location:** `/` preview eyebrow: **“THE PRODUCT”**.

It tells a screen-reader user nothing about the section.

**Fix:** replace with **“Garden map preview”**.

#### F-1-10 — Vague preview heading

**Location:** `/` preview heading: **“See the whole growing space”**.

It does not name the section or say what the preview shows.

**Fix:** replace with **“Garden map preview”**.

#### F-1-11 — Inconsistent, vague noun

**Location:** `/` preview copy: **“Each mark has a place.”**

“Mark” is not a product term; elsewhere the product says beds, plants, care notes, and water lines.

**Fix:** replace with **“Beds, plants, care notes, and water lines share one map.”**

#### F-1-12 — Slogan heading

**Location:** `/` How it works heading: **“Keep one living garden record”**.

It is a mood slogan rather than a section name; the eyebrow carries the actual section meaning.

**Fix:** replace it with **“How to use the garden map”** and remove the redundant eyebrow.

#### F-1-13 — Context-free boundary eyebrow

**Location:** `/` limits eyebrow: **“A CLEAR BOUNDARY”**.

It says neither what the tool does nor what it does not do.

**Fix:** replace with **“What this tool does not do”**.

#### F-1-14 — Unexplained tier name

**Location:** `/` paid eyebrow: **“OPTIONAL SEASON KEEPER”**.

“Season keeper” is introduced before the visitor knows the paid result.

**Fix:** replace with **“Paid season snapshots”**. Introduce “Season keeper” only as the optional license name, if it must remain a name.

#### F-1-15 — Unnatural price heading

**Location:** `/` paid heading: **“Keep past seasons for $12 once”**.

“For $12 once” is not plain spoken and leaves the actual output implicit.

**Fix:** replace with **“Save named season snapshots for $12”**.

## Copy audit

Word counts treat a hyphenated compound such as “small-space” as one word. Headings, labels, buttons, captions, and prose are included so the audit also captures context-free headings and action language. Code blocks and URLs are counted as one visible unit where applicable.

### Landing page

| Copy unit | Words | Audit note |
| --- | ---: | --- |
| A field notebook for your garden | 6 | F-1-8 |
| Map beds, plants, care, and water | 6 | Clear headline |
| For small-space gardeners who need every planting and care note tied to its real place. | 15 | Clear audience/outcome |
| Try it with sample data | 5 | Clear result-naming action |
| It opens a complete garden map. | 6 | Clear |
| Demo changes stay separate. | 4 | Claim covered by demo isolation |
| Start my blank map | 4 | Clear result-naming action |
| Garden data stays in this browser. | 6 | Privacy claim |
| Reopens after your first visit. | 5 | Offline claim |
| Every mapping and export tool is free. | 7 | Free-core claim |
| Keep the care record on the same map as the garden. | 11 | Clear |
| The product | 2 | F-1-9 |
| See the whole growing space | 5 | F-1-10 |
| Each mark has a place. | 5 | F-1-11 |
| Each plant keeps its own dated history. | 7 | Care-history claim |
| Hose total: 15.3 m | 5 | F-1-2 |
| How it works | 3 | Clear section label |
| Keep one living garden record | 5 | F-1-12 |
| Draw each bed | 3 | Clear step |
| Place beds and containers on a simple grid. | 8 | Clear |
| Pin each plant | 3 | Clear step |
| Name the crop and variety where it grows. | 8 | Clear |
| Record each visit | 3 | Clear step |
| Add dated care notes and measure water lines. | 8 | Clear |
| A clear boundary | 3 | F-1-13 |
| Your notes, not garden advice | 5 | Clear limit heading |
| This tool records what you plant and do. | 8 | Clear |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful scope limit |
| Optional season keeper | 3 | F-1-14 |
| Keep past seasons for $12 once | 6 | F-1-15 |
| The free map includes every core tool and data export. | 10 | Free-core claim |
| A one-time purchase adds named season snapshots on this device. | 10 | License claim |
| $12 one-time purchase | 3 | Clear price |
| Buy the season keeper | 4 | Clear result-naming action |
| Restore a license | 3 | Clear result-naming action |
| Sociobot and Dodo are the merchant of record. | 8 | Checkout target is tested |
| Refunds are handled there. | 4 | F-1-4 |
| Map beds, plant care, and water lines in one place. | 10 | Clear footer one-liner |
| Original generated field-guide artwork | 4 | Provenance label |

Non-sentence map labels are `Herbs`, `Basil`, `Thyme`, `Salad`, `Lettuce`, `Tomato pots`, `Tomato`, `Bean trough`, and `Bean`; they are concrete and consistent.

### README

| Sentence | Words | Audit note |
| --- | ---: | --- |
| Garden Care Map is an offline field notebook for small-space gardeners. | 11 | Clear product/audience |
| Draw beds, pin plants, record dated care, and measure connected water lines on one map. | 15 | Clear job |
| Try the isolated sample at `/demo`. | 6 | Clear demo entry |
| Demo changes use `demo:garden`; the real map uses `real:garden`. | 11 | Concrete namespace detail |
| Start for real deletes the demo changes. | 7 | Demo-isolation claim |
| Stores beds, plants, optional note photos, and care history in IndexedDB. | 11 | Concrete storage statement |
| Measures water-line segments in meters or feet and shows their total. | 11 | Water-total claim |
| Exports the complete garden as JSON and every care note as CSV. | 12 | Export claims |
| Reopens offline after the first complete visit. | 7 | Offline claim |
| Keeps all normal map use on this device. | 8 | Privacy claim |
| License checks contact only Sociobot. | 5 | F-1-3 |
| Verifies existing season keeper licenses through Sociobot billing. | 8 | License claim |
| The free map includes all care, mapping, photo, and export tools. | 11 | Free-tier statement |
| A $12 one-time season keeper license adds named season snapshots. | 10 | Price/license claim |
| Sociobot and Dodo are the merchant of record. | 8 | Checkout statement |
| Refunds are handled there. | 4 | F-1-4 |
| Requirements: Node.js 20 or newer. | 6 | Clear requirement |
| Open `http://localhost:5173/demo` for the sample. | 8 | Clear instruction |
| Run the full production and browser test gate. | 8 | Clear instruction |
| Build the deployable static site. | 5 | Clear instruction |
| The exact deploy output is `dist/`, with `dist/index.html` at its root. | 13 | Clear instruction |
| Preview it with `npm run preview`. | 6 | Clear instruction |
| Garden data is local to the browser. | 7 | Privacy claim |
| Export a backup before clearing site data or changing devices. | 10 | Useful recovery instruction |
| The tool records the gardener’s own observations. | 7 | Clear scope |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful scope limit |
| See `/privacy` and `/terms` in the built site. | 8 | Clear route instruction |
| The source code is available under the MIT License. | 9 | Clear |
| The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`. | 19 | Clear provenance |

No README or landing copy unit exceeds 22 words. No button fails the result-naming-verb test.

## Demo, sandbox, and privacy checks

- `/demo` opens in one click to a realistic map: four beds, five active plants, three dated notes, and four water lines.
- The persistent banner is present: **“Demo — sample data, nothing is saved”**, with **Reset demo** and **Start for real**.
- The declared deployed suite passes its reset/discard and separate-storage exercise. `demo:garden` and `real:garden` are distinct in `src/storage.ts`.
- A fresh demo browser flow recorded only `https://garden-care-map.sociobot.in` requests. The offline claim test passes after service-worker control and offline reload.
- No AI feature is present. The brief describes a local field record, and an AI step would be decorative rather than an implied missing capability. JSON/CSV export is already provided; account sync would conflict with the stated local-first privacy model.

## Claims test execution

After `npm ci` in this clean checkout, every exact command listed in `.factory/claims.json` was run. All returned PASS:

| Claim id | Result |
| --- | --- |
| offline-reload | PASS |
| local-private | PASS |
| demo-isolation | PASS |
| care-persistence | PASS |
| free-core-tools | PASS |
| json-export | PASS |
| csv-export | PASS |
| local-note-photo | PASS |
| water-total | PASS |
| license-verify | PASS (recorded fixture) |
| season-keeper-checkout | PASS; live checkout also returned HTTP 303 to a Dodo session |

The test results do not remove F-1-2 through F-1-4 because those exact visitor statements are not covered by a matching claim entry and observable test.

## Structure, routes, links, and previous-history verification

- `/`, `/demo`, `/map`, `/privacy`, and `/terms` returned HTTP 200. An unknown path returned HTTP 404 with a designed static page. All discovered internal links returned 200; the checkout link returned HTTP 303 to Dodo; the Sociobot external link returned 200; both email links are explicit `mailto:` links.
- Normal routes have one `h1`, one `main`, `lang="en"`, a title, canonical URL, skip link, visible focus, footer, and working back-button focus restoration. The deployed 38-test suite passed, including Axe serious/critical checks in light and dark modes, 390 px controls, keyboard map placement, offline reload, import recovery, and checkout.
- The design is product-specific and follows `.factory/design.md`: botanical field-guide art, paper/ink palette, Georgia/system pairing, map-first preview, and no generic SaaS-card layout.
- Earlier reports were `verification.md`, `verification-2.md`, `verification-3.md`, `verification-4.md`, and the prior handoff. The earlier dark-contrast, checkout-404, demo-discard, invalid-import recovery, mobile hit-area, immediate-save, invalid-license feedback, zoom overflow, nested-landmark, caching, and real-404 defects are fixed in current live behavior and source. `verification-4.md` had no findings. F-1-5 through F-1-7 are newly found omissions, not a regression of an earlier finding.

## What would make this perfect

1. Put the three privacy/offline/free facts on the 390 px first screen.
2. Align every visible quantitative preview value and every privacy/purchase statement with a matching, observable claim test.
3. Complete route metadata and make the real 404 a full product route.
4. Replace the eight vague or mood-only headings with the concrete rewrites above.
5. Rerun this entire cold-start, copy, demo, claims, privacy, history, routing, and link checklist; PASS only when the finding list is empty.
