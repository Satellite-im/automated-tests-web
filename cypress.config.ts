import { defineConfig } from "cypress";
const { allureCypress } = require("allure-cypress/reporter");

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      allureCypress(on);
    },
  },
});
