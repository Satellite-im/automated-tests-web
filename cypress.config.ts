import { Browser } from "@playwright/test";
import { defineConfig } from "cypress";
const fs = require("fs");

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    video: true,
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      on(
        "after:spec",
        (spec: Cypress.Spec, results: CypressCommandLine.RunResult) => {
          if (results && results.video) {
            // Do we have failures for any retry attempts?
            const failures = results.tests.some((test) =>
              test.attempts.some((attempt) => attempt.state === "failed"),
            );
            if (!failures) {
              // delete the video if the spec passed and no tests retried
              fs.unlinkSync(results.video);
            }
          }
        },
      ),
        on("before:browser:launch", (browser: any, launchOptions) => {
          if (browser.family === "chromium" && browser.name !== "electron") {
            //launchOptions.args.push("--use-fake-device-for-media-stream");
          }
        });
    },
  },
});
