import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Spike Testing (Create Product)', () => {

  test.beforeAll(async () => {
    // Autenticación antes de todas las pruebas
    await getToken();
  });

  test('should handle sudden spike in product creation', async ({ request }) => {
    const productsService = new ProductsService(request);
    // 🔹 Fase 1: carga normal (pocas creaciones)
    const normalLoad = 3;
    const basePayload = {
      title: "spike-product",
      price: 99.99,
      description: "Spike test product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    };
    const normalResponses = await Promise.all(
      Array.from({ length: normalLoad }, (_, index) =>
        productsService.createProduct({
          ...basePayload,
          title: `${basePayload.title}-normal-${index}` // evitar duplicados
        })
      )
    );
    // Validamos que bajo carga normal todo funciona
    for (const response of normalResponses) {
      expect(response.status()).toBe(201);
    }
    console.log(`Normal load (${normalLoad}) completed`);
    // 🔥 Fase 2: SPIKE (muchas creaciones de golpe)
    const spikeLoad = 50;
    const startTime = Date.now();
    const spikeResponses = await Promise.allSettled(
      Array.from({ length: spikeLoad }, (_, index) =>
        productsService.createProduct({
          ...basePayload,
          title: `${basePayload.title}-spike-${index}` // evitar duplicados
        })
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

        if (response.status() === 201) {
          successCount++;
        } else {
          failureCount++;
        }
      } else {
        // Error de red, timeout, etc.
        failureCount++;
      }
    }
    // Logs importantes
    console.log(`Spike load: ${spikeLoad}`);
    console.log(`Successful creations: ${successCount}`);
    console.log(`Failed creations: ${failureCount}`);
    console.log(`Total time: ${totalTime} ms`);
    // Validación: el sistema no debe colapsar completamente
    expect(successCount).toBeGreaterThan(0);
  });

});
