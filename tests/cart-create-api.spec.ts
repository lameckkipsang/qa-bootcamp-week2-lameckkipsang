import { test, expect } from '@playwright/test';

const API_URL =
  process.env.API_BASE_URL ||
  process.env.API_URL ||
  'https://api.practicesoftwaretesting.com';

test.describe('Cart Creation and Item API', () => {
  let createdCartId: string | null = null;

  test.afterEach(async ({ request }) => {
    if (createdCartId) {
      const deleteResponse = await request.delete(`${API_URL}/carts/${createdCartId}`);
      expect([200, 204]).toContain(deleteResponse.status());
      createdCartId = null;
    }
  });

  test('creates a cart, adds a product, and checks the response fields', async ({ request }) => {
    //Fetch a real product ID dynamically so nothing depends on hardcoded data
    const productsResponse = await request.get(`${API_URL}/products`);
    expect(productsResponse.status()).toBe(200);
    const productsBody = await productsResponse.json();
    const product = productsBody.data[0];
    expect(product).toBeTruthy();

    //Create a new cart and store its ID immediately for afterEach cleanup
    const createCartResponse = await request.post(`${API_URL}/carts`);
    expect(createCartResponse.status()).toBe(201);
    const createdCart = await createCartResponse.json();
    expect(createdCart.id).toBeTruthy();
    createdCartId = createdCart.id;

    //Add the product to the newly created cart
    const addItemResponse = await request.post(`${API_URL}/carts/${createdCartId}`, {
      data: {
        product_id: product.id,
        quantity: 1,
      },
    });
    expect(addItemResponse.status()).toBe(200);
    const addItemBody = await addItemResponse.json();
    expect(addItemBody.result).toBe('item added or updated');

    // 4. Retrieve the cart and verify all expected response fields
    const getCartResponse = await request.get(`${API_URL}/carts/${createdCartId}`);
    expect(getCartResponse.status()).toBe(200);
    const cartDetails = await getCartResponse.json();

    expect(cartDetails.id).toBe(createdCartId);
    expect(Array.isArray(cartDetails.cart_items)).toBe(true);
    expect(cartDetails.cart_items).toHaveLength(1);
    expect(cartDetails.cart_items[0].product_id).toBe(product.id);
    expect(cartDetails.cart_items[0].quantity).toBe(1);
  });
});