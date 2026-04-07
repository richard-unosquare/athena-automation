import { APIRequestContext } from '@playwright/test';
import { ENV } from '../config/env-petstore';

export class PetService {

  constructor(private request: APIRequestContext) {}

  async getPetById(id: number) {
    return await this.request.get(
      `${ENV.BASE_URL}/pet/${id}`,
      { headers: ENV.HEADERS }
    );
  }

  async createPet(body: any) {
    return await this.request.post(
      `${ENV.BASE_URL}/pet`,
      {
        headers: ENV.HEADERS,
        data: body
      }
    );
  }

  async updatePet(body: any) {
    return await this.request.put(
      `${ENV.BASE_URL}/pet`,
      {
        headers: ENV.HEADERS,
        data: body
      }
    );
  }

  async deletePet(id: number) {
    return await this.request.delete(
      `${ENV.BASE_URL}/pet/${id}`,
      { headers: ENV.HEADERS }
    );
  }

  async findPetsByStatus(status: string) {
    return await this.request.get(
      `${ENV.BASE_URL}/pet/findByStatus?status=${status}`,
      { headers: ENV.HEADERS }
    );
  }

}