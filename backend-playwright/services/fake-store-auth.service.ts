import { request } from '@playwright/test';
import { ENV } from '../config/env-fakestore';

export let TOKEN: string;

export async function getToken() {
  const api = await request.newContext();
  const response = await api.post(`${ENV.BASE_URL}/${ENV.AUTH_ENDPOINT}`, {
    data: {
      username: ENV.AUTH_USERNAME,
      password: ENV.AUTH_PASSWORD
    }
  });
  const body = await response.json();
  TOKEN = body.token;
  return TOKEN;
}