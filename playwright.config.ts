import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './__tests__',
  timeout: 30000,
  retries: 1,
  reporter: 'html',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
