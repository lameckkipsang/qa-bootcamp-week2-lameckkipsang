import { test, expect } from '@playwright/test';

const API_URL =
  process.env.API_BASE_URL ||
  process.env.API_URL ||
  'https://api.practicesoftwaretesting.com';

test.describe('Cart Not Found API', () => {
  test('requests a cart ID that does not exist and checks for a 404', async ({ request }) => {
    const missingCartId = '00000000-0000-0000-0000-000000000000';
    const response = await request.get(`${API_URL}/carts/${missingCartId}`);

    expect(response.status()).toBe(404);
  });
});