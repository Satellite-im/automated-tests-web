import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./playwright/specs",
  snapshotPathTemplate: "./playwright/snapshots/{testFilePath}/{arg}{ext}",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["json", { outputFile: "playwright-report/report.json" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
    [
      "@estruyf/github-actions-reporter",
      { title: "Automated Test Report", useDetails: true },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 120000,
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:5173/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    testIdAttribute: "data-cy",
    actionTimeout: 30000,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "desktop-chrome",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            "--disable-web-security",
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
          ],
        },
        video: "retain-on-failure",
      },
    },

    /* Test against mobile viewports. */
    {
      name: "mobile-chrome",
      use: {
        browserName: "chromium",
        ...devices["Pixel 5"], // Use predefined mobile device
        launchOptions: {
          args: [
            "--disable-web-security",
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
          ],
        },
        video: "retain-on-failure",
      },
      testIgnore: "./playwright/specs/13-settings-keybinds.spec.ts",
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: "cd .. && npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
  },
});
