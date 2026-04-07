import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

let productId: 1;

test.describe('Products API Tests', () => {

  test.beforeAll(async () => {
    await getToken();
  });

  test('POST create product', async ({ request }) => {
    const products = new ProductsService(request);
    const response = await products.createProduct({
      title: "playwright-product",
      price: 99.99,
      description: "Playwright API test product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    productId = body.id;
    console.log(body);
  });


  test('GET product by id', async ({ request }) => {
    const products = new ProductsService(request);
    const response = await products.getProductById(productId);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('PUT update product', async ({ request }) => {
    const products = new ProductsService(request);
    const response = await products.updateProduct(productId, {
      title: "updated-playwright-product",
      price: 120,
      description: "Updated product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('GET all products', async ({ request }) => {
    const products = new ProductsService(request);
    const response = await products.getProducts();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('DELETE product', async ({ request }) => {
    const products = new ProductsService(request);
    const response = await products.deleteProduct(productId);
    expect(response.status()).toBe(200);
  });
});

test('GET product by id (public test)', async ({ request }) => {
  const products = new ProductsService(request);
  const response = await products.getProductById(1);
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(body);
});