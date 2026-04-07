import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Load Testing (Products)', () => {

    test.beforeAll(async () => {
      await getToken();
    });

  test('should handle concurrent requests using ProductsService', async ({ request }) => {
    // Creamos la instancia del servicio (como en tu framework)
    const productsService = new ProductsService(request);
    // Número de usuarios concurrentes simulados
    const concurrentUsers = 20;
    // Guardamos el tiempo inicial
    const startTime = Date.now();
    // Ejecutamos múltiples llamadas al servicio en paralelo
    const responses = await Promise.all(
      // Creamos un array con N "usuarios", Retorna un array de Promises
      Array.from({ length: concurrentUsers }, () =>
        // Cada usuario ejecuta el método del servicio
        productsService.getProducts()
      )
    );
    // Guardamos el tiempo final
    const endTime = Date.now();
    // Calculamos el tiempo total
    const totalTime = endTime - startTime;
    // Validamos que todas las respuestas sean exitosas
    for (const response of responses) {
      expect(response.status()).toBe(200);
    }
    // Validamos el tiempo total de ejecución (threshold de performance)
    expect(totalTime).toBeLessThan(5000);
    // Log para análisis
    console.log(`Load test: ${concurrentUsers} requests completed in ${totalTime} ms`);
  });

});
