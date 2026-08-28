# Independent verification 3 — FAIL

**Candidate:** `256bc038e441d0d94e419fce1cadc061b04e5590`  
**Live URL:** https://garden-care-map.sociobot.in  
**Verified:** 2026-08-28  
**Decision:** **FAIL — do not release this candidate.**

The candidate and deployment are byte-identical, and the free garden-map workflow is broadly functional. Release is blocked because the advertised $12 purchase returns a 404, a malformed import can persist corrupt data and leave the app blank on every reload, and core mobile map targets are far below the required 44 px size. A smaller persistence race can also lose a just-submitted care note.

## Release-blocking defects

### High — the advertised $12 checkout is still a dead link

The landing page and map settings offer **Buy the season keeper** at:

```text
https://api.sociobot.in/api/v1/products/garden-care-map/checkout
```

A fresh direct request at 17:10 UTC returned:

```text
HTTP/2 404
{"error":"enabled factory product","status":404}
```

The pilot endpoint returned the same HTTP 404 and body in a separate fresh request.

The visible one-time purchase cannot start. This fails the researched monetization contract and the paid-unlock end-to-end requirement. It is the same external billing-registration failure previously reported; fresh evidence shows it has not cleared.

The `season-keeper-checkout` claim test passes only because it checks the anchor's `href`. It does not follow the link or assert a hosted checkout response, so it does not prove the stated claim that checkout opens. The independent link crawl records the 404 in [link-check.json](evidence/verification-3-live/link-check.json).

### High — a structurally invalid import is persisted and bricks the map

The import validator checks only that four top-level properties are arrays. It does not validate array members before replacing and saving the current garden.

Fresh live reproduction in an isolated browser:

1. Open `/map`.
2. Import valid JSON whose `beds` value is `[null]` and whose other required arrays are empty.
3. Accept the replacement confirmation.
4. The existing screen remains and reports “Import failed. Choose a Garden Care Map JSON export.”
5. Reload `/map`.

After reload the page has no `<main>` and no `<h1>` and raises:

```text
Cannot read properties of null (reading 'id')
```

The invalid value was saved to `real:garden` before rendering failed. The blank screen offers no recovery; the user must clear site data or edit IndexedDB externally. A valid exported garden imported successfully as a control (four beds, no errors). Exact evidence is in [independent-functional.json](evidence/verification-3-live/independent-functional.json).

### High — core mobile touch targets are below 44 px

At the required 390 × 844 viewport:

| Target | Measured rendered size |
| --- | ---: |
| Reset demo | 101.4 × 32 px |
| Start for real | 110.8 × 32 px |
| Plant map items | approximately 54–70 × 28.3 px |
| Horizontal water segment | 167.4 × 7.4 px |

The plant and irrigation targets are core map controls for a mobile gardening tool, not incidental links. Keyboard placement works, but it does not repair touch use. This fails the attached accessibility and design requirement that touch targets be at least 44 × 44 CSS px. The measurements and screenshot are in [independent-functional.json](evidence/verification-3-live/independent-functional.json) and [demo-mobile.png](evidence/verification-3-live/demo-mobile.png).

## Other defects

### Medium — an immediate reload can lose a submitted care note

The interface always says **Saved locally**. Saving is asynchronous, but it never exposes a pending state or disables navigation. In five fresh live trials that clicked **Save care note** and immediately reloaded, one note was lost. All three controls that waited until the saved note appeared before reloading persisted correctly.

A separate canonical local `npm test` run also failed this same claim once (31/32); a second full run and 10 focused repeats passed. This independently confirms a nondeterministic boundary rather than a stable test failure.

This is a narrow race, but it concerns the product's main personal record. Evidence is in [invalid-recovery.json](evidence/verification-3-live/invalid-recovery.json).

### Medium — invalid license restore hides its recovery message

In live map settings, an invalid token received HTTP 200 with `{valid:false, reason:"invalid"}`. The app immediately re-rendered and hid settings, leaving no visible “not active” message. The user cannot tell whether the token was rejected or what to do next. The status text is replaced by the map re-render at `src/main.ts:411`.

### Medium — 200% mobile text sizing causes header overflow

At a 195 CSS-pixel viewport, equivalent to 200% zoom on a 390 px phone, both `/` and `/demo` measured `scrollWidth=206` with `innerWidth=195`. The header navigation extended 11 px beyond the viewport and clipped part of **Privacy**. The normal 390 px layout does not overflow.

### Low — axe reports a moderate landmark issue on the map routes

Axe reports `landmark-complementary-is-top-level` on `/demo` and `/map` in both themes because `.field-notes` is an `<aside>` nested within `<main>`. There are **zero serious or critical** axe findings. See [axe-summary.json](evidence/verification-3-live/axe-summary.json).

## Required claims

`.factory/claims.json` exists with 11 entries. The literal pre-install invocation from the clean checkout stopped at `tsc: not found` for every command, as expected before dependencies existed. After the required `npm ci`, every exact command was run separately and passed:

| Claim ID | Result after clean install |
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
| `license-verify` | PASS with recorded fixture |
| `season-keeper-checkout` | Automated test PASS, but real outcome FAILS with HTTP 404 |

The checkout test is insufficient under the claims contract because it asserts only link presence, not the promised result.

## First-read gate — PASS

On a cold live load at desktop and 390 px, the first screen answers all three questions in plain words:

- What it does: **“Map beds, plants, care, and water.”**
- Who it is for: **“For small-space gardeners…”**
- What to do first: **“Try it with sample data.”**

The adjacent copy says the action opens a complete garden and keeps demo changes separate. One click opens a realistic four-bed, five-plant sample with notes and irrigation. The persistent demo banner includes **Reset demo** and **Start for real**; leaving demo discards its changes.

## Successful verification evidence

### Clean build and repository gates

- `npm ci`: PASS; 132 packages installed, 0 vulnerabilities.
- `npm test`: PASS; 32/32 tests.
- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS; `dist/` produced.
- Every claims command: 11/11 PASS after install.
- The full 32-test suite also passes against the deployed URL.

### Functional, boundary, and recovery paths

- Representative demo care note, four beds, five plants, water totals, metric/imperial conversion, JSON export, CSV export, demo reset/discard, and license-fixture snapshot flow: PASS.
- Valid exported JSON imported into an empty map: PASS; four beds restored.
- A 240-character care note is accepted; confirmed saves persist.
- Blank required note: blocked by native validation with “Please fill out this field.”
- 1,500,001-byte photo: rejected without a note, with the documented 1.5 MB recovery message.
- Syntactically invalid JSON: rejected without changing the sample.
- Structurally invalid JSON: **FAIL**, as detailed above.

### Accessibility and responsive behavior

- Independent axe scans on `/`, `/demo`, `/map`, `/privacy`, `/terms`, and `/missing-page` in light and dark modes: zero serious/critical findings.
- `lang="en"`, route-specific title, one `<h1>`, `<main>`, image alt text, form labels, skip link, visible 3 px focus treatment, keyboard bed placement, history focus restoration, and reduced-motion duration (`0.00001s`): PASS.
- Desktop and 390 px layouts have no horizontal overflow. Screenshots: [desktop](evidence/verification-3-live/screenshot-desktop.png), [mobile](evidence/verification-3-live/screenshot-mobile.png).
- Required 44 px touch sizing: **FAIL**, as detailed above.

### PWA, privacy, network, and API policy

- Live service-worker-controlled `/demo` reloads offline and retains the sample; the offline state is visible.
- The installed-worker update path displays “An update is ready. Reload to use it.” in the live suite.
- Manifest has standalone display, versioned start URL, 192/512 icons, and a maskable icon.
- Normal landing and demo-map activity contacted only `https://garden-care-map.sociobot.in`; no third-party fonts or scripts loaded. License verification intentionally contacts only `api.sociobot.in`.
- Invalid license verification returns HTTP 200 with `{valid:false, reason:"invalid"}` and `Cache-Control: no-store`.
- Rate-limit burst: 40 concurrent verification requests produced **30 × 200** and **10 × 429**. Every 429 included `Retry-After: 3`; observed threshold was 30 requests in the active window.
- No sign-in exists, so the Entra tenant requirement is not applicable.

### Performance, response policy, and deployment identity

- Fresh Lighthouse mobile report: performance **99**, accessibility **100**, LCP **1.814 s**, CLS **0**, TBT **2 ms**. Lighthouse wrote the complete report before Chromium emitted a post-audit tab-crash warning. See [lighthouse.json](evidence/verification-3-live/lighthouse.json).
- Three additional identical live Lighthouse runs scored performance **86, 93, and 90** (median **90**), with LCP 1.7–1.8 s, CLS 0, and accessibility/best practices/SEO 100. This meets the median threshold but shows synthetic TBT variance.
- Bundle measurements: inline JS 33,431 bytes / 11,533 gzip; CSS 16,043 bytes / 4,640 gzip; no fonts; mobile hero 58,388 bytes. All stated budgets pass.
- Root HTML and service worker are byte-identical between candidate build and live deployment:
  - `dist/index.html`: SHA-256 `5d16e30eee707eca6e72a75fbebc0355c255523f4bf1ac906a0fb487a8d0e50e`, 51,252 bytes.
  - `sw.js`: SHA-256 `635eea418fa6a08a5776eeb6511ae2d87f5ecfc3b02da9c1db2faadf02fbb96f`, 1,641 bytes.
- Live `/`, `/demo`, `/map`, `/privacy`, and `/terms`: HTTP 200. `/missing-page`: real HTTP 404.
- HTML, service worker, and manifest use `Cache-Control: no-cache`; the versioned mobile hero uses `public, max-age=31536000, immutable`.
- Live headers include HSTS, nosniff, strict-origin referrer policy, restricted camera/microphone/geolocation permissions, and a CSP limited to self plus the Sociobot billing API.
- `/opt/fleet/lib/verify-url.sh` found no page or console errors on the normal landing route; its output is [verify.json](evidence/verification-3-live/verify.json).

## Required next steps

1. Register and enable `garden-care-map` in Sociobot billing, then test a real hosted checkout redirect and staged purchase-return flow. Strengthen the claim test to follow the link and assert that result.
2. Validate the full imported schema before assignment or persistence. Preserve the current garden on every import error and provide an in-app recovery path for already-corrupt storage.
3. Add 44 × 44 hit areas around plant and irrigation marks and restore 44 px demo-banner actions without changing the visual marks.
4. Show a real saving state and prevent route/reload loss until IndexedDB commits.
5. Keep invalid-license feedback visible and announced; remove header overflow at 200% text size.
6. Replace or restructure the nested complementary landmark to clear the remaining moderate axe issue.
