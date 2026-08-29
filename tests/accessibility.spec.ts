import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const colorScheme of ['light', 'dark'] as const) {
  for (const path of ['/', '/?demo=1', '/demo', '/map', '/privacy', '/terms', '/missing-page', '/404.html']) {
    test(`accessibility baseline ${path} in ${colorScheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(path);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
    });
  }
}

test('cold-load keyboard order starts with the skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
});

test('history navigation restores routes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveURL(/\/privacy$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { name: 'Map beds, plants, care notes, and water lines' })).toBeFocused();
});

test('reduced motion removes smooth scrolling and visible transition motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?demo=1');
  const motion = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    transitionDuration: getComputedStyle(document.querySelector<HTMLElement>('.primary')!).transitionDuration,
    animationDuration: getComputedStyle(document.querySelector<SVGElement>('.water-line')!).animationDuration
  }));
  expect(motion.scrollBehavior).toBe('auto');
  expect(motion.transitionDuration).toBe('0s');
  expect(Number.parseFloat(motion.animationDuration)).toBeLessThanOrEqual(0.001);
});
