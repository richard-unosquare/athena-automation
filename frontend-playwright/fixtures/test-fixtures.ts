import { test as base, expect as baseExpect } from '@playwright/test';
import { AppFixture } from './AppFixture';

export type TestFixtures = {
  app: AppFixture;
};

export const test = base.extend<TestFixtures>({
  app: async ({ page }, use) => {
    const app = new AppFixture(page);
    await use(app);
  },
});

export const expect = baseExpect;
