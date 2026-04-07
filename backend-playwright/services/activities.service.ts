import { APIRequestContext } from '@playwright/test';
import { ENV } from '../config/env-timetracker';

export class ActivitiesService {

  constructor(private request: APIRequestContext) {}

  async getActivities() {
    return await this.request.get(
      `${ENV.BASE_URL}/Activities`,
      { headers: ENV.HEADERS }
    );
  }

  async getActivityById(id: number) {
    return await this.request.get(
      `${ENV.BASE_URL}/Activities/${id}`,
      { headers: ENV.HEADERS }
    );
  }

  async createActivity(body: any) {
    return await this.request.post(
      `${ENV.BASE_URL}/Activities`,
      {
        headers: ENV.HEADERS,
        data: body
      }
    );
  }

  async updateActivity(id: number, body: any) {
    return await this.request.put(
      `${ENV.BASE_URL}/Activities/${id}`,
      {
        headers: ENV.HEADERS,
        data: body
      }
    );
  }

  async deleteActivity(id: number) {
    return await this.request.delete(
      `${ENV.BASE_URL}/Activities/${id}`,
      { headers: ENV.HEADERS }
    );
  }

}