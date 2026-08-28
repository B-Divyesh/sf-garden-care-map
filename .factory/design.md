# Garden Care Map — visual thesis

## Direction

**Botanical field guide, marked up in the garden.** The product should feel like a durable field notebook opened beside a raised bed: warm paper, precise ink, pressed-leaf shapes, survey lines, and small handwritten annotations. It must not resemble a dashboard or a decorative landscape planner. The map is the main artifact; controls recede like notes in its margin.

## Palette

Light mode is the primary treatment because the map behaves like paper. Dark mode becomes a night field notebook rather than an inverted website.

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--paper` | `#F4F0E2` | `#171C18` | page and map ground |
| `--paper-raised` | `#FFFDF5` | `#222A23` | sheets, dialogs, controls |
| `--ink` | `#243229` | `#F2F0E5` | primary text and map outlines |
| `--ink-muted` | `#536259` | `#BBC5BB` | secondary text |
| `--leaf` | `#315C40` | `#83B78C` | primary action and focus |
| `--leaf-contrast` | `#FFFFFF` | `#102016` | action text |
| `--clay` | `#A8432E` | `#E08A71` | irrigation and urgent marks |
| `--mustard` | `#B48116` | `#E3BD5F` | notes and selected state |
| `--line` | `#A8AC98` | `#526057` | rules and grid |
| `--success` | `#23633B` | `#8CC89A` | saved state |
| `--warning` | `#8B5700` | `#F1C46B` | offline and license notices |
| `--danger` | `#9A3329` | `#FF9A8C` | destructive actions |

Bed identities use pattern plus color: sage diagonal hatch, clay dots, mustard crosshatch, and blue-green rings. No state depends on hue alone.

## Type and spacing

- Display: Georgia with a self-hosted/system serif fallback. It gives headings the authority of printed plant plates.
- Body and controls: system sans (`Inter`-like platform stack), selected for legibility and zero font payload.
- Numerical measurements use tabular figures.
- Type steps: 14, 16, 18, 24, 34, 52 px with 1.45–1.6 line height for reading text.
- Spacing follows an 8 px base: 4, 8, 12, 16, 24, 32, 48, 72 px.
- Borders are 1.5 px ink lines. Corners are clipped or softly irregular (4–12 px), like field labels rather than generic floating cards.

## Layout and interaction grammar

- The landing page reads as an open field-guide spread: instructions in the left margin and the living map plate on the right.
- The app is map-first. A compact tool rail sits above a coordinate grid; a field-note drawer holds selections and care history.
- Adding beds and irrigation happens directly on the canvas. Keyboard users choose a tool, then use arrow keys and Enter to position and size map objects.
- Buttons are solid ink or ruled paper controls. Links remain underlined. Tool selection uses shape, label, and a checked state.
- Mobile drops the two-column spread. The map remains first; the notes drawer follows without hiding core actions.

## Shape and asset plan

- Original hero: a top-down botanical field-guide plate of four small raised beds, terracotta pots, a coiled irrigation hose, seed labels, and pressed herbs on warm paper. It supports the garden-mapping concept without pretending to be a screenshot.
- Authored SVG icons: sprout wordmark, bed, water line, note, export. These are simple interface symbols, not generated raster art.
- Social preview composes the same hero plate with live HTML/CSS type so required text never lives in the art.
- PWA icons use the authored sprout-and-grid mark for clarity at small sizes.

## Motion policy

The signature motion is a **pencil trace**: a newly placed irrigation line draws from its origin over 220 ms, while a new care note settles with a 160 ms downward fade. Map pan and selection use direct, short transforms. Nothing loops. Under `prefers-reduced-motion: reduce`, lines and notes appear instantly and all smooth scrolling is disabled.

## Generated asset prompt sheet

- Use case: `illustration-story`
- Subject: top-down small-space garden plan with four raised beds, terracotta containers, young edible plants, plant labels without readable writing, and a simple red irrigation hose connecting the beds.
- World: a practical gardener's botanical field notebook; informative, intimate, used outdoors.
- Medium: hand-painted gouache and colored pencil with crisp botanical plate detail and subtle paper grain.
- Composition: landscape 3:2, garden clustered to the right and center, calm negative paper space at upper left, no border.
- Light: soft overcast daylight; quiet and observational.
- Palette words: warm flax paper, deep herb green, terracotta, old mustard, graphite.
- Avoid: text, letters, numbers, logos, watermarks, UI mockups, photorealism, gradients, neon, generic stock illustration, fantasy plants, people, hands, brands.

## Provenance

The hero will be generated for this project with the factory image generator (`factory-image`) on 2026-08-28 from the prompt sheet above. Generated imagery is original to Garden Care Map. Interface icons and map patterns are authored in the repository under the MIT license.
