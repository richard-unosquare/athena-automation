import { test } from '../fixtures/test-fixtures';
import { ENV } from '../config/env';

test('User can login successfully', async ({ app }) => {
  await app.loginActions.navigate(ENV.INSTANCE_URL);
  await app.loginActions.login(ENV.USERNAME, ENV.PASSWORD);
  await app.dashboardAssertions.verifyDashboardLoaded();
});
