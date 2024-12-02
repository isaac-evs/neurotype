// cypress.config.js

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://frontend:80", // Match the Cypress service's baseUrl
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    defaultCommandTimeout: 10000, // Increase if necessary
  },
});
