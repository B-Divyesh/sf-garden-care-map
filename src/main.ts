import './style.css';
import type { GardenData, Plant, Tool } from './types';
import { clearRealGarden, loadGarden, resetDemo, saveGarden } from './storage';

const app = document.querySelector<HTMLDivElement>('#app')!;
const PRODUCT = 'garden-care-map';
const BUILD = 'v1.0.0';
const BILLING = 'https://api.sociobot.in/api/v1/products/garden-care-map';
let garden: GardenData;
let isDemo = false;
let tool: Tool = 'select';
let selectedType: 'bed' | 'plant' | 'water' | null = null;
let selectedId: string | null = null;
let waterStart: { x: number; y: number } | null = null;
let keyboardCursor = { x: 50, y: 50 };

const uid = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[c]!);

function currentPath() {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  return path;
}

function navigate(path: string) {
  history.pushState({}, '', path);
  renderRoute();
}

function shell(content: string, options: { appPage?: boolean; title: string }) {
  const demoBanner = isDemo ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span class="demo-actions"><button class="text-button" data-action="reset-demo">Reset demo</button><button class="text-button" data-route="/map">Start for real</button></span></aside>` : '';
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    ${demoBanner}
    <header class="site-header">
      <a class="wordmark" href="/" data-route="/" aria-label="Garden Care Map home">
        <svg aria-hidden="true" viewBox="0 0 40 40"><path d="M20 34V17m0 6c-7 0-11-4-11-10 7 0 11 4 11 10Zm0-5c6 0 10-4 10-10-6 0-10 4-10 10ZM7 34h26"/></svg>
        <span>Garden Care Map</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-route="/demo">Demo</a>
        <a href="/map" data-route="/map">My map</a>
        <a href="/privacy" data-route="/privacy">Privacy</a>
      </nav>
    </header>
    <main id="main" class="${options.appPage ? 'app-main' : ''}">${content}</main>
    <footer>
      <p>Map beds, plant care, and water lines in one place.</p>
      <div><a href="/privacy" data-route="/privacy">Privacy</a><a href="/terms" data-route="/terms">Terms</a><a href="https://sociobot.in" rel="external">Built by Param Factory <span class="sr-only">(external site)</span></a></div>
      <p>${BUILD} · Original generated field-guide artwork</p>
    </footer>
    <div id="announcer" class="sr-only" aria-live="polite"></div>
    <div id="toast" class="toast" aria-live="polite" hidden></div>`;
}

function routeTitle(title: string, description?: string) {
  document.title = title;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (meta && description) meta.content = description;
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) canonical.href = `https://garden-care-map.sociobot.in${currentPath()}`;
}

function renderHome() {
  isDemo = false;
  routeTitle('Garden Care Map — Map beds, plants and watering', 'Draw your garden, record plant care, and measure irrigation lines in one private offline map.');
  app.innerHTML = shell(`
    <section class="hero paper-grain">
      <div class="hero-copy">
        <p class="eyebrow">A field notebook for your garden</p>
        <h1 tabindex="-1">Map beds, plants, care, and water</h1>
        <p class="lede">For small-space gardeners who need every planting and care note tied to its real place.</p>
        <div class="hero-actions">
          <button class="primary" data-route="/demo">Try it with sample data</button>
          <span>It opens a complete garden map. Demo changes stay separate.</span>
        </div>
        <button class="secondary" data-route="/map">Start my blank map</button>
        <ul class="plain-facts" aria-label="Key facts">
          <li><strong>Private</strong><span>Garden data stays in this browser.</span></li>
          <li><strong>Offline</strong><span>Reopens after your first visit.</span></li>
          <li><strong>Free core</strong><span>Season archive costs $12 once.</span></li>
        </ul>
      </div>
      <figure class="hero-art">
        <picture>
          <source type="image/webp" srcset="/assets/garden-field-guide-640.webp 640w, /assets/garden-field-guide-1024.webp 1024w" sizes="(max-width: 780px) 92vw, 54vw" />
          <img src="/assets/garden-field-guide-1024.webp" width="1024" height="683" fetchpriority="high" alt="A painted field-guide view of raised beds, pots, herbs, and a red irrigation hose." />
        </picture>
        <figcaption>Keep the care record on the same map as the garden.</figcaption>
      </figure>
    </section>
    <section class="preview-section" aria-labelledby="preview-title">
      <div class="section-intro"><p class="eyebrow">The product</p><h2 id="preview-title">See the whole growing space</h2><p>Each mark has a place. Each plant keeps its own dated history.</p></div>
      ${mapPreview()}
    </section>
    <section class="steps" aria-labelledby="steps-title">
      <p class="eyebrow">How it works</p><h2 id="steps-title">Keep one living garden record</h2>
      <ol><li><span>01</span><h3>Draw each bed</h3><p>Place beds and containers on a simple grid.</p></li><li><span>02</span><h3>Pin each plant</h3><p>Name the crop and variety where it grows.</p></li><li><span>03</span><h3>Record each visit</h3><p>Add dated care notes and measure water lines.</p></li></ol>
    </section>
    <section class="limits" aria-labelledby="limits-title">
      <div><p class="eyebrow">A clear boundary</p><h2 id="limits-title">Your notes, not garden advice</h2></div>
      <p>This tool records what you plant and do. It does not identify plants, diagnose disease, predict weather, or recommend pesticides.</p>
    </section>
    <section class="paid" aria-labelledby="paid-title">
      <div><p class="eyebrow">Optional season keeper</p><h2 id="paid-title">Keep past seasons for $12 once</h2><p>The free map includes every core tool and data export. A one-time purchase adds named season snapshots on this device.</p></div>
      <div class="price-sheet"><p><strong>$12</strong> one-time purchase</p><a class="primary button-link" href="${BILLING}/checkout">Buy the season keeper <span class="sr-only">through Sociobot checkout</span></a><button class="secondary" data-action="show-license">Restore a license</button><p class="fine">Sociobot and Dodo are the merchant of record. Refunds are handled there.</p></div>
    </section>
    <section id="license-panel" class="license-panel" hidden aria-labelledby="license-title"><h2 id="license-title">Restore your season keeper</h2><form id="license-form"><label for="license">License token</label><input id="license" name="license" required autocomplete="off" /><button class="primary">Verify license</button><p id="license-status" aria-live="polite"></p></form></section>
  `, { title: 'Home' });
  bindCommon();
}

function mapPreview() {
  return `<div class="preview-map" aria-label="Sample garden map preview">
    <div class="mini-bed p0" style="--x:8%;--y:12%;--w:36%;--h:28%"><b>Herbs</b><span>● Basil</span><span>● Thyme</span></div>
    <div class="mini-bed p1" style="--x:56%;--y:12%;--w:34%;--h:28%"><b>Salad</b><span>● Lettuce</span></div>
    <div class="mini-bed p2" style="--x:15%;--y:57%;--w:31%;--h:26%"><b>Tomato pots</b><span>● Tomato</span></div>
    <div class="mini-bed p3" style="--x:58%;--y:57%;--w:30%;--h:24%"><b>Bean trough</b><span>● Bean</span></div>
    <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M4 90 L30 70 L26 25 L71 23 L71 68" /></svg>
    <p>Hose total: 15.3 m</p>
  </div>`;
}

async function renderMap(demo: boolean) {
  isDemo = demo;
  try {
    garden = await loadGarden(demo);
  } catch {
    app.innerHTML = shell(`<section class="state-page"><h1 tabindex="-1">Your map could not open</h1><p>The browser blocked local storage. Allow site data, then reload this page.</p><button class="primary" data-action="reload">Reload the map</button></section>`, { title: 'Error' });
    bindCommon();
    return;
  }
  routeTitle(`${demo ? 'Demo' : 'My map'} — Garden Care Map`, demo ? 'Explore a sample garden map without changing your own data.' : 'Edit your private garden map and care history.');
  renderMapShell();
}

function renderMapShell() {
  app.innerHTML = shell(`
    <section class="workspace" aria-labelledby="map-title">
      <div class="workspace-heading">
        <div><p class="eyebrow">${isDemo ? 'Sample garden' : 'Saved on this device'}</p><h1 id="map-title" tabindex="-1">${escapeHtml(garden.name)}</h1></div>
        <div class="status-cluster"><span id="save-state" class="save-state">Saved locally</span><span id="network-state" class="network-state">${navigator.onLine ? 'Online' : 'Offline — changes still save'}</span></div>
      </div>
      <div class="tool-row" role="toolbar" aria-label="Map tools">
        ${toolButton('select', '↖', 'Select')}${toolButton('bed', '▧', 'Add bed')}${toolButton('plant', '✣', 'Add plant')}${toolButton('water', '⌁', 'Draw water line')}
        <span class="tool-help">Choose a tool, then tap the map. Keyboard: arrows move the marker; Enter places it.</span>
      </div>
      <div class="workspace-grid">
        <div class="map-sheet">
          ${garden.beds.length ? renderGardenSvg() : renderEmptyMap()}
          <div class="map-footer"><span>${garden.beds.length} ${garden.beds.length === 1 ? 'bed' : 'beds'} · ${garden.plants.filter(p => p.status === 'active').length} active plants</span><strong>Water lines: ${formatLength(totalWaterLength())}</strong></div>
        </div>
        <aside class="field-notes" aria-label="Field notes">${renderInspector()}</aside>
      </div>
      <div class="data-bar">
        <button class="secondary" data-action="export-json">Export garden</button>
        <button class="secondary" data-action="export-csv">Export care CSV</button>
        <label class="file-button">Import garden<input id="import-file" type="file" accept="application/json" /></label>
        <button class="secondary" data-action="settings">Map settings</button>
      </div>
      <section id="settings" class="settings" hidden aria-labelledby="settings-title">
        <h2 id="settings-title">Map settings</h2>
        <form id="settings-form"><label for="garden-name">Garden name</label><input id="garden-name" name="name" value="${escapeHtml(garden.name)}" required maxlength="50" /><fieldset><legend>Measurement units</legend><label><input type="radio" name="unit" value="metric" ${garden.unit === 'metric' ? 'checked' : ''} /> Metric</label><label><input type="radio" name="unit" value="imperial" ${garden.unit === 'imperial' ? 'checked' : ''} /> Imperial</label></fieldset><button class="primary">Save settings</button></form>
        ${renderArchivePanel()}
        ${!isDemo ? `<button class="danger-button" data-action="clear-map">Clear this map</button>` : ''}
      </section>
    </section>
  `, { appPage: true, title: 'Map' });
  bindCommon();
  bindMap();
}

function toolButton(name: Tool, icon: string, label: string) {
  return `<button class="tool ${tool === name ? 'active' : ''}" data-tool="${name}" aria-pressed="${tool === name}"><span aria-hidden="true">${icon}</span>${label}</button>`;
}

function renderEmptyMap() {
  return `<div class="empty-map"><div><span class="empty-sprout" aria-hidden="true">⌇</span><h2>Your map is ready for its first bed</h2><p>Beds, plants, water lines, and care notes will appear here.</p><button class="primary" data-action="first-bed">Add the first bed</button></div></div>`;
}

function renderGardenSvg() {
  const patterns = `<defs>
    <pattern id="p0" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M-1 1L1-1M0 5L5 0M4 6L6 4"/></pattern>
    <pattern id="p1" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65"/></pattern>
    <pattern id="p2" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3h6M3 0v6"/></pattern>
    <pattern id="p3" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" fill="none"/></pattern>
  </defs>`;
  const beds = garden.beds.map(b => `<g class="bed-mark ${selectedType === 'bed' && selectedId === b.id ? 'selected' : ''}" data-kind="bed" data-id="${b.id}" tabindex="0" role="button" aria-label="${escapeHtml(b.name)} bed"><rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="1" class="bed-base pattern-${b.pattern}"/><rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="1" fill="url(#p${b.pattern})" class="bed-pattern"/><text x="${b.x + 2}" y="${b.y + 5}">${escapeHtml(b.name)}</text></g>`).join('');
  const lines = garden.waterLines.map(l => `<line class="water-mark ${selectedType === 'water' && selectedId === l.id ? 'selected' : ''}" data-kind="water" data-id="${l.id}" tabindex="0" role="button" aria-label="Water line, ${formatLength(lineLength(l))}" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" />`).join('');
  const plants = garden.plants.filter(p => p.status === 'active').map(p => `<g class="plant-mark ${selectedType === 'plant' && selectedId === p.id ? 'selected' : ''}" data-kind="plant" data-id="${p.id}" tabindex="0" role="button" aria-label="${escapeHtml(p.name)}, ${escapeHtml(p.variety)}"><circle cx="${p.x}" cy="${p.y}" r="2.6"/><path d="M${p.x} ${p.y + 2}v-4m0 1c-2.3 0-3.2-1.4-3.2-3.2 2.1 0 3.2 1.2 3.2 3.2Zm0-1c2 0 3-1.2 3-3-2 0-3 1.1-3 3Z"/><text x="${p.x + 4}" y="${p.y + 1}">${escapeHtml(p.name)}</text></g>`).join('');
  return `<svg id="garden-canvas" class="garden-canvas" viewBox="0 0 100 100" tabindex="0" role="application" aria-label="Garden map. Use arrow keys to move the position marker and Enter to use the selected tool.">${patterns}<g class="grid-lines" aria-hidden="true"><path d="${Array.from({length: 9},(_,i)=>`M${(i+1)*10} 0V100 M0 ${(i+1)*10}H100`).join(' ')}"/></g>${beds}${lines}${plants}<g class="keyboard-cursor" aria-hidden="true" transform="translate(${keyboardCursor.x} ${keyboardCursor.y})"><circle r="2"/><path d="M-4 0H4M0-4V4"/></g>${waterStart ? `<circle class="water-start" cx="${waterStart.x}" cy="${waterStart.y}" r="2"/>` : ''}</svg>`;
}

function renderInspector() {
  if (!selectedId || !selectedType) return `<div class="notes-empty"><p class="eyebrow">Field notes</p><h2>Select a map item</h2><p>Plant details and dated care notes appear here.</p><p class="tip">Tip: choose <strong>Add plant</strong>, then tap inside a bed.</p></div>`;
  if (selectedType === 'bed') {
    const bed = garden.beds.find(b => b.id === selectedId);
    if (!bed) return '';
    const plants = garden.plants.filter(p => p.bedId === bed.id && p.status === 'active');
    return `<p class="eyebrow">Bed details</p><h2>${escapeHtml(bed.name)}</h2><p>${formatLength(bed.width / 10)} × ${formatLength(bed.height / 10)}</p><h3>Plants here</h3>${plants.length ? `<ul class="plant-list">${plants.map(p => `<li><button data-select-plant="${p.id}">${escapeHtml(p.name)} <small>${escapeHtml(p.variety)}</small></button></li>`).join('')}</ul>` : '<p>No active plants yet. Choose Add plant, then tap this bed.</p>'}<button class="secondary" data-action="rename-bed">Rename bed</button><button class="danger-button" data-action="delete-selected">Delete this bed</button>`;
  }
  if (selectedType === 'water') {
    const line = garden.waterLines.find(l => l.id === selectedId);
    return `<p class="eyebrow">Irrigation</p><h2>Water line</h2><p>This segment is <strong>${line ? formatLength(lineLength(line)) : ''}</strong>.</p><p>All water lines total ${formatLength(totalWaterLength())}.</p><button class="danger-button" data-action="delete-selected">Delete this line</button>`;
  }
  const plant = garden.plants.find(p => p.id === selectedId);
  if (!plant) return '';
  const bed = garden.beds.find(b => b.id === plant.bedId);
  const notes = garden.notes.filter(n => n.plantId === plant.id).sort((a,b) => b.date.localeCompare(a.date));
  return `<p class="eyebrow">Plant record</p><h2>${escapeHtml(plant.name)}</h2><p><i>${escapeHtml(plant.variety)}</i> · ${escapeHtml(bed?.name ?? 'No bed')}</p>
    <form id="care-form" class="care-form"><h3>Add a care note</h3><label for="care-date">Date</label><input id="care-date" name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required /><label for="care-action">What happened</label><select id="care-action" name="action"><option>Watered</option><option>Fed</option><option>Pruned</option><option>Harvested</option><option>Planted</option><option>Observed</option></select><label for="care-note">Note</label><textarea id="care-note" name="note" rows="3" maxlength="240" required></textarea><label for="care-photo">Photo (optional, stored here)</label><input id="care-photo" name="photo" type="file" accept="image/*" /><button class="primary">Save care note</button></form>
    <h3>Care history</h3>${notes.length ? `<ol class="care-list">${notes.map(n => `<li><time datetime="${n.date}">${formatDate(n.date)}</time><strong>${escapeHtml(n.action)}</strong><p>${escapeHtml(n.note)}</p>${n.photo ? `<img src="${n.photo}" alt="Photo attached to the ${escapeHtml(n.action.toLowerCase())} note from ${formatDate(n.date)}" />` : ''}<button class="small-link" data-delete-note="${n.id}">Delete note</button></li>`).join('')}</ol>` : '<p>No care notes yet. Add the first note above.</p>'}
    <button class="secondary" data-action="finish-plant">Mark planting finished</button><button class="danger-button" data-action="delete-selected">Delete this plant</button>`;
}

function renderArchivePanel() {
  const unlocked = licenseIsActive();
  return `<div class="archive-panel"><h3>Season archive</h3>${unlocked ? `<p>Save a named snapshot before you clear or replant the map.</p><form id="archive-form"><label for="archive-name">Season name</label><input id="archive-name" name="name" required maxlength="40" placeholder="Summer 2026" /><button class="secondary">Save season snapshot</button></form>${garden.archives.length ? `<ul>${garden.archives.map(a => `<li><strong>${escapeHtml(a.name)}</strong><span>${a.counts.beds} beds · ${a.counts.plants} plants · ${a.counts.notes} notes</span><button class="small-link" data-export-archive="${a.id}">Download snapshot</button></li>`).join('')}</ul>` : ''}` : `<p>A $12 one-time purchase adds named season snapshots. The map and exports stay free.</p><a href="${BILLING}/checkout">Buy the season keeper</a><form id="license-form"><label for="license">Have a license? Paste it here</label><input id="license" name="license" required autocomplete="off" /><button class="secondary">Verify license</button><p id="license-status" aria-live="polite"></p></form>`}</div>`;
}

function renderLegal(kind: 'privacy'|'terms') {
  isDemo = false;
  const privacy = kind === 'privacy';
  routeTitle(`${privacy ? 'Privacy' : 'Terms'} — Garden Care Map`);
  const body = privacy ? `
    <h1 tabindex="-1">Your garden data stays with you</h1><p class="lede">Garden Care Map stores maps, notes, photos, settings, and licenses in your browser.</p>
    <h2>What this site stores</h2><p>Your garden data uses IndexedDB. Your license token and last verification use local storage. Demo data uses a separate key and never reads your real map.</p>
    <h2>When data leaves this device</h2><p>Normal map use sends no garden data to us. Buying or verifying a license opens or contacts Sociobot. Its payment provider handles checkout details.</p>
    <h2>Your choices</h2><p>You can export your garden at any time. Clear the map in Map settings, or remove this site’s browser data. Uninstalling the app does not always remove browser data.</p>
    <h2>Contact</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a> with privacy questions.</p>` : `
    <h1 tabindex="-1">Terms for using Garden Care Map</h1><p class="lede">Use this tool to keep your own garden records. These terms apply from 28 August 2026.</p>
    <h2>The tool</h2><p>Garden Care Map records information you enter. It does not give agronomic, medical, pesticide, or safety advice. Check trusted local guidance before acting.</p>
    <h2>Your data</h2><p>You are responsible for your data and backups. Use the export tools before clearing browser storage or moving devices.</p>
    <h2>Purchase</h2><p>The $12 season keeper is a one-time license purchase. Sociobot and Dodo are the merchant of record. Refunds are handled through the merchant and revoke the license.</p>
    <h2>Availability</h2><p>The software is provided as is, without a promise that it fits every garden or device. Liability is limited where the law allows.</p>
    <h2>Contact</h2><p>Email <a href="mailto:support@sociobot.in">support@sociobot.in</a> with terms or purchase questions.</p>`;
  app.innerHTML = shell(`<article class="prose-page">${body}</article>`, { title: privacy ? 'Privacy' : 'Terms' });
  bindCommon();
}

function render404() {
  isDemo = false;
  routeTitle('Page not found — Garden Care Map');
  app.innerHTML = shell(`<section class="not-found"><div class="lost-label" aria-hidden="true">?</div><h1 tabindex="-1">This marker is off the map</h1><p>The page you asked for does not exist.</p><button class="primary" data-route="/">Return to the garden</button></section>`, { title: 'Not found' });
  bindCommon();
}

function bindCommon() {
  document.querySelectorAll<HTMLElement>('[data-route]').forEach(el => el.addEventListener('click', event => { event.preventDefault(); navigate(el.dataset.route!); }));
  document.querySelector('[data-action="reload"]')?.addEventListener('click', () => location.reload());
  document.querySelectorAll('[data-action="show-license"]').forEach(el => el.addEventListener('click', () => {
    const panel = document.querySelector<HTMLElement>('#license-panel') ?? document.querySelector<HTMLElement>('#settings');
    if (panel) { panel.hidden = false; panel.scrollIntoView({ behavior: 'smooth' }); }
  }));
  document.querySelector('#license-form')?.addEventListener('submit', async event => {
    event.preventDefault(); const input = new FormData(event.currentTarget as HTMLFormElement).get('license')?.toString().trim();
    if (input) await verifyLicense(input, true);
  });
  document.querySelector('[data-action="reset-demo"]')?.addEventListener('click', async () => { garden = await resetDemo(); renderMapShell(); announce('Demo reset to its original sample.'); });
  focusMainHeading();
}

function bindMap() {
  document.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(button => button.addEventListener('click', () => { tool = button.dataset.tool as Tool; waterStart = null; renderMapShell(); announce(`${button.textContent?.trim()} tool selected.`); }));
  document.querySelector('[data-action="first-bed"]')?.addEventListener('click', () => { tool = 'bed'; addBedAt(50, 50); });
  const svg = document.querySelector<SVGSVGElement>('#garden-canvas');
  svg?.addEventListener('click', event => {
    const target = (event.target as SVGElement).closest<SVGElement>('[data-kind]');
    if (tool === 'select' && target) return selectItem(target.dataset.kind!, target.dataset.id!);
    const pt = svg.createSVGPoint(); pt.x = event.clientX; pt.y = event.clientY;
    const point = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    useToolAt(Math.max(2, Math.min(98, point.x)), Math.max(2, Math.min(98, point.y)));
  });
  svg?.addEventListener('keydown', event => {
    const item = (event.target as SVGElement).closest<SVGElement>('[data-kind]');
    if (item && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      selectItem(item.dataset.kind!, item.dataset.id!);
      return;
    }
    const step = event.shiftKey ? 5 : 2;
    if (event.key === 'ArrowLeft') keyboardCursor.x = Math.max(2, keyboardCursor.x - step);
    else if (event.key === 'ArrowRight') keyboardCursor.x = Math.min(98, keyboardCursor.x + step);
    else if (event.key === 'ArrowUp') keyboardCursor.y = Math.max(2, keyboardCursor.y - step);
    else if (event.key === 'ArrowDown') keyboardCursor.y = Math.min(98, keyboardCursor.y + step);
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); useToolAt(keyboardCursor.x, keyboardCursor.y); return; }
    else return;
    event.preventDefault(); svg.querySelector<SVGGElement>('.keyboard-cursor')?.setAttribute('transform', `translate(${keyboardCursor.x} ${keyboardCursor.y})`);
  });
  document.querySelectorAll<HTMLElement>('[data-select-plant]').forEach(el => el.addEventListener('click', () => selectItem('plant', el.dataset.selectPlant!)));
  document.querySelector('[data-action="rename-bed"]')?.addEventListener('click', renameBed);
  document.querySelector('[data-action="delete-selected"]')?.addEventListener('click', deleteSelected);
  document.querySelector('[data-action="finish-plant"]')?.addEventListener('click', finishPlant);
  document.querySelectorAll<HTMLElement>('[data-delete-note]').forEach(el => el.addEventListener('click', () => deleteNote(el.dataset.deleteNote!)));
  document.querySelector('#care-form')?.addEventListener('submit', addCareNote);
  document.querySelector('[data-action="export-json"]')?.addEventListener('click', exportGarden);
  document.querySelector('[data-action="export-csv"]')?.addEventListener('click', exportCsv);
  document.querySelector<HTMLInputElement>('#import-file')?.addEventListener('change', importGarden);
  document.querySelector('[data-action="settings"]')?.addEventListener('click', () => { const settings = document.querySelector<HTMLElement>('#settings')!; settings.hidden = !settings.hidden; if (!settings.hidden) settings.scrollIntoView({ behavior: 'smooth' }); });
  document.querySelector('#settings-form')?.addEventListener('submit', saveSettings);
  document.querySelector('#archive-form')?.addEventListener('submit', saveArchive);
  document.querySelectorAll<HTMLElement>('[data-export-archive]').forEach(el => el.addEventListener('click', () => exportArchive(el.dataset.exportArchive!)));
  document.querySelector('[data-action="clear-map"]')?.addEventListener('click', clearMap);
  addEventListener('online', updateNetworkState, { once: true });
  addEventListener('offline', updateNetworkState, { once: true });
}

function useToolAt(x: number, y: number) {
  if (tool === 'bed') return addBedAt(x, y);
  if (tool === 'plant') return addPlantAt(x, y);
  if (tool === 'water') return addWaterAt(x, y);
  selectedId = null; selectedType = null; renderMapShell();
}

async function addBedAt(x: number, y: number) {
  const count = garden.beds.length + 1;
  const bed = { id: uid('bed'), name: `Bed ${count}`, x: Math.max(2, x - 14), y: Math.max(2, y - 9), width: Math.min(28, 98 - Math.max(2, x - 14)), height: Math.min(18, 98 - Math.max(2, y - 9)), pattern: garden.beds.length % 4 };
  garden.beds.push(bed); selectedType = 'bed'; selectedId = bed.id; tool = 'select'; await persist('Bed added.');
}

async function addPlantAt(x: number, y: number) {
  const bed = [...garden.beds].reverse().find(b => x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height);
  if (!bed) return announce('No plant added. Place the marker inside a bed.');
  const name = prompt('Plant name'); if (!name?.trim()) return;
  const variety = prompt('Variety (optional)')?.trim() || 'Variety not recorded';
  const plant: Plant = { id: uid('plant'), bedId: bed.id, name: name.trim(), variety, x, y, status: 'active' };
  garden.plants.push(plant); selectedType = 'plant'; selectedId = plant.id; tool = 'select'; await persist(`${plant.name} added.`);
}

async function addWaterAt(x: number, y: number) {
  if (!waterStart) { waterStart = { x, y }; renderMapShell(); announce('Water line started. Choose its end point.'); return; }
  const line = { id: uid('water'), x1: waterStart.x, y1: waterStart.y, x2: x, y2: y };
  garden.waterLines.push(line); waterStart = { x, y }; selectedType = 'water'; selectedId = line.id; await persist(`Water line added. Total ${formatLength(totalWaterLength())}.`);
}

function selectItem(kind: string, id: string) { selectedType = kind as typeof selectedType; selectedId = id; renderMapShell(); }

async function persist(message: string) {
  garden.updatedAt = new Date().toISOString();
  await saveGarden(garden, isDemo);
  renderMapShell(); announce(message);
}

function renameBed() {
  const bed = garden.beds.find(b => b.id === selectedId); if (!bed) return;
  const name = prompt('Bed name', bed.name)?.trim(); if (!name) return;
  bed.name = name; void persist('Bed renamed.');
}

function deleteSelected() {
  if (!selectedId || !selectedType) return;
  const label = selectedType === 'bed' ? garden.beds.find(b=>b.id===selectedId)?.name : selectedType === 'plant' ? garden.plants.find(p=>p.id===selectedId)?.name : 'this water line';
  if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
  if (selectedType === 'bed') { const plantIds = garden.plants.filter(p=>p.bedId===selectedId).map(p=>p.id); garden.beds = garden.beds.filter(b=>b.id!==selectedId); garden.plants = garden.plants.filter(p=>p.bedId!==selectedId); garden.notes = garden.notes.filter(n=>!plantIds.includes(n.plantId)); }
  if (selectedType === 'plant') { garden.plants = garden.plants.filter(p=>p.id!==selectedId); garden.notes = garden.notes.filter(n=>n.plantId!==selectedId); }
  if (selectedType === 'water') garden.waterLines = garden.waterLines.filter(l=>l.id!==selectedId);
  selectedId = null; selectedType = null; void persist('Map item deleted.');
}

function finishPlant() {
  const plant = garden.plants.find(p=>p.id===selectedId); if (!plant) return;
  plant.status = 'finished'; selectedId = null; selectedType = null; void persist(`${plant.name} marked finished. Its notes remain in exports.`);
}

async function addCareNote(event: Event) {
  event.preventDefault(); if (!selectedId) return;
  const form = event.currentTarget as HTMLFormElement; const data = new FormData(form); const file = data.get('photo') as File;
  let photo: string | undefined;
  if (file?.size) {
    if (file.size > 1_500_000) return announce('The photo is over 1.5 MB. Choose a smaller photo.');
    photo = await fileToDataUrl(file);
  }
  garden.notes.push({ id: uid('note'), plantId: selectedId, date: data.get('date')!.toString(), action: data.get('action')!.toString(), note: data.get('note')!.toString().trim(), photo });
  await persist('Care note saved.');
}

function deleteNote(id: string) { if (confirm('Delete this care note? This cannot be undone.')) { garden.notes = garden.notes.filter(n=>n.id!==id); void persist('Care note deleted.'); } }
function fileToDataUrl(file: File) { return new Promise<string>((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result)); r.onerror = reject; r.readAsDataURL(file); }); }

function lineLength(line: {x1:number;y1:number;x2:number;y2:number}) { return Math.hypot(line.x2-line.x1, line.y2-line.y1) / 10; }
function totalWaterLength() { return garden.waterLines.reduce((sum,l)=>sum+lineLength(l),0); }
function formatLength(meters: number) { return garden.unit === 'metric' ? `${meters.toFixed(1)} m` : `${(meters*3.28084).toFixed(1)} ft`; }
function formatDate(date: string) { return new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(`${date}T00:00:00Z`)); }

function download(name: string, content: string, type: string) { const url = URL.createObjectURL(new Blob([content], {type})); const a=document.createElement('a'); a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
function exportGarden() { download(`garden-care-map-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(garden,null,2), 'application/json'); announce('Garden export downloaded.'); }
function csvCell(v: unknown) { return `"${String(v??'').replaceAll('"','""')}"`; }
function exportCsv() { const header=['date','plant','variety','bed','action','note']; const rows=garden.notes.map(n=>{const p=garden.plants.find(p=>p.id===n.plantId);const b=garden.beds.find(b=>b.id===p?.bedId);return [n.date,p?.name,p?.variety,b?.name,n.action,n.note].map(csvCell).join(',');}); download('garden-care-notes.csv',[header.join(','),...rows].join('\n'),'text/csv'); announce('Care CSV downloaded.'); }

async function importGarden(event: Event) {
  const file=(event.target as HTMLInputElement).files?.[0]; if (!file) return;
  try { const parsed=JSON.parse(await file.text()) as GardenData; if (!Array.isArray(parsed.beds)||!Array.isArray(parsed.plants)||!Array.isArray(parsed.notes)||!Array.isArray(parsed.waterLines)) throw new Error(); if (!confirm(`Replace this map with “${parsed.name || 'imported garden'}”?`)) return; garden={...parsed,archives:parsed.archives??[],unit:parsed.unit==='imperial'?'imperial':'metric'};selectedId=null;selectedType=null;await persist('Garden imported.'); }
  catch { announce('Import failed. Choose a Garden Care Map JSON export.'); }
}

function saveSettings(event: Event) { event.preventDefault(); const data=new FormData(event.currentTarget as HTMLFormElement); garden.name=data.get('name')!.toString().trim();garden.unit=data.get('unit')==='imperial'?'imperial':'metric';void persist('Map settings saved.'); }
function clearMap() { if (!confirm(`Clear “${garden.name}”? Export first if you need a backup.`)) return; clearRealGarden().then(data=>{garden=data;selectedId=null;selectedType=null;renderMapShell();announce('Map cleared.');}); }
async function saveArchive(event: Event) { event.preventDefault(); const name=new FormData(event.currentTarget as HTMLFormElement).get('name')!.toString().trim();garden.archives.push({id:uid('archive'),name,createdAt:new Date().toISOString(),counts:{beds:garden.beds.length,plants:garden.plants.length,notes:garden.notes.length},snapshot:{unit:garden.unit,beds:structuredClone(garden.beds),plants:structuredClone(garden.plants),waterLines:structuredClone(garden.waterLines),notes:structuredClone(garden.notes)}});await persist('Season snapshot saved.');const settings=document.querySelector<HTMLElement>('#settings');if(settings){settings.hidden=false;settings.scrollIntoView();} }
function exportArchive(id: string) { const archive=garden.archives.find(item=>item.id===id); if(!archive?.snapshot) return announce('This older snapshot has no map data to download.'); download(`${archive.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.json`,JSON.stringify({name:archive.name,...archive.snapshot,archives:[],updatedAt:archive.createdAt},null,2),'application/json');announce('Season snapshot downloaded.'); }

function licenseIsActive() { try { const cached=JSON.parse(localStorage.getItem(`sb_license_verdict:${PRODUCT}`)||'null'); return cached?.valid===true; } catch { return false; } }
async function verifyLicense(token: string, showStatus=false) {
  localStorage.setItem(`sb_license:${PRODUCT}`, token);
  const status=document.querySelector<HTMLElement>('#license-status'); if(status) status.textContent='Checking the license…';
  try { const response=await fetch(`${BILLING}/verify?license=${encodeURIComponent(token)}`); const result=await response.json(); localStorage.setItem(`sb_license_verdict:${PRODUCT}`,JSON.stringify({valid:result.valid,checkedAt:Date.now()})); if(status) status.textContent=result.valid?'License active. Season snapshots are ready.':'This license is not active. Check the token or buy a new license.'; if(showStatus&&currentPath()==='/map') renderMapShell(); }
  catch { if(status) status.textContent='The license could not be checked. Connect to the internet and try again.'; }
}

async function handleLicense() {
  const params=new URLSearchParams(location.search); const token=params.get('license');
  if(token){ localStorage.setItem(`sb_license:${PRODUCT}`,token);params.delete('license');history.replaceState({},'',`${location.pathname}${params.size?`?${params}`:''}`);await verifyLicense(token);return; }
  const saved=localStorage.getItem(`sb_license:${PRODUCT}`); let cache:{valid:boolean;checkedAt:number}|null=null; try{cache=JSON.parse(localStorage.getItem(`sb_license_verdict:${PRODUCT}`)||'null');}catch{}
  if(saved&&(!cache||Date.now()-cache.checkedAt>86_400_000)&&navigator.onLine) void verifyLicense(saved);
}

function updateNetworkState(){const el=document.querySelector('#network-state');if(el)el.textContent=navigator.onLine?'Online':'Offline — changes still save';}
function announce(message:string){const el=document.querySelector<HTMLElement>('#announcer')||document.querySelector<HTMLElement>('#toast');if(el)el.textContent=message;const toast=document.querySelector<HTMLElement>('#toast');if(toast){toast.hidden=false;toast.textContent=message;setTimeout(()=>{toast.hidden=true;},2600);}}
function focusMainHeading(){requestAnimationFrame(()=>{const h=document.querySelector<HTMLElement>('main h1');h?.focus({preventScroll:true});document.querySelector('#announcer')!.textContent=h?.textContent??'';});}

async function renderRoute() {
  const path=currentPath();
  if(path==='/') renderHome();
  else if(path==='/demo') await renderMap(true);
  else if(path==='/map') await renderMap(false);
  else if(path==='/privacy'||path==='/terms') renderLegal(path.slice(1) as 'privacy'|'terms');
  else render404();
}

addEventListener('popstate',renderRoute);
if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').then(async reg=>{
  reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)announce('An update is ready. Reload to use it.');});});
  await navigator.serviceWorker.ready;
  document.documentElement.dataset.offlineReady='true';
}).catch(()=>{});
void handleLicense().then(renderRoute);
