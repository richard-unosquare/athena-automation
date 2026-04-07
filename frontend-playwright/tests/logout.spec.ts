import { test } from '../fixtures/test-fixtures';
import { ENV } from '../config/env';

test.describe('Logout Tests', () => {

  test('User can logout successfully', async ({ app }) => {
    await app.loginActions.navigate(ENV.INSTANCE_URL);
    await app.loginActions.login(ENV.USERNAME, ENV.PASSWORD);
    await app.dashboardAssertions.verifyDashboardLoaded();
    await app.dashboardActions.logout();
    await app.loginAssertions.verifyLoginLoaded();
  });

});
