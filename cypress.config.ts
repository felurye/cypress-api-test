import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "jv3vn6",
  e2e: {
    baseUrl: "https://serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.ts",
    requestTimeout: 6000,
    responseTimeout: 6000,
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {},
    env: {
      requestMode: true,
    },
  },
});
