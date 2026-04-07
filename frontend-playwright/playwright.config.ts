import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests', // Define the folder where Playwright will look for the test files.
  fullyParallel: true,  // It allows tests within the same file to run in parallel.
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: process.env.CI ? 2 : 0, // Define how many times to retry a test that failed. local=0, ci=2
  workers: process.env.CI ? 1 : 1, // Control how many parallel processes run tests. Each worker can open their own browser.
  reporter: 'html', /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: "",
    trace: 'on-first-retry',
    headless: false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],

});
