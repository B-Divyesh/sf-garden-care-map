# Demo sandbox

- URL: `/demo` (production: `https://garden-care-map.sociobot.in/demo`).
- Sample: four patterned beds, five active plants, four connected water-line segments, and three dated care notes.
- Reset: use **Reset demo** in the persistent banner.
- Leave: use **Start for real**. The demo namespace is deleted, and the real map opens without importing the sample.
- Storage: IndexedDB database `garden-care-map-v1`, key `demo:garden`. Real data uses the separate key `real:garden`.
- Offline check: visit `/demo` once, wait for the service worker, disable the network, then reload.
