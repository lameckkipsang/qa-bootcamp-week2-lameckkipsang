import { test, expect } from '@playwright/test';

const API_URL = 'https://api.practicesoftwaretesting.com';

test('GET /products returns 200 and a list of products', async ({ request }) => {
  const response = await request.get(`${API_URL}/products`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.current_page).toBe(1);
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0].name).toBeTruthy();
});