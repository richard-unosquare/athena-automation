import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoginActions } from '../actions/LoginActions';
import { LoginAssertions } from '../assertions/LoginAssertions';
import { DashboardPage } from '../pages/DashboardPage';
import { DashboardActions } from '../actions/DashboardActions';
import { DashboardAssertions } from '../assertions/DashboardAssertions';

export class AppFixture {
  readonly loginPage: LoginPage;
  readonly loginActions: LoginActions;
  readonly loginAssertions: LoginAssertions;
  readonly dashboardPage: DashboardPage;
  readonly dashboardActions: DashboardActions;
  readonly dashboardAssertions: DashboardAssertions;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.loginActions = new LoginActions(this.loginPage);
    this.loginAssertions = new LoginAssertions(this.loginPage);

    this.dashboardPage = new DashboardPage(page);
    this.dashboardActions = new DashboardActions(this.dashboardPage);
    this.dashboardAssertions = new DashboardAssertions(this.dashboardPage);
  }
}
