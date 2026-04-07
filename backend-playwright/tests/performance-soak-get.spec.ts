import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Soak Testing (Products)', () => {

  test.beforeAll(async () => {
    // Autenticación antes de todas las pruebas
    await getToken();
  });

  test('should sustain load over time without degradation', async ({ request }) => {
    const productsService = new ProductsService(request);
    // Número de usuarios concurrentes (moderado, no extremo)
    const concurrentUsers = 10;
    // Duración total del test (ej: 30 segundos)
    const testDurationMs = 30000;
    // Intervalo entre ejecuciones
    const intervalMs = 3000;
    const startTime = Date.now();
    let iteration = 0;
    while (Date.now() - startTime < testDurationMs) {
      iteration++;
      const iterationStart = Date.now();
      // Ejecutamos carga concurrente en cada iteración
      const responses = await Promise.allSettled(
        Array.from({ length: concurrentUsers }, () =>
          productsService.getProducts()
        )
      );
      let successCount = 0;
      let failureCount = 0;
      for (const result of responses) {
        if (result.status === 'fulfilled' && result.value.status() === 200) {
          successCount++;
        } else {
          failureCount++;
        }
      }
      const iterationTime = Date.now() - iterationStart;
      // Logs por iteración (clave en soak testing)
      console.log(`Iteration: ${iteration}`);
      console.log(`Success: ${successCount}`);
      console.log(`Failures: ${failureCount}`);
      console.log(`Iteration time: ${iterationTime} ms`);
      // Validación básica: el sistema sigue respondiendo
      expect(successCount).toBeGreaterThan(0);
      // Esperamos antes de la siguiente iteración
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    console.log('Soak test completed');
  });

});
