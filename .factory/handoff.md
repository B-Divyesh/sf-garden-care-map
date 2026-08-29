# Garden Care Map — review 2 handoff

## Result

Completed the requested adversarial, read-only review of the deployed product. Product source was not changed.

The review is **FAIL** with two findings recorded in `.factory/review-2.md`:

- **F-2-1 (blocking):** demo edits remain in `demo:garden` when the visitor leaves through the visible **My map** navigation, despite the discard-on-exit contract.
- **F-2-2 (minor):** the landing headline abbreviates the product records as “care” and “water” rather than the established “care notes” and “water lines.”

## Verification performed

- Cold live checks at 390 × 844 and 1440 × 900.
- One-click demo, realistic sample, reset, Start for real, real-storage isolation, and the failing ordinary-navigation exit path.
- Live route/metadata/404/link crawl and request-origin inspection.
- Earlier review and polish findings checked against live behavior and source; all F-1 findings are fixed.
- Fresh clone at `/tmp/garden-care-map-review-2.MJ1L8r`, followed by `npm ci`.
- Every exact command in `.factory/claims.json` passed individually.
- `npm test` was run from that clone; the suite passed its shipped checks, including all 12 claim tests, accessibility, mobile, routing, and regression coverage.

## Next step

Repair F-2-1 before treating the demo as isolated. Add the suggested navigation-exit assertion to `@claim:demo-isolation`, then rerun the claim commands and full suite. No deployment action was taken in this review.
