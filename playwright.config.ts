import { defineConfig } from "@playwright/test";

const externalBaseUrl = process.env["PLAYWRIGHT_BASE_URL"];

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: [["line"]],
  outputDir: ".artifacts/verification/playwright-output",
  use: {
    baseURL: externalBaseUrl ?? "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  ...(externalBaseUrl
    ? {}
    : {
        webServer: {
          command:
            "FATEBATTLE_DIST_DIR=.next-playwright pnpm dev --hostname 127.0.0.1 --port 3100",
          url: "http://127.0.0.1:3100/en",
          reuseExistingServer: false,
          timeout: 120_000,
        },
      }),
});
