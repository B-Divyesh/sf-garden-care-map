# Garden Care Map

Garden Care Map is an offline field notebook for small-space gardeners. Draw beds, pin plants, record dated care, and measure connected water lines on one map.

Try the isolated sample at `/demo`. Demo changes use `demo:garden`; the real map uses `real:garden`. **Start for real** deletes the demo changes.

## What it does

- Stores beds, plants, optional note photos, and care history in IndexedDB.
- Measures water-line segments in meters or feet and shows their total.
- Exports the complete garden as JSON and every care note as CSV.
- Reopens offline after the first complete visit.
- Keeps all normal map use on this device. License checks contact only Sociobot.
- Verifies existing season keeper licenses through Sociobot billing.

The free map includes all care, mapping, photo, and export tools. A valid season keeper license adds named season snapshots. New sales are paused until the factory enables checkout.

## Run and test

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/demo` for the sample.

Run the full production and browser test gate:

```sh
npm test
```

Build the deployable static site:

```sh
npm run build
```

The exact deploy output is `dist/`, with `dist/index.html` at its root. Preview it with `npm run preview`.

## Privacy and limits

Garden data is local to the browser. Export a backup before clearing site data or changing devices. The tool records the gardener’s own observations. It does not identify plants, diagnose disease, predict weather, or recommend pesticides.

See `/privacy` and `/terms` in the built site.

## License

The source code is available under the MIT License. The generated field-guide artwork is original to this product; its prompt and provenance are recorded in `.factory/design.md`.
