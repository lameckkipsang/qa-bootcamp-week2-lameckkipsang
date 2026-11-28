import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('TC 1 - Search finds products by name (TS-101)', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor('pliers');
  await expect(homePage.resultsLocator).toBeVisible();
  expect(await homePage.getSearchCaptionText()).toContain('pliers');

  const productNames = await homePage.getProductNames();
  expect(productNames.length).toBeGreaterThan(0);

  for (const name of productNames) {
    expect(name.toLowerCase()).toContain('pliers');
  }
});