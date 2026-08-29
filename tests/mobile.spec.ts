import { test, expect } from '@playwright/test';

test('landing and map work at 390 pixels', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Map beds, plants, care notes, and water lines' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Try it with sample data' }).click();
  await expect(page.locator('#garden-canvas')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('all first-screen facts fit in the 390 pixel landing viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const text of ['Garden data stays in this browser.', 'Reopens after your first visit.', 'Every mapping and export tool is free.']) {
    const box = await page.getByText(text, { exact: true }).boundingBox();
    expect(box).not.toBeNull();
    expect((box?.y ?? Infinity) + (box?.height ?? 0)).toBeLessThanOrEqual(844);
  }
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
  await page.goto('/?demo=1');
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
  await page.goto('/?demo=1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
