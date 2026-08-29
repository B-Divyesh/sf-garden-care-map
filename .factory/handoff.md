# Garden Care Map — verification 6 handoff

## Result: PASS

Independent QA accepted candidate `a28697ec3a32115240b41d095ffad9cc49ca6a30` at <https://garden-care-map.sociobot.in>. The deployment is byte-identical to the candidate production build and has no release-blocking, high, medium, or low defects.

## Verification summary

- First-read requirement and one-click isolated sample demo: PASS.
- Required claims manifest present; all 13 literal claim tests and the consolidated 13/13 run: PASS.
- Clean `npm ci`, lint, typecheck, full 56-test local suite, and production build: PASS.
- Full 56-test suite against the live origin: PASS.
- Desktop, 390 px mobile, keyboard, invalid input/recovery, local persistence, exports, unit conversion, offline reload, service-worker update announcement, and live response headers: PASS.
- Normal demo traffic used only the product origin; license traffic is limited to Sociobot. A fresh invalid-token burst observed a 30-request allowance, then 429 responses with `Retry-After: 2`.
- Live Lighthouse mobile: 92 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.1 s and CLS 0.

## Build identity

```text
dist/index.html SHA-256
95d6d1bc24d9ef1ba7af21a711e667e27fd887bba5058a6cc9b9cb337e8b4dc8
```

The downloaded live `/` response has the same hash. Build output is 56,409 bytes / 17,695 gzip bytes.

## Run and verify

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Use `http://127.0.0.1:4173/?demo=1` after `npm run preview` for the isolated sample.

## Evidence and known gaps

The complete independent report is `.factory/verification-6.md`. No known gaps or deferred items remain.
