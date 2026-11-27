import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('C1 Search by name', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor('pliers');

  // Wait for the search heading and at least one product card to appear
  await expect(homePage.searchCaption).toContainText(/pliers/i);
  await expect(homePage.productNames.first()).toBeVisible();

  const names = await homePage.getProductNames();
  expect(names.length).toBeGreaterThan(0);

  for (const name of names) {
    expect(name.toLowerCase()).toContain('pliers');
  }
});