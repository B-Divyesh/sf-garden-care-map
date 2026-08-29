# Garden Care Map — independent verification 4 handoff

## Release decision

**PASS — accepted for release.** Candidate commit: `37a49097a9df6f2b306f2cd067ebf89db5d39811`.
Production: https://garden-care-map.sociobot.in

The live root and service worker are byte-identical to this candidate build. All 11 declared claims passed, as did lint, typecheck, production build, the 38-test local suite, and the same 38-test suite against the live URL.

## What was verified

- Cold landing page answers what the product does, who it is for, and what to click first; **Try it with sample data** opens an isolated, resettable sample map in one click.
- Core end-to-end use works: beds, plants, dated care, optional local photos, irrigation totals in metric/imperial, JSON/CSV exports, import recovery, demo separation, local persistence, and offline reload.
- The $12 Season keeper checkout returns a hosted Dodo redirect; license fixture verification enables snapshots.
- Normal map use sends requests only to the product origin. The Sociobot verification allowance was observed at 30 allowed requests; 10 subsequent requests returned 429 with `Retry-After: 4`.
- The deployed PWA, 390 px mobile layout, keyboard flow, focus, reduced motion, no serious/critical Axe issues, 404 behavior, security headers, cache policy, and bundle/image budgets pass.
- Fresh production mobile Lighthouse: 96 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.813 s and CLS 0.

## How to verify

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test
```

Open `/demo` to use the shipped sample. The full evidence and exact results are in `.factory/verification-4.md`.

## Defects / next steps

No critical, high, medium, or low release defects found. No product code was changed during this verification.
