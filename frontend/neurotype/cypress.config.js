// cypress.config.js

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://frontend:80",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {},
  },
});
