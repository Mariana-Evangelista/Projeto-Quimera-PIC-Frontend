import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:3000';
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './playwright/specs',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  reporter: isCI
    ? [['html', { open: 'never' }], ['list']]
    : [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results',
  use: {
    baseURL,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: /.*responsive\.spec\.ts/,
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: process.env.CI ? 'npm run start' : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    env: {
      API_BASE_URL: process.env.API_BASE_URL ?? 'http://localhost:8000',
      API_TIMEOUT_MS: process.env.API_TIMEOUT_MS ?? '30000',
      TEACHER_ACCESS_TOKEN_SECRET: process.env.TEACHER_ACCESS_TOKEN_SECRET ?? 'test-teacher-secret-min-32-chars-long',
      EXPERIMENT_ACCESS_SECRET: process.env.EXPERIMENT_ACCESS_SECRET ?? 'test-experiment-secret-min-32-chars-long',
    },
  },
});