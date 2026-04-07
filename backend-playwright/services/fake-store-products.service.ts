import { APIRequestContext } from '@playwright/test';
import { ENV } from '../config/env-fakestore';
import { TOKEN } from './fake-store-auth.service';

export class ProductsService {

  constructor(private request: APIRequestContext) {}

  private getHeaders() {
    return {
      ...ENV.HEADERS,
      Authorization: `Bearer ${TOKEN}`
    };
  }

  async getProducts() {
    return await this.request.get(
      `${ENV.BASE_URL}/products`,
      { headers: this.getHeaders() }
    );
  }

  async getProductById(id: number) {
    return await this.request.get(
      `${ENV.BASE_URL}/products/${id}`,
      { headers: this.getHeaders() }
    );
  }

  async createProduct(body: any) {
    return await this.request.post(
      `${ENV.BASE_URL}/products`,
      {
        headers: this.getHeaders(),
        data: body
      }
    );
  }

  async updateProduct(id: number, body: any) {
    return await this.request.put(
      `${ENV.BASE_URL}/products/${id}`,
      {
        headers: this.getHeaders(),
        data: body
      }
    );
  }

  async deleteProduct(id: number) {
    return await this.request.delete(
      `${ENV.BASE_URL}/products/${id}`,
      { headers: this.getHeaders() }
    );
  }

}