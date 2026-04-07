import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class LoginAssertions {

  private loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  async verifyLoginLoaded() {
    await expect(this.loginPage.usernameInput).toBeVisible();
  }
}
