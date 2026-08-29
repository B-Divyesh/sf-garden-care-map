# Adversarial first-read review 2 — FAIL

**Reviewed:** 2026-08-29  
**Live product:** https://garden-care-map.sociobot.in  
**Verdict:** **FAIL** — one blocking finding and one minor copy finding remain. This was a fresh full review of the deployed site and a clean-clone test run. No product code was changed.

## Cold first read

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900, with no existing site data.

- **What it does:** records garden beds, plants, care notes, and irrigation on a map.
- **For whom:** small-space gardeners.
- **What to click first:** **Try it with sample data**.

The first screen answers all three questions at both sizes. At 390 px, all three required facts were inside the viewport: Private (508–551 px), Offline (551–593 px), and Free core (593–658 px). The first screen is visually distinct and appropriately map-first: a paper field-guide surface, ruled facts, botanical art, and no generic SaaS card grid.

## Findings

### Blocking

#### F-2-1 — Demo edits are not discarded when a visitor leaves by the visible My map navigation

**Location:** live `/demo` header **“My map”** link; `src/main.ts` `navigate()` and the `start-real` handler.

The persistent banner says **“Demo — sample data, nothing is saved”** and the landing action says **“Demo changes stay separate.”** The published demo contract goes further: **“Demo changes stay separate from the real map and are discarded on exit.”**

From a fresh mobile context, I added a fifth bed in `/demo`, selected the visible **My map** header link, and arrived at the empty real map (so real data was not changed). Returning to `/demo` showed five beds, not the original four. Only **Start for real** calls `clearDemoGarden()`; ordinary navigation, browser back/forward, and direct route changes can leave the edited demo namespace behind.

This is a blocking sandbox failure. A first-time visitor has a normal, prominently visible way to leave the demo that contradicts the stated discard-on-exit behavior. It also means a later visitor to the same browser can mistake their previous changes for the shipped sample.

**Fix:** route every exit from demo mode through one shared `leaveDemo()` operation that clears `demo:garden` before rendering a non-demo route, including header/footer navigation, browser back/forward, and in-app route changes. Keep `/demo` itself as the sole route that can retain a current demo session. Extend `@claim:demo-isolation` to add a bed, leave using the header **My map** link, then reopen `/demo` and assert the original four-bed sample; also assert that a pre-existing `real:garden` value is unchanged.

### Minor

#### F-2-2 — The headline uses vague, inconsistent names for two mapped records

**Location:** landing `<h1>`: **“Map beds, plants, care, and water”**.

The page elsewhere calls these records **care notes** and **water lines**. “Care” and “water” do not tell a cold visitor whether the app records work, schedules watering, maps plumbing, or gives advice. The wording also breaks the product’s own consistent terminology table.

**Fix:** replace it with **“Map beds, plants, care notes, and water lines”** (eight words). It remains verb-first and under the nine-word headline limit while naming the actual records.

## Copy audit

Word counts treat hyphenated compounds as one word. Headings, buttons, labels, captions, and prose are included because they are visitor-facing copy. No unit exceeds 22 words. No banned marketing adjective or jargon was found. Apart from F-2-2, terms are consistently **bed**, **plant**, **care note**, **water line**, **garden map**, and **season snapshot**; actions use result-naming verbs.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear wordmark |
| Demo | 1 | Clear navigation |
| My map | 2 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Map beds, plants, care, and water | 6 | F-2-2 |
| For small-space gardeners who need every planting and care note tied to its real place. | 15 | Clear audience and outcome |
| Try it with sample data | 5 | Clear first action |
| It opens a complete garden map. | 6 | Clear result |
| Demo changes stay separate. | 4 | Claim; F-2-1 shows the exit behavior is incomplete |
| Start my blank map | 4 | Clear secondary action |
| Private | 1 | Clear fact label |
| Garden data stays in this browser. | 6 | `local-private` claim |
| Offline | 1 | Clear fact label |
| Reopens after your first visit. | 5 | `offline-reload` claim |
| Free core | 2 | Clear fact label |
| Every mapping and export tool is free. | 7 | `free-core-tools` claim |
| Keep the care record on the same map as the garden. | 11 | Clear caption |
| Garden map preview | 3 | Context-free heading |
| Beds, plants, care notes, and water lines share one map. | 10 | Clear product description |
| Each plant keeps its own dated history. | 7 | `care-persistence` claim |
| Water lines: 16.8 m | 4 | `water-total` claim; matches demo |
| How to use the garden map | 6 | Context-free heading |
| Draw each bed | 3 | Clear step |
| Place beds and containers on a simple grid. | 8 | Clear instruction |
| Pin each plant | 3 | Clear step |
| Name the crop and variety where it grows. | 8 | Clear instruction |
| Record each visit | 3 | Clear step |
| Add dated care notes and measure water lines. | 8 | Clear instruction |
| What this tool does not do | 6 | Context-free heading |
| Your notes, not garden advice | 5 | Clear scope heading |
| This tool records what you plant and do. | 8 | Clear scope |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful limit |
| Paid season snapshots | 3 | Context-free heading |
| Save named season snapshots for $12 | 6 | Clear paid result and price |
| The free map includes every core tool and data export. | 10 | `free-core-tools` claim |
| A one-time purchase adds named season snapshots on this device. | 10 | `license-verify` claim |
| $12 one-time purchase | 3 | `season-keeper-checkout` claim |
| Buy the season keeper | 4 | Clear checkout result |
| Restore a license | 3 | Clear recovery action |
| Sociobot and Dodo are the merchant of record. | 8 | Checkout claim covered by the hosted-checkout test |
| Map beds, plant care, and water lines in one place. | 10 | Clear footer description |
| Original generated field-guide artwork | 4 | Useful provenance label |

The concrete preview labels (`Herbs`, `Basil`, `Thyme`, `Salad`, `Lettuce`, `Tomato pots`, `Tomato`, `Bean trough`, `Bean`) are names rather than sentences and are clear.

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Garden Care Map | 3 | Clear title |
| Garden Care Map is an offline field notebook for small-space gardeners. | 11 | Clear product and audience |
| Draw beds, pin plants, record dated care, and measure connected water lines on one map. | 15 | Clear job |
| Try the isolated sample at `/demo`. | 6 | Clear demo entry |
| Demo changes use `demo:garden`; the real map uses `real:garden`. | 11 | Concrete namespace detail; F-2-1 applies to leaving behavior |
| Start for real deletes the demo changes. | 7 | True for that button, but incomplete exit guidance (F-2-1) |
| What it does | 3 | Context-free heading |
| Stores beds, plants, optional note photos, and care history in IndexedDB. | 11 | `local-note-photo` and persistence claims |
| Measures water-line segments in meters or feet and shows their total. | 11 | `water-total` claim |
| Exports the complete garden as JSON and every care note as CSV. | 12 | Export claims |
| Reopens offline after the first complete visit. | 7 | `offline-reload` claim |
| Keeps all normal map use on this device. | 8 | `local-private` claim |
| Verifies existing season keeper licenses through Sociobot billing. | 8 | `license-verify` claim |
| The free map includes all care, mapping, photo, and export tools. | 11 | `free-core-tools` claim |
| A $12 one-time season keeper license adds named season snapshots. | 10 | License and checkout claims |
| Sociobot and Dodo are the merchant of record. | 8 | Hosted-checkout claim |
| Run and test | 3 | Context-free heading |
| Requirements: Node.js 20 or newer. | 6 | Clear requirement |
| Open `http://localhost:5173/demo` for the sample. | 8 | Clear instruction |
| Run the full production and browser test gate. | 8 | Clear instruction |
| Build the deployable static site. | 5 | Clear instruction |
| The exact deploy output is `dist/`, with `dist/index.html` at its root. | 13 | Clear deployment detail |
| Preview it with `npm run preview`. | 6 | Clear instruction |
| Privacy and limits | 3 | Context-free heading |
| Garden data is local to the browser. | 7 | `local-private` claim |
| Export a backup before clearing site data or changing devices. | 10 | Useful recovery instruction |
| The tool records the gardener’s own observations. | 7 | Clear scope |
| It does not identify plants, diagnose disease, predict weather, or recommend pesticides. | 12 | Useful limit |
| See `/privacy` and `/terms` in the built site. | 8 | Clear instruction |
| License | 1 | Context-free heading |
| The source code is available under the MIT License. | 9 | Clear license statement |
| The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`. | 19 | Clear provenance |

## Demo, sandbox, claims, and privacy checks

- One click from the landing action opened `/demo` with a realistic, already-populated map: four beds, five active plants, four water segments, and dated care notes.
- The banner was present and exact: **“Demo — sample data, nothing is saved”**, with **Reset demo** and **Start for real**.
- Reset worked: after adding a fifth bed, **Reset demo** restored four beds. **Start for real** opened the empty real map with no demo banner. The alternate exit defect is F-2-1.
- The direct demo flow recorded only `https://garden-care-map.sociobot.in` requests. The `local-private` and `local-note-photo` claim tests independently made the same same-origin assertion. The offline reload claim passed after service-worker control and offline reload.
- All 12 exact commands in `.factory/claims.json` passed from a fresh clone after `npm ci`: `offline-reload`, `local-private`, `demo-isolation`, `care-persistence`, `free-core-tools`, `json-export`, `csv-export`, `local-note-photo`, `water-total`, `license-verify`, `license-network-origin`, and `season-keeper-checkout`.
- The live landing and README claim-like statements map to those entries. The checkout test verifies the stated $12 price, Sociobot checkout endpoint, and Dodo session target. No extra runtime AI feature or embedded provider key was found.

## Earlier-review verification

Every finding in `.factory/review-1.md` was checked against the deployed build and source, rather than relying on its fixed label.

| Earlier id | Status in this review | Evidence |
| --- | --- | --- |
| F-1-1 | Fixed | All three mobile facts intersect the 390 × 844 cold viewport. |
| F-1-2 | Fixed | Landing preview and demo both show `Water lines: 16.8 m`. |
| F-1-3 | Fixed | `license-network-origin` exists in claims and its exact test passed. |
| F-1-4 | Fixed | No refund assertion appears in live landing, README, or terms. |
| F-1-5 | Fixed | `/`, `/demo`, `/map`, `/privacy`, and `/terms` each set route-specific title, description, canonical, OG, and Twitter fields. |
| F-1-6 | Fixed | Live HTTP 404 has the field-guide shell, legal links, icon links, canonical, and social metadata. |
| F-1-7 | Fixed | Live unknown route has the h1 `Page not found`. |
| F-1-8 | Fixed | The hero mood eyebrow is absent. |
| F-1-9 | Fixed | Preview heading is `Garden map preview`. |
| F-1-10 | Fixed | Preview heading names the section. |
| F-1-11 | Fixed | Preview copy names beds, plants, care notes, and water lines. |
| F-1-12 | Fixed | Section heading is `How to use the garden map`. |
| F-1-13 | Fixed | Limits heading is `What this tool does not do`. |
| F-1-14 | Fixed | Paid label is `Paid season snapshots`. |
| F-1-15 | Fixed | Price heading is `Save named season snapshots for $12`. |

## Structure and delivery checks

- `/`, `/demo`, `/map`, `/privacy`, and `/terms` returned 200; an unknown route returned a real 404. Internal links resolved, the checkout returned the expected 303, and `https://sociobot.in/` returned 200.
- Titles follow the required route patterns; every checked route had one h1, a description, canonical, Open Graph, Twitter card metadata, favicon, and Apple touch icon. The static 404 has the same essentials.
- The common header contains the home wordmark, Demo/My map/Privacy navigation, and a skip link. The common footer has Privacy, Terms, and Built by Param Factory. Deep links, back navigation, focus-on-route-change, keyboard map placement, light/dark axe scans, 200% text, and touch targets passed the shipped suite.
- No console error occurred on the initial cold landing load. The one 404 console event observed during a multi-route audit corresponded to intentionally loading `/missing-page`, whose response was verified as the designed 404.
- No missed leverage finding: JSON and CSV export already cover the brief’s obvious portability need; cloud sync would conflict with the stated local-first model; garden diagnosis or generative AI would add unsupported advice rather than improve the mapping job.

## What would make this perfect

Make all ways of leaving the demo discard its namespace and prove that behavior from a clean browser context. Then use the precise `care notes` and `water lines` labels in the headline. With those two changes, rerun all claim commands and the full browser suite; there should be no remaining review findings.
