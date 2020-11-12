/// <reference types="Cypress" />
import terminalLog from "../support/terminalLog";

context("Contact", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  describe("Contact Page", () => {
    it("has the expected, page-specific UI elements", () => {
      cy.get(".is-active-page").should("have.text", "Contact");
      // https://on.cypress.io/window
      cy.contains("Send Message").should("have.length", 1);
      cy.get("[data-testid=fullName]").should("be.empty");
      cy.get("[data-testid=email]").should("be.empty");
      cy.get("[data-testid=messageSubject]").should("be.empty");
      cy.get("[data-testid=messageBody]").should("be.empty");
    });

    it("serves document as utf-8", () => {
      // https://on.cypress.io/document
      cy.document()
        .should("have.property", "charset")
        .and("eq", "UTF-8");
    });

    it("has no a11y violations on load", () => {
      cy.injectAxe();
      cy.checkA11y(null, null, terminalLog);
    });

    it("has the proper page title", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "Inspiring Hope Church");
      cy.title().should("include", "Contact Us | ");
    });
  });

  describe("Contact Form", () => {
    const fullName = "Full Name",
      emailAddress = "email@email.address",
      emailSubject = "The summary to get you interested",
      emailMessage = "The thing to tell you about";

    it("has the expected, page-specific UI elements", () => {
      // https://on.cypress.io/window
      cy.contains("Send Message").should("not.be.enabled");
      cy.get("[data-testid=fullName]").type(fullName);
      cy.get("[data-testid=email]").type(emailAddress);
      cy.get("[data-testid=messageSubject]").type(emailSubject);
      cy.get("[data-testid=messageBody]").type(emailMessage);

      cy.get("[data-testid=fullName]").should("have.value", fullName);
      cy.get("[data-testid=email]").should("have.value", emailAddress);
      cy.get("[data-testid=messageSubject]").should("have.value", emailSubject);
      cy.get("[data-testid=messageBody]").should("have.value", emailMessage);
      cy.contains("Send Message").should("be.enabled");
    });
  });
});
