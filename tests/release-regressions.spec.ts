import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('@claim:season-keeper-checkout season keeper states its price and opens hosted Sociobot checkout', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByText('$12 one-time purchase', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Buy the season keeper/ })).toHaveAttribute('href', 'https://api.sociobot.in/api/v1/products/garden-care-map/checkout');
  await expect(page.getByRole('button', { name: 'Restore a license' })).toBeVisible();
  await page.goto('/map');
  await page.getByRole('button', { name: 'Map settings' }).click();
  await expect(page.getByRole('link', { name: 'Buy the season keeper' })).toHaveAttribute('href', 'https://api.sociobot.in/api/v1/products/garden-care-map/checkout');
  const checkout = await request.get('https://api.sociobot.in/api/v1/products/garden-care-map/checkout', { maxRedirects: 0 });
  expect(checkout.status()).toBe(303);
  expect(checkout.headers().location).toMatch(/^https:\/\/checkout\.dodopayments\.com\/session\//);
});

test('rejects a structurally invalid import without changing or corrupting the saved map', async ({ page }) => {
  await page.goto('/demo');
  const invalid = JSON.stringify({ name: 'Broken garden', unit: 'metric', beds: [null], plants: [], notes: [], waterLines: [], archives: [], updatedAt: new Date().toISOString() });
  page.once('dialog', dialog => dialog.dismiss());
  await page.getByLabel('Import garden').setInputFiles({ name: 'broken.json', mimeType: 'application/json', buffer: Buffer.from(invalid) });
  await expect(page.locator('#toast')).toHaveText('Import failed. Choose a Garden Care Map JSON export.');
  await expect(page.locator('[data-kind="bed"]')).toHaveCount(4);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Courtyard kitchen garden' })).toBeVisible();
  await expect(page.locator('[data-kind="bed"]')).toHaveCount(4);
});

test('offers a safe in-app recovery for previously corrupt stored garden data', async ({ page }) => {
  await page.goto('/map');
  await page.evaluate(async () => {
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('garden-care-map-v1');
      request.onsuccess = () => {
        const tx = request.result.transaction('gardens', 'readwrite');
        tx.objectStore('gardens').put({ name: 'Broken', beds: [null], plants: [], notes: [], waterLines: [] }, 'real:garden');
        tx.oncomplete = () => { request.result.close(); resolve(); };
        tx.onerror = () => reject(tx.error);
      };
      request.onerror = () => reject(request.error);
    });
  });
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your saved map needs recovery' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset this map' }).click();
  await expect(page.getByRole('heading', { name: 'My garden' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your map is ready for its first bed' })).toBeVisible();
});

test('care notes survive an immediate reload once submitted', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-id="plant-basil"] circle').click();
  await page.getByLabel('Note', { exact: true }).fill('Saved through the immediate reload boundary.');
  await page.getByRole('button', { name: 'Save care note' }).click();
  await page.reload();
  await page.locator('[data-id="plant-basil"] circle').click();
  await expect(page.getByText('Saved through the immediate reload boundary.')).toBeVisible();
});

test('invalid license feedback remains visible after the map rerenders', async ({ page }) => {
  await page.route('https://api.sociobot.in/**', route => route.fulfill({ json: { valid: false, reason: 'invalid' } }));
  await page.goto('/map');
  await page.getByRole('button', { name: 'Map settings' }).click();
  await page.getByLabel('Have a license? Paste it here').fill('not-a-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('This license is not active. Check the token and try again.')).toBeVisible();
});

test('static deployment returns real 404s and caches versioned assets', async () => {
  const config = JSON.parse(await readFile('public/staticwebapp.config.json', 'utf8'));
  expect(config.navigationFallback).toBeUndefined();
  for (const route of ['/', '/demo', '/map', '/privacy', '/terms']) {
    expect(config.routes).toContainEqual(expect.objectContaining({ route, rewrite: '/index.html' }));
  }
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html' });
  expect(config.routes).toContainEqual(expect.objectContaining({
    route: '/assets/*',
    headers: expect.objectContaining({ 'Cache-Control': 'public, max-age=31536000, immutable' })
  }));
});

test('asset references carry a release version', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-art img')).toHaveAttribute('src', /\?v=\d{8}$/);
  const manifest = JSON.parse(await readFile('public/manifest.webmanifest', 'utf8'));
  expect(manifest.icons.every((icon: { src: string }) => /\?v=\d{8}$/.test(icon.src))).toBe(true);
});

test('every application route sets complete route metadata', async ({ page }) => {
  const expected = [
    ['/', 'Garden Care Map — Map beds, plants and watering', 'Draw your garden, record plant care, and measure irrigation lines in one private offline map.'],
    ['/demo', 'Demo — Garden Care Map', 'Explore a sample garden map without changing your own data.'],
    ['/map', 'My map — Garden Care Map', 'Edit your private garden map and care history.'],
    ['/privacy', 'Privacy — Garden Care Map', 'Read how Garden Care Map stores local garden records and license details.'],
    ['/terms', 'Terms — Garden Care Map', 'Read the terms for using Garden Care Map and its optional season snapshots.'],
    ['/missing-page', 'Page not found — Garden Care Map', 'The requested Garden Care Map page was not found.']
  ] as const;
  for (const [path, title, description] of expected) {
    await page.goto(path);
    const url = `https://garden-care-map.sociobot.in${path}`;
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', url);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', url);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description);
  }
});

test('the static 404 has the required product shell and metadata', async () => {
  const html = await readFile('public/404.html', 'utf8');
  for (const required of ['<header', '<main id="main"', '<footer', 'Page not found', 'href="/privacy"', 'href="/terms"', 'rel="canonical"', 'name="description"', 'property="og:title"', 'name="twitter:title"', 'favicon.svg', 'apple-touch-icon']) {
    expect(html).toContain(required);
  }
});

test('landing preview matches the sample water total', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.preview-map')).toContainText('Water lines: 16.8 m');
  await page.goto('/demo');
  await expect(page.locator('.map-footer')).toContainText('Water lines: 16.8 m');
});

test('an installed service-worker update is announced', async ({ page }) => {
  await page.addInitScript(() => {
    const worker = new EventTarget() as EventTarget & { state: string };
    worker.state = 'installing';
    const registration = new EventTarget() as EventTarget & { installing: typeof worker };
    registration.installing = worker;
    const serviceWorker = {
      controller: {},
      ready: Promise.resolve(registration),
      register: () => Promise.resolve(registration)
    };
    Object.defineProperty(navigator, 'serviceWorker', { configurable: true, value: serviceWorker });
    (window as unknown as { installTestUpdate: () => void }).installTestUpdate = () => {
      registration.dispatchEvent(new Event('updatefound'));
      worker.state = 'installed';
      worker.dispatchEvent(new Event('statechange'));
    };
  });
  await page.goto('/');
  await page.evaluate(() => (window as unknown as { installTestUpdate: () => void }).installTestUpdate());
  await expect(page.locator('#toast')).toHaveText('An update is ready. Reload to use it.');
  await expect(page.locator('#toast')).toBeVisible();
});
