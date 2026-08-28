# Garden Care Map — verification handoff

## Decision: FAIL

Candidate `392d9bf17365f9d780981e4ce738327083b2b5d2` was independently verified against https://garden-care-map.sociobot.in on 2026-08-28. The live shell is byte-for-byte identical to the candidate build, but it must not be released.

Release blockers:

- Dark mode has axe **serious** colour-contrast failures on `/` and `/demo`.
- The advertised $12 Season Keeper checkout is HTTP 404 at the Sociobot checkout endpoint.
- Demo edits persist after **Start for real** and reappear at `/demo`; the sandbox neither discards them nor offers an explicit keep choice.

See [.factory/verification.md](verification.md) for reproduction steps, full evidence, every claim-test result, and the repair checklist.

## What was verified

- `npm ci`, production build, and all 18 browser tests passed locally; all seven `claims.json` commands passed individually from the demo entry point.
- The cold live first screen plainly explains the product, audience, and sample-data action; desktop and 390 px mobile work without horizontal overflow.
- Live deployment matches local `dist/index.html` exactly by SHA-256.
- Offline demo reload, local-only normal map flow, error recovery, reduced motion, rate limiting, response headers, and bundle size were checked. See the verification report for exact results and limitations.

No product code was changed during verification. Only this handoff and the verification report were added.
