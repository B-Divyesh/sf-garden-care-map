# Independent verification — FAIL

**Candidate:** `392d9bf17365f9d780981e4ce738327083b2b5d2`  
**Live URL:** https://garden-care-map.sociobot.in  
**Verified:** 2026-08-28

## Release decision

**FAIL. Do not release this candidate.** The product has serious dark-mode accessibility failures, its advertised paid checkout is a dead 404, and its demo does not discard edits when the user leaves demo mode. The live deployment is byte-identical to the candidate build.

## Blocking defects

### Critical — dark mode has axe serious contrast failures

On the live site with `prefers-color-scheme: dark`, axe reports `color-contrast` with **serious** impact.

- `/`: the “How it works” eyebrow and step numbers are 1.82:1; step descriptions are 1.27:1. The dark token makes `.steps` light while its hard-coded light text remains light. See [src/style.css](../src/style.css#L5).
- `/demo`: the persistent demo banner, Reset demo, and Start for real are 3.38:1 (white on `#af851e`).

This fails the 4.5:1 text requirement in both themes and the no-serious/critical-axe gate.

### High — advertised paid checkout is unavailable

The live primary paid action points to `https://api.sociobot.in/api/v1/products/garden-care-map/checkout` from [src/main.ts](../src/main.ts#L106). A fresh GET returned:

```text
HTTP 404
{"error":"enabled factory product","status":404}
```

Visitors are offered a `$12 one-time purchase` but cannot begin it. This is a dead visible product link; the purchase path is not end-to-end.

### High — demo changes are retained after leaving demo

The demo stores changes under `demo:garden` (separate from real data), but **Start for real** only routes to `/map`; it does not clear demo storage or offer to keep it. See [src/main.ts](../src/main.ts#L31) and [src/storage.ts](../src/storage.ts#L18).

Live reproduction in a fresh browser context:

1. Open `/demo`: 4 beds.
2. Add a bed: 5 beds.
3. Select **Start for real**: real map has 0 beds.
4. Open `/demo` again: still 5 beds.

The sandbox contract requires demo data to be discarded on exit, or an explicit one-time “keep this as my data” choice. The current banner says “nothing is saved,” making the retained demo edit misleading.

## Other defects

### Medium — unknown routes return HTTP 200, not a real 404

`https://garden-care-map.sociobot.in/missing-page` returns the SPA shell with HTTP 200. It eventually renders the styled in-app 404, but crawlers and direct clients receive success. `navigationFallback` in [public/staticwebapp.config.json](../public/staticwebapp.config.json#L2) catches it before the response override.

### Medium — first forward Tab skips the skip link

Initial render programmatically focuses the `h1` ([src/main.ts](../src/main.ts#L418)). On a cold live load, the first forward Tab then lands on **Try it with sample data**, not the preceding “Skip to main content” link.

### Low — deployed static assets are only cached for 30 seconds

The live HTML, service worker, manifest, and image asset all send `Cache-Control: public, must-revalidate, max-age=30`. No immutable static-asset caching is configured, though the service worker did provide offline reload.

## Required claim tests — PASS

`.factory/claims.json` exists and has seven entries. I ran every exact listed command against the clean candidate demo entry point before the wider suite; all passed.

| Claim ID | Exact command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `local-private` | `npm test -- --grep @claim:local-private` | PASS |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS — it covers real-map isolation, not discard on exit |
| `care-persistence` | `npm test -- --grep @claim:care-persistence` | PASS |
| `csv-export` | `npm test -- --grep @claim:csv-export` | PASS |
| `water-total` | `npm test -- --grep @claim:water-total` | PASS |
| `license-verify` | `npm test -- --grep @claim:license-verify` | PASS with a recorded valid response |

## First-read test — PASS

Cold-loaded live `/` at desktop and 390 px mobile. In plain words it says it maps beds, plants, care, and water; names small-space gardeners as the audience; and offers a visible first-screen **Try it with sample data** button with the immediate outcome (“It opens a complete garden map”). The button opened the realistic four-bed sample in one click. No console or page errors occurred on this cold load.

## Verification completed

### Build and automated tests

- `npm ci`: pass; 30 packages audited, 0 vulnerabilities.
- `npm run build`: pass. `dist/index.html` is 50.41 kB / 16.22 kB gzip, below the 200 kB initial-JS budget; the mobile hero is 58,388 bytes WebP.
- Full browser suite: 18/18 pass when run as its three files: accessibility 7, claims 7, mobile 4. The split avoids an evaluator command time cap; it is the same `npm test` suite.
- No separate lint script exists; `tsc` runs as part of the production build.
- The repository’s default-scheme axe tests pass. The independent dark-scheme axe run above found the blocking serious issues, so that suite is insufficient.

### Functional and recovery paths

- Exercised representative beds, plants, care notes, irrigation total, metric-to-imperial conversion, JSON export/import, and CSV download.
- Invalid JSON recovers with “Import failed. Choose a Garden Care Map JSON export.”
- A 1,500,001-byte photo is rejected without saving: “The photo is over 1.5 MB. Choose a smaller photo.”
- The live `/demo` service worker became active. With browser network disabled, reload retained “Courtyard kitchen garden” and displayed “Offline — changes still save.”
- Reduced-motion mode sets water-line animation duration to `0.00001s`.
- The source contains `skipWaiting`, `clientsClaim`, and an update notice. A forced synthetic update was inconclusive; recheck this on the repair deployment.

### Privacy, network, and response policy

- Cold landing and normal demo-map flows made same-origin requests only. Garden operations use IndexedDB; demo and real namespaces are distinct.
- No third-party fonts or scripts load. License verification is the intentional external request and targets `api.sociobot.in`.
- Invalid-license verification returned 200 with `{ "valid": false, "reason": "invalid" }`.
- Rate limiting exists: a 40-request concurrent invalid-license burst returned 30 × 200 and 10 × 429 with `Retry-After: 4`; a follow-up burst remained throttled with `Retry-After: 3`.
- Live policy includes HSTS, nosniff, strict-origin-when-cross-origin, camera/microphone/geolocation Permissions-Policy, and CSP restricted to self plus the billing API.

### Deployment identity and presentation

- SHA-256 matched exactly: local `dist/index.html` and fetched live `/` were `f4269bbaf55eb056861e2d314ad11fd2586375f6ed21f0a6d81bf6a271ac1462` (50,408 bytes).
- Desktop and 390 px screenshots were reviewed: the botanical field-guide treatment is product-specific, legible, and has no horizontal overflow.
- Semantic basics at the default theme pass: `lang=en`, one `h1`, `main`, title, meaningful hero alt text, responsive viewport, focus styling, privacy/terms routes, and no load-time console errors.

## Repair and re-verification checklist

1. Repair dark-theme colour tokens/components and run axe in both schemes across every route until serious/critical findings are zero.
2. Register and enable the Sociobot product; prove checkout reaches a hosted checkout page and complete the test-mode purchase/restore path.
3. On **Start for real**, delete the demo namespace or present an explicit one-time keep/discard choice. Add a claim test that edits demo data, exits, and re-enters `/demo`.
4. Preserve initial focus for the skip link; move focus to the `h1` only after later client-side route changes.
5. Return HTTP 404 for unknown paths and configure immutable caching for versioned static assets.
