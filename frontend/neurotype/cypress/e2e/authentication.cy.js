// cypress/e2e/authentication.cy.js

describe("User Authentication", () => {
  const uniqueEmail = `user${Date.now()}@example.com`;
  const existingEmail = `existinguser@example.com`;
  const existingPassword = `AnotherP@ssw0rd`;
  const loginEmail = `loginuser@example.com`;
  const loginPassword = `LoginP@ssw0rd`;

  before(() => {
    cy.request("POST", "http://backend:8000/register", {
      email: existingEmail,
      password: existingPassword,
    });

    cy.request("POST", "http://backend:8000/register", {
      email: loginEmail,
      password: loginPassword,
    });
  });

  after(() => {});

  it("should register a new user successfully", () => {
    cy.visit("/register");

    cy.get('input[placeholder="Email"]').type(uniqueEmail);
    cy.get('input[placeholder="Password"]').type("SecureP@ssw0rd");
    cy.get('input[placeholder="Confirm Password"]').type("SecureP@ssw0rd");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/select-plan");

    cy.contains("Select your plan").should("be.visible");
  });

  it("should not allow registration with an existing email", () => {
    cy.visit("/register");

    cy.get('input[placeholder="Email"]').type(existingEmail);
    cy.get('input[placeholder="Password"]').type("AnotherP@ssw0rd");
    cy.get('input[placeholder="Confirm Password"]').type("AnotherP@ssw0rd");

    cy.get('button[type="submit"]').click();

    cy.contains("Email already registered").should("be.visible");

    cy.url().should("include", "/register");
  });

  it("should log in an existing user successfully", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').type(loginEmail);
    cy.get('input[placeholder="Password"]').type(loginPassword);

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");

    cy.contains("Dashboard").should("be.visible");
  });

  it("should not log in with incorrect credentials", () => {
    cy.visit("/login");

    cy.get('input[placeholder="Email"]').type("nonexistentuser@example.com");
    cy.get('input[placeholder="Password"]').type("WrongPassword");

    cy.get('button[type="submit"]').click();

    cy.contains("Invalid email or password").should("be.visible");

    cy.url().should("include", "/login");
  });
});
