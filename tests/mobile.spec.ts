import { test, expect } from '@playwright/test';

test('landing and map work at 390 pixels', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Map beds, plants, care, and water' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Try it with sample data' }).click();
  await expect(page.locator('#garden-canvas')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('keyboard tool places a bed', async ({ page }) => {
  await page.goto('/map');
  await page.getByRole('button', { name: 'Add the first bed' }).click();
  await expect(page.locator('[data-kind="bed"]')).toHaveCount(1);
  await page.getByRole('button', { name: 'Add bed' }).click();
  await page.locator('#garden-canvas').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-kind="bed"]')).toHaveCount(2);
});

test('mobile core controls have 44 pixel hit areas and 200% text does not overflow', async ({ page }) => {
  await page.goto('/demo');
  for (const name of ['Reset demo', 'Start for real']) {
    const box = await page.getByRole('button', { name }).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  for (const selector of ['[data-kind="plant"]', '[data-kind="water"]']) {
    const box = await page.locator(selector).first().boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
  await page.setViewportSize({ width: 195, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
