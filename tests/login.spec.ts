import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicesoftwaretesting.com';

test('invalid login is rejected with an error message', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: /Email address/i }).fill('invalid@example.com');
  await page.getByPlaceholder(/Your password/i).fill('wrongpassword123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});