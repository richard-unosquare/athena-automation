import { Page, Locator } from '@playwright/test';

export class DashboardPage {

  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.locator('//h2[contains(text(),"Secure Area")]');
    this.logoutButton = page.locator('//a/i[contains(text(),"Logout")]');
  }

}