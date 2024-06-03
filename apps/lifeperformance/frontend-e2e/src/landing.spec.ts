import { test, expect } from '@playwright/test';

test('has header', async ({ page }) => {
  await page.goto('/');

  // Expect header to be defined.
  expect(
    await page.locator('lifeperformance-header').innerText(),
  ).toBeDefined();
});

test('has footer', async ({ page }) => {
  await page.goto('/');

  // Expect header to be defined.
  expect(
    await page.locator('lifeperformance-footer').innerText(),
  ).toBeDefined();
});
