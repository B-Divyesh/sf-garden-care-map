# Demo sandbox

- URL: `/?demo=1` (production: `https://garden-care-map.sociobot.in/?demo=1`). `/demo` is the readable alias.
- Sample: four patterned beds, five active plants, four connected water-line segments, and three dated care notes.
- Reset: use **Reset demo** in the persistent banner.
- Leave: use **Start for real**, navigation, or browser history. Every exit deletes the demo namespace without changing the real map.
- Storage: IndexedDB database `garden-care-map-v1`, key `demo:garden`. Real data uses the separate key `real:garden`.
- Offline check: visit `/?demo=1` once, wait for the service worker, disable the network, then reload.
