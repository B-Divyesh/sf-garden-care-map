# Polish 1 — adversarial review repairs

**Base candidate:** `37a49097a9df6f2b306f2cd067ebf89db5d39811`  
**Repair commit:** recorded in the handoff after push  
**Demo URL:** https://garden-care-map.sociobot.in/demo

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | On phones the copy now precedes artwork; tightened mobile hero spacing keeps all three fact rows in the 390 × 844 viewport. | `all first-screen facts fit in the 390 pixel landing viewport`; `.factory/evidence/polish-1-home-390.png`; live `/` cold check. |
| F-1-2 | Replaced the conflicting landing hose number with the shipped sample value, `Water lines: 16.8 m`. | `landing preview matches the sample water total` and `@claim:water-total`; live `/` and `/demo`. |
| F-1-3 | Added the narrow `license-network-origin` claim and recorded-fixture request-origin test. | `@claim:license-network-origin license checks contact only Sociobot`; live `/map?license=…` route check. |
| F-1-4 | Removed the unverified refund assertion from landing, README, and terms copy. | `rg -n "Refunds are handled" README.md src public` returns no visitor copy; live `/`, `/terms`. |
| F-1-5 | Added per-route metadata for title, description, canonical, Open Graph, and Twitter values. | `every application route sets complete route metadata`; live `/demo`, `/map`, `/privacy`, `/terms`. |
| F-1-6 | Rebuilt the static HTTP-404 with wordmark, nav, footer, legal links, icons, canonical, description, and social metadata. | `the static 404 has the required product shell and metadata`; `.factory/evidence/polish-1-404.png`; live unknown-path HTTP check. |
| F-1-7 | Changed the dynamic and static 404 `<h1>` to `Page not found`. | static-404 regression test; live unknown-path check. |
| F-1-8 | Removed the mood-only hero eyebrow. | `.factory/copy-audit.md`; live `/`. |
| F-1-9 | Replaced `The product` with `Garden map preview`. | `.factory/copy-audit.md`; live `/`. |
| F-1-10 | Replaced the vague preview heading with `Garden map preview`. | `.factory/copy-audit.md`; live `/`. |
| F-1-11 | Replaced `Each mark has a place` with concrete garden-map terminology. | `.factory/copy-audit.md`; live `/`. |
| F-1-12 | Replaced the slogan heading with `How to use the garden map` and removed its redundant eyebrow. | `.factory/copy-audit.md`; live `/`. |
| F-1-13 | Replaced the boundary eyebrow with `What this tool does not do`. | `.factory/copy-audit.md`; live `/`. |
| F-1-14 | Replaced `Optional season keeper` with `Paid season snapshots`. | `.factory/copy-audit.md`; live `/`. |
| F-1-15 | Replaced the unnatural price heading with `Save named season snapshots for $12`. | `.factory/copy-audit.md`; live `/`. |

Earlier review findings remain covered by the existing regression suite: checkout redirect, import validation and recovery, immediate-save persistence, invalid-license feedback, touch targets, 200% text layout, demo discard, real 404 status, skip link, asset caching, contrast, and offline reload.
