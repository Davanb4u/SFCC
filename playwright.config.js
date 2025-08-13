const { devices } = require('@playwright/test');
const config = {
  testDir: './tests',
  timeout: 1000000,
  expect: {
    timeout: 10000
  },
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: [
    ['list'],
    ['allure-playwright'], 
    ['html', { outputFolder: 'playwright-report', open: 'never',embedVideo: true, }]
  ],
  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 300 * 1000,
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'only-on-failure',
    recordVideo: {
      size: { width: 1920, height: 1080 }
    },
    trace: 'retain-on-failure',
    viewport: { width: 1880, height: 1020 },
  },
};

module.exports = config;
