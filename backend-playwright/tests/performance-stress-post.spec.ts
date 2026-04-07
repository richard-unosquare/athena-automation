import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Stress Testing (Create Product)', () => {

  test.beforeAll(async () => {
    await getToken();
  });

  test('should handle high load on product creation and detect failures', async ({ request }) => {
    // Instancia del servicio
    const productsService = new ProductsService(request);
    // Número alto de usuarios (más agresivo que load test)
    const concurrentUsers = 50;
    // Payload base
    const basePayload = {
      title: "stress-product",
      price: 99.99,
      description: "Stress test product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    };
    // Tiempo inicial
    const startTime = Date.now();
    // Ejecutamos muchas creaciones en paralelo
    const responses = await Promise.allSettled(
      Array.from({ length: concurrentUsers }, (_, index) =>
        productsService.createProduct({
          ...basePayload,
          title: `${basePayload.title}-${index}` // evitar duplicados
        })
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
    // Logs importantes para análisis de estrés
    console.log(`Total requests: ${concurrentUsers}`);
    console.log(`Successful creations: ${successCount}`);
    console.log(`Failed creations: ${failureCount}`);
    console.log(`Total time: ${totalTime} ms`);
    // En stress test NO esperamos 100% éxito
    // Solo validamos que el sistema aún responde parcialmente
    expect(successCount).toBeGreaterThan(0);
  });

});
