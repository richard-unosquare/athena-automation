import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Stress Testing (Products)', () => {

  test.beforeAll(async () => {
    await getToken();
  });

  test('should handle high load and identify breaking point', async ({ request }) => {
    // Instancia del servicio
    const productsService = new ProductsService(request);
    // Número alto de usuarios para forzar el sistema
    const concurrentUsers = 100;
    // Tiempo inicial
    const startTime = Date.now();
    // Ejecutamos muchas requests en paralelo (más agresivo que load test)
    const responses = await Promise.allSettled(
      Array.from({ length: concurrentUsers }, () =>
        productsService.getProducts()
      )
    );
    // Tiempo final
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    // Contadores para análisis
    let successCount = 0;
    let failureCount = 0;
    for (const result of responses) {
      if (result.status === 'fulfilled') {
        const response = result.value;

        if (response.status() === 200) {
          successCount++;
        } else {
          failureCount++;
        }
      } else {
        // Falló la promesa (timeout, network error, etc.)
        failureCount++;
      }
    }
    // Logs clave para entender el comportamiento bajo estrés
    console.log(`Total requests: ${concurrentUsers}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${failureCount}`);
    console.log(`Total time: ${totalTime} ms`);
    // Aquí NO esperamos 100% éxito (porque es stress test)
    // Solo validamos que al menos algunas funcionen
    expect(successCount).toBeGreaterThan(0);
  });

});