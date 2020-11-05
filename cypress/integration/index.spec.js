/// <reference types="Cypress" />

const { Children } = require("react");

context("Index", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000");
  });

  describe("Home Page", () => {
    it.only("has the expected, navigation elements", () => {
      // https://on.cypress.io/window
      cy.get("[data-testid=logo-link]")
        .children()
        .should("have.length", 1);
      cy.get(".is-active-page").should("have.text", "Home");
      cy.get('.navbar-start > [href="/contact"]').should("have.text", "Contact");
      cy.get(".navbar-link").should("have.text", "About Us");
      cy.get(".navbar-dropdown")
        .invoke("show")
        .children()
        .should("have.length", 3);
    });

    it("serves document as utf-8", () => {
      // https://on.cypress.io/document
      cy.document()
        .should("have.property", "charset")
        .and("eq", "UTF-8");
    });

    it("title includes name", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "Inspiring Hope Church");
    });
  });
});
