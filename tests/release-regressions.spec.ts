import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('unavailable checkout is not advertised as a working purchase link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Sales paused', { exact: true })).toBeVisible();
  await expect(page.locator('a[href*="/products/garden-care-map/checkout"]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Restore a license' })).toBeVisible();
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
