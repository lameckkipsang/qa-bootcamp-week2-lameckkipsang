import { test, expect, APIRequestContext } from '@playwright/test';

const apiUrl = process.env.TOOLSHOP_API_URL || 'https://api.practicesoftwaretesting.com';

async function getFirstProduct(request: APIRequestContext): Promise<{ id: string; name: string }> {
  const response = await request.get(`${apiUrl}/products`);
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);

  return {
    id: body.data[0].id,
    name: body.data[0].name,
  };
}

test.describe('C4 Cart API', () => {
  let cartId: string | undefined;

  test.afterEach(async ({ request }) => {
    if (cartId) {
      const deleteResponse = await request.delete(`${apiUrl}/carts/${cartId}`);
      expect(deleteResponse.ok()).toBeTruthy();
      cartId = undefined;
    }
  });

  test('C4 Add to a cart', async ({ request }) => {
    const product = await getFirstProduct(request);

    // 1. Create a new cart (expects 201)
    const createResponse = await request.post(`${apiUrl}/carts`);
    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    expect(createBody.id).toBeTruthy();
    cartId = createBody.id;

    // 2. Add the product to the cart (expects 200)
    const addResponse = await request.post(`${apiUrl}/carts/${cartId}`, {
      data: {
        product_id: product.id,
        quantity: 1,
      },
    });
    expect(addResponse.status()).toBe(200);

    // 3. Check that the cart now contains that product
    const getCartResponse = await request.get(`${apiUrl}/carts/${cartId}`);
    expect(getCartResponse.status()).toBe(200);

    const cartBody = await getCartResponse.json();
    const addedItem = cartBody.cart_items.find(
      (item: { product_id: string; quantity: number }) => item.product_id === product.id
    );

    expect(addedItem).toBeDefined();
    expect(addedItem.quantity).toBe(1);
  });
});