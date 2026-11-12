import { defineConfig, devices } from '@playwright/test';

// The e2e tests run against a locally started backend (BE_dzem_kalkulator) and
// act only as the test user (userId = 1). Never point them at the real backend.
export const API_URL = process.env.E2E_API_URL ?? 'http://localhost:3333/api';
export const TEST_USER_ID = 1;

const { hostname } = new URL(API_URL);
if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
  throw new Error(
    `E2E_API_URL must be local (localhost / 127.0.0.1), got "${hostname}"`
  );
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npx react-scripts start',
    url: 'http://localhost:3000',
    // A dev server that is already running may point at the real backend.
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      BROWSER: 'none',
      PORT: '3000',
      REACT_APP_API_URL: API_URL,
    },
  },
});
