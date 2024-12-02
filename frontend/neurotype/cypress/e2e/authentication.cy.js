// cypress/e2e/authentication.cy.js

describe("User Authentication", () => {
  // Define variables to hold unique emails and passwords
  let uniqueEmail;
  let existingEmail;
  let existingPassword;
  let loginEmail;
  let loginPassword;

  before(() => {
    // Generate unique emails using timestamp and random numbers
    const timestamp = Date.now();
    uniqueEmail = `user_${timestamp}_${Math.floor(Math.random() * 10000)}@example.com`;
    existingEmail = `existinguser_${timestamp}_${Math.floor(Math.random() * 10000)}@example.com`;
    loginEmail = `loginuser_${timestamp}_${Math.floor(Math.random() * 10000)}@example.com`;

    // Define passwords
    existingPassword = `AnotherP@ssw0rd_${Math.floor(Math.random() * 1000)}`;
    loginPassword = `LoginP@ssw0rd_${Math.floor(Math.random() * 1000)}`;

    // Intercept registration and login API calls
    cy.intercept("POST", "/register").as("registerUser");
    cy.intercept("POST", "/login").as("loginUser");

    // Register existingEmail
    cy.request({
      method: "POST",
      url: "http://backend:8000/register",
      body: {
        email: existingEmail,
        password: existingPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 201 || response.status === 200) {
        cy.log(`Registered user: ${existingEmail}`);
      } else if (
        response.status === 400 &&
        (response.body.detail === "Email already registered." ||
          response.body.message === "Email already exists.") // Adjust based on actual backend message
      ) {
        cy.log(`User already exists: ${existingEmail}`);
      } else {
        throw new Error(
          `Failed to register existing user: ${existingEmail}. Status: ${response.status}. Response: ${JSON.stringify(response.body)}`,
        );
      }
    });

    // Register loginEmail
    cy.request({
      method: "POST",
      url: "http://backend:8000/register",
      body: {
        email: loginEmail,
        password: loginPassword,
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status === 201 || response.status === 200) {
        cy.log(`Registered user: ${loginEmail}`);
      } else if (
        response.status === 400 &&
        (response.body.detail === "Email already registered." ||
          response.body.message === "Email already exists.") // Adjust based on actual backend message
      ) {
        cy.log(`User already exists: ${loginEmail}`);
      } else {
        throw new Error(
          `Failed to register login user: ${loginEmail}. Status: ${response.status}. Response: ${JSON.stringify(response.body)}`,
        );
      }
    });
  });

  beforeEach(() => {
    // Stub window.alert to prevent actual alerts during tests
    cy.stub(window, "alert").as("windowAlert");
  });

  it("should register a new user successfully", () => {
    cy.log(`Unique Email: ${uniqueEmail}`);
    cy.visit("/register");

    // Ensure the registration form is visible
    cy.get("[data-cy=email-input]", { timeout: 10000 })
      .should("be.visible")
      .type(uniqueEmail);
    cy.get("[data-cy=password-input]")
      .should("be.visible")
      .type("SecureP@ssw0rd");
    cy.get("[data-cy=confirm-password-input]")
      .should("be.visible")
      .type("SecureP@ssw0rd");

    cy.get('button[type="submit"]').should("be.enabled").click();

    // Wait for the registration API call to complete and check its status
    cy.wait("@registerUser").then((interception) => {
      expect([200, 201]).to.include(interception.response.statusCode);
      cy.log(`Registration response:`, interception.response);
    });

    // Verify navigation to /select-plan
    cy.url({ timeout: 10000 }).should("include", "/select-plan");
    cy.contains("Select your plan").should("be.visible");

    // Verify that alert was called with the correct message
    cy.get("@windowAlert").should(
      "be.calledWith",
      "Registration and login successful",
    );
  });

  it("should not allow registration with an existing email", () => {
    cy.visit("/register");

    cy.get("[data-cy=email-input]", { timeout: 10000 })
      .should("be.visible")
      .type(existingEmail);
    cy.get("[data-cy=password-input]")
      .should("be.visible")
      .type(existingPassword);
    cy.get("[data-cy=confirm-password-input]")
      .should("be.visible")
      .type(existingPassword);

    cy.get('button[type="submit"]').should("be.enabled").click();

    // Wait for the registration API call to complete and check its status
    cy.wait("@registerUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
      cy.log(`Registration failed as expected:`, interception.response);
    });

    // Check for the error message
    cy.contains("Email already registered.").should("be.visible");

    // Ensure the URL remains on /register
    cy.url().should("include", "/register");

    // Optionally, verify that alert was not called
    cy.get("@windowAlert").should("not.be.called");
  });

  it("should log in an existing user successfully", () => {
    cy.visit("/login");

    cy.get("[data-cy=email-input]", { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get("[data-cy=password-input]").should("be.visible").type(loginPassword);

    cy.get('button[type="submit"]').should("be.enabled").click();

    // Wait for the login API call to complete and check its status
    cy.wait("@loginUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      cy.log(`Login response:`, interception.response);
    });

    // Verify navigation to /dashboard
    cy.url({ timeout: 10000 }).should("include", "/dashboard");
    cy.contains("Dashboard").should("be.visible");

    // Verify that alert was called with the correct message
    cy.get("@windowAlert").should("be.calledWith", "Login successful");
  });

  it("should not log in with incorrect credentials", () => {
    cy.visit("/login");

    cy.get("[data-cy=email-input]", { timeout: 10000 })
      .should("be.visible")
      .type("nonexistentuser@example.com");
    cy.get("[data-cy=password-input]")
      .should("be.visible")
      .type("WrongPassword");

    cy.get('button[type="submit"]').should("be.enabled").click();

    // Wait for the login API call to complete and check its status
    cy.wait("@loginUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(401); // Adjust based on backend's response
      cy.log(`Login failed as expected:`, interception.response);
    });

    // Check for the error message
    cy.contains("Invalid email or password.").should("be.visible");

    // Ensure the URL remains on /login
    cy.url().should("include", "/login");

    // Optionally, verify that alert was not called
    cy.get("@windowAlert").should("not.be.called");
  });
});
