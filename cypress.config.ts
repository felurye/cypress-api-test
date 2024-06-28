import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "jv3vn6",
  e2e: {
    baseUrl: "https://serverest.dev",
    requestTimeout: 6000,
    responseTimeout: 6000,
    setupNodeEvents(on, config) {},
    env: {
      requestMode: true,
    },
  },
});
