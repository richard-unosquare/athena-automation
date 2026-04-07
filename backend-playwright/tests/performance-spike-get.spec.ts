import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Spike Testing (Products)', () => {
  test.beforeAll(async () => {
    // Autenticación antes de todas las pruebas
    await getToken();
  });
  test('should handle sudden spike in traffic', async ({ request }) => {
    const productsService = new ProductsService(request);
    // 🔹 Fase 1: carga normal
    const normalLoad = 5;
    const normalResponses = await Promise.all(
      Array.from({ length: normalLoad }, () =>
        productsService.getProducts()
      )
    );
    // Validamos que bajo carga normal todo funciona
    for (const response of normalResponses) {
      expect(response.status()).toBe(200);
    }
    console.log(`Normal load (${normalLoad}) completed`);
    // 🔥 Fase 2: SPIKE (aumento repentino)
    const spikeLoad = 100;
    const startTime = Date.now();
    const spikeResponses = await Promise.allSettled(
      Array.from({ length: spikeLoad }, () =>
        productsService.getProducts()
      )
    );
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    // Contadores
    let successCount = 0;
    let failureCount = 0;
    for (const result of spikeResponses) {
      if (result.status === 'fulfilled') {
        const response = result.value;

        if (response.status() === 200) {
          successCount++;
        } else {
          failureCount++;
        }
      } else {
        failureCount++;
      }
    }
    // Logs importantes
    console.log(`Spike load: ${spikeLoad}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log(`Total time: ${totalTime} ms`);
    // Validación: el sistema no debe colapsar completamente
    expect(successCount).toBeGreaterThan(0);
  });
});
