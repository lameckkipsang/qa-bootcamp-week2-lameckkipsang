import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test('searching for pliers returns only products with pliers in the name', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('textbox', { name: 'Search' }).fill('pliers');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('heading', { name: /Searched for: pliers/i })).toBeVisible();

  const productNames = page.getByRole('link').getByRole('heading');

  await expect(async () => {
    const names = await productNames.allTextContents();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain('pliers');
    }
  }).toPass();
});