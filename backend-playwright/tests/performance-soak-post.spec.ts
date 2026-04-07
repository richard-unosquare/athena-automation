import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Soak Testing (Create Product)', () => {

  test.beforeAll(async () => {
    // Autenticación antes de todas las pruebas
    await getToken();
  });

  test('should sustain product creation over time without degradation', async ({ request }) => {
    const productsService = new ProductsService(request);
    // Número de usuarios concurrentes (moderado)
    const concurrentUsers = 5;
    // Duración total del test (ej: 30 segundos)
    const testDurationMs = 30000;
    // Intervalo entre iteraciones
    const intervalMs = 4000;
    const basePayload = {
      title: "soak-product",
      price: 99.99,
      description: "Soak test product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    };
    const startTime = Date.now();
    let iteration = 0;
    while (Date.now() - startTime < testDurationMs) {
      iteration++;
      const iterationStart = Date.now();
      // Ejecutamos múltiples POST en paralelo en cada iteración
      const responses = await Promise.allSettled(
        Array.from({ length: concurrentUsers }, (_, index) =>
          productsService.createProduct({
            ...basePayload,
            // Título único por iteración y usuario
            title: `${basePayload.title}-iter-${iteration}-user-${index}`
          })
        )
      );
      let successCount = 0;
      let failureCount = 0;
      for (const result of responses) {
        if (result.status === 'fulfilled' && result.value.status() === 201) {
          successCount++;
        } else {
          failureCount++;
        }
      }
      const iterationTime = Date.now() - iterationStart;
      // Logs por iteración (clave en soak testing)
      console.log(`Iteration: ${iteration}`);
      console.log(`Successful creations: ${successCount}`);
      console.log(`Failed creations: ${failureCount}`);
      console.log(`Iteration time: ${iterationTime} ms`);

      // Validación básica: el sistema sigue respondiendo
      expect(successCount).toBeGreaterThan(0);

      // Esperamos antes de la siguiente iteración
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    console.log('Soak POST test completed');
  });

});