import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export class DashboardAssertions {

  private dashboardPage: DashboardPage;

  constructor(dashboardPage: DashboardPage) {
    this.dashboardPage = dashboardPage;
  }

  async verifyDashboardLoaded() {
    await expect(this.dashboardPage.dashboardTitle).toBeVisible();
  }
}