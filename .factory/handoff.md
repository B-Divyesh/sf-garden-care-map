# Garden Care Map — polish 2 handoff

## Result

Perfection-loop round 2 is complete. All 17 cumulative findings from `review-1.md` and `review-2.md` are fixed and rechecked on the live deployment. No known product, test, accessibility, privacy, offline, routing, or deployment gap remains.

The garden-specific botanical field-guide visual system is unchanged. The artifact remains a static, local-first offline PWA.

## What changed

- Rewrote the first-screen h1 to `Map beds, plants, care notes, and water lines` and aligned metadata, footer terminology, copy audit, and the 83-character verb-first catalog description.
- Made `/?demo=1` the one-click sample entry while retaining `/demo` as an alias.
- Added one shared demo-exit operation for My map, legal/footer navigation, browser back/forward, Start for real, and outbound links.
- Cold demo entry now restores the original four-bed sample. Reload keeps the current temporary demo session for offline and persistence checks.
- Expanded `@claim:demo-isolation` to prove that all tested exits discard demo edits and preserve a pre-existing real map.
- Updated `.factory/claims.json`, `.factory/demo.md`, README, service-worker shell/cache version, route canonical metadata, release version, and cumulative regression coverage.
- Rechecked all round-1 wording, metadata, real 404, legal links, mobile layout, claim coverage, checkout, import recovery, touch targets, immediate persistence, and license feedback fixes.

The full finding map is in `.factory/polish-2.md`.

## Exact verification evidence

Repair commit deployed: `1811f947279b94c3a3c6d6a775c034a113ca6005`.

Clean clone: `/tmp/garden-care-map-polish-2-claims.sCaGTM` at the repair commit.

- `npm ci`: passed; zero vulnerabilities.
- Every exact `.factory/claims.json` command: 12/12 passed individually.
- `npm test` in the clean clone: 48/48 passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- Work-order build command `npm ci && npm test && npm run build`: passed.
- Build output: `dist/index.html`, 56,498 bytes and 17.91 kB gzip.
- CSS: 20,641 bytes raw and 5,098 bytes gzip.
- Mobile hero image: 58,388 bytes.

Accessibility and browser coverage includes light and dark Axe checks on `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, `/terms`, and the real 404; keyboard skip/focus/history; 44 px controls; 200% text; 390×844 layout; labels; alt text; and reduced-motion CSS. There were zero serious or critical Axe findings.

Privacy and offline coverage includes same-origin request recording during normal demo use and local photo use, the narrow Sociobot-only license check, service-worker control, browser offline mode, and a successful offline reload.

Local Lighthouse mobile results:

- Performance: 99
- Accessibility: 100
- Best practices: 100
- SEO: 100
- LCP: 2.0 s
- CLS: 0
- Total blocking time: 110 ms

## Deployment and cold production check

Deployment command:

```sh
/opt/fleet/lib/deploy-static.sh garden-care-map dist
```

Azure Static Web Apps deployment: `1797fb20-06ff-4791-a58a-f997c1c2b2e3`.

Live URLs:

- Product: https://garden-care-map.sociobot.in/
- Demo: https://garden-care-map.sociobot.in/?demo=1
- Readable demo alias: https://garden-care-map.sociobot.in/demo

Post-deploy evidence:

- `PLAYWRIGHT_BASE_URL=https://garden-care-map.sociobot.in npm test`: 48/48 passed.
- `verify-url.sh` on `/` and `/?demo=1`: HTTP 200, no console errors, one h1, main landmark, `lang=en`, no missing alt text, and no unnamed buttons.
- `/`, `/?demo=1`, `/demo`, `/map`, `/privacy`, and `/terms`: HTTP 200.
- `/missing-page`: HTTP 404 with the designed product shell.
- CSP, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers are present.
- Live root and local build SHA-256 match: `11fd7a26f8cd6cfff055279f1acd2d17ca085159c47cf657084b7d044e19af3c`.
- Screenshots and verifier JSON: `.factory/evidence/polish-2-live/`.

## Run locally

```sh
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/?demo=1` for the isolated sample.

## Known gaps and next steps

None for this work order.
