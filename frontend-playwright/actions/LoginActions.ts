import { LoginPage } from '../pages/LoginPage';

export class LoginActions {

  private loginPage: LoginPage;

  constructor(loginPage: LoginPage) {
    this.loginPage = loginPage;
  }

  async navigate(url: string) {
    await this.loginPage.page.goto(url);
  }

  async enterUsername(username: string) {
    await this.loginPage.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.loginPage.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginPage.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

}
