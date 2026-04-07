import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

export class DashboardActions {

  private dashboardPage: DashboardPage;

  constructor(dashboardPage: DashboardPage) {
    this.dashboardPage = dashboardPage;
  }

  async logout() {
    await expect(this.dashboardPage.logoutButton).toBeVisible();
    await this.dashboardPage.logoutButton.click();
  }

}