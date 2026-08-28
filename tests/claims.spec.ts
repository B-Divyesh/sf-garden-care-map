import { test, expect } from '@playwright/test';

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { name: 'Courtyard kitchen garden' })).toBeVisible();
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.waitForFunction(() => document.documentElement.dataset.offlineReady === 'true');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Courtyard kitchen garden' })).toBeVisible();
  await expect(page.getByText('Offline — changes still save')).toBeVisible();
});

test('@claim:local-private demo map use sends data only to this site', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', request => origins.add(new URL(request.url()).origin));
  await page.goto('/demo');
  await page.locator('[data-id="plant-basil"] circle').click();
  await page.getByLabel('Note', { exact: true }).fill('Pinched the top leaves.');
  await page.getByRole('button', { name: 'Save care note' }).click();
  await expect(page.getByText('Pinched the top leaves.')).toBeVisible();
  expect([...origins]).toEqual(['http://127.0.0.1:4173']);
});

test('@claim:demo-isolation demo data never changes the real map', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Add bed' }).click();
  await page.locator('#garden-canvas').click({ position: { x: 100, y: 100 } });
  await expect(page.locator('[data-kind="bed"]')).toHaveCount(5);
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page.getByRole('heading', { name: 'My garden' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Your map is ready for its first bed' })).toBeVisible();
});

test('@claim:care-persistence saves plant care across reloads', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('[data-id="plant-basil"] circle').click();
  await page.getByLabel('Note', { exact: true }).fill('Checked after the evening rain.');
  await page.getByRole('button', { name: 'Save care note' }).click();
  await page.reload();
  await page.locator('[data-id="plant-basil"] circle').click();
  await expect(page.getByText('Checked after the evening rain.')).toBeVisible();
});

test('@claim:csv-export exports one row for every care note', async ({ page }) => {
  await page.goto('/demo');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export care CSV' }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  let csv = '';
  for await (const chunk of stream) csv += chunk.toString();
  const lines = csv.trim().split('\n');
  expect(lines[0]).toBe('date,plant,variety,bed,action,note');
  expect(lines).toHaveLength(4);
  expect(csv).toContain('Genovese');
});

test('@claim:water-total measures and totals irrigation segments', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('.map-footer')).toContainText('Water lines: 16.8 m');
  await page.getByRole('button', { name: 'Map settings' }).click();
  await page.getByLabel('Imperial').check();
  await page.getByRole('button', { name: 'Save settings' }).click();
  await expect(page.locator('.map-footer')).toContainText('Water lines: 55.1 ft');
});

test('@claim:license-verify valid licenses enable season snapshots', async ({ page }) => {
  await page.route('https://api.sociobot.in/**', route => route.fulfill({ json: { valid: true, reason: 'ok', expires_at: null } }));
  await page.goto('/map?license=test-valid-token');
  await page.getByRole('button', { name: 'Map settings' }).click();
  await expect(page.getByLabel('Season name')).toBeVisible();
  await page.getByLabel('Season name').fill('Summer 2026');
  await page.getByRole('button', { name: 'Save season snapshot' }).click();
  await expect(page.getByText('Summer 2026')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download snapshot' })).toBeVisible();
});
