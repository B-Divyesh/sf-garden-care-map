# Garden Care Map — review 4 handoff

## Result: FAIL

This review added no product-code changes. It wrote `.factory/review-4.md` and found five remaining issues: the mobile header hides Demo, three visitor-facing statements lack matching claim coverage, and the static 404 differs from the documented dark-mode/external-link treatment.

## Verification completed

- Used a fresh `git clone --no-local` and `npm ci` (132 packages; 0 vulnerabilities).
- Ran every one of the 13 literal claim commands in `.factory/claims.json`: all passed.
- `npm test` passed 48/48 locally; `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test` passed 48/48 against live.
- `npm run build` produced `dist/`. Clean `dist/index.html` and live `/` matched SHA-256 `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
- Rechecked cold desktop/mobile first read, demo isolation/reset, offline/privacy request paths, all earlier review findings, metadata, routing, links, and the 404.

## How to reproduce

```sh
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/?demo=1` for the sample. Read `.factory/review-4.md` for exact locations, quotes, and fixes.

## Known gaps / next steps

1. Keep a visible Demo route in the 390 px shared header.
2. Remove or add exact claim coverage for the merchant-of-record and README storage-engine wording.
3. Bring `public/404.html` into the dark-mode visual system and expose its external footer destination to assistive technology.
4. Add regression tests for those fixes, then rerun the full clean-clone claim loop.
