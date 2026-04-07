import { test, expect } from '@playwright/test';
import { ActivitiesService } from '../services/activities.service';

let activityId: number;

test.describe('Activities API Tests', () => {

  test('GET all activities', async ({ request }) => {
    const activities = new ActivitiesService(request);
    const response = await activities.getActivities();
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });


  test('POST create activity', async ({ request }) => {
    const activities = new ActivitiesService(request);
    const response = await activities.createActivity({
      name: "Playwright Activity",
      description: "created by automation"
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    activityId = body.id;
  });


  test('GET activity by id', async ({ request }) => {
    const activities = new ActivitiesService(request);
    const response = await activities.getActivityById(activityId);
    expect(response.status()).toBe(200);
  });


  test('PUT update activity', async ({ request }) => {
    const activities = new ActivitiesService(request);
    const response = await activities.updateActivity(activityId, {
      name: "Updated Activity",
      description: "updated by automation"
    });
    expect(response.status()).toBe(200);
  });


  test('DELETE activity', async ({ request }) => {
    const activities = new ActivitiesService(request);
    const response = await activities.deleteActivity(activityId);
    expect(response.status()).toBe(200);
  });

});