/// <reference types="Cypress" />

context("Contact", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/contact");
  });

  describe("Contact Page", () => {
    it("has the expected, page-specific UI elements", () => {
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

    it("title includes company name", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "ORB IT Solutions");
    });
  });

  describe("Contact Form", () => {
    it("has the proper page title", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "Contact Us | ");
    });

    it("has the expected, page-specific UI elements", () => {
      // https://on.cypress.io/window
      cy.contains("Send Message").should("not.be.enabled");
      cy.get("[data-testid=fullName]").type("Full Name");
      cy.get("[data-testid=email]").type("email@email.address");
      cy.get("[data-testid=messageSubject]").type(
        "The summary to get you interested"
      );
      cy.get("[data-testid=messageBody]").type("The thing to tell you about");
      cy.contains("Send Message").should("be.enabled");
    });
  });
});
