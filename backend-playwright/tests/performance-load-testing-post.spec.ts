import { test, expect } from '@playwright/test';
import { ProductsService } from '../services/fake-store-products.service';
import { getToken } from '../services/fake-store-auth.service';

test.describe('Performance - Load Testing (Create Product)', () => {

  test.beforeAll(async () => {
    await getToken();
  });

  test('should handle concurrent product creation requests', async ({ request }) => {
    // Instancia del servicio (siguiendo tu framework)
    const productsService = new ProductsService(request);
    // Número de usuarios concurrentes (creando productos al mismo tiempo)
    const concurrentUsers = 10;
    // Payload base para crear productos
    const basePayload = {
      title: "playwright-product",
      price: 99.99,
      description: "Playwright API test product",
      image: "https://i.pravatar.cc",
      category: "electronics"
    };
    // Tiempo inicial
    const startTime = Date.now();
    // Ejecutamos múltiples POST en paralelo
    const responses = await Promise.all(
      // Creamos N requests concurrentes
      Array.from({ length: concurrentUsers }, (_, index) =>
        // Cada request crea un producto con un título único
        // (evita conflictos o duplicados en algunos APIs)
        productsService.createProduct({
          ...basePayload,
          title: `${basePayload.title}-${index}`
        })
      )
    );
    // Tiempo final
    const endTime = Date.now();
    // Tiempo total de ejecución
    const totalTime = endTime - startTime;
    // Validamos que todas las respuestas sean exitosas (201 Created)
    for (const response of responses) {
      expect(response.status()).toBe(201);
    }
    // Validamos el tiempo total de ejecución (threshold de performance)
    expect(totalTime).toBeLessThan(9000);
    // Log para análisis
    console.log(`Load test POST: ${concurrentUsers} creations in ${totalTime} ms`);
  });

});
