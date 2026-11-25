import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test('home page has the expected title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});