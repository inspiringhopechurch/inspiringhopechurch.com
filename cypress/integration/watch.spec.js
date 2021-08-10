/// <reference types="Cypress" />
import terminalLog from "../support/terminalLog";

context("Watch", () => {
  beforeEach(() => {
    cy.visit("/watch/");
  });

  describe("Encouraging Messages Page", () => {
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
      cy.title().should("include", "Encouraging Messages | Inspiring Hope Church");
    });

    it("has working next buttons", () => {
      cy.get('.pagination-next').should("not.have.class", "is-static");
      cy.get('.pagination-previous').should("have.class", "is-static");
    });

    it("has working pagination buttons", () => {
      cy.get('.pagination-link.is-current').should("have.length", 1);

      cy.get('.pagination-list .pagination-link').each((link, i, list) => {
        cy.visit(link[0].pathname);
        if (i > 0 && i < list.length - 1) {
          cy.get('.pagination-link.is-current').should("have.length", 1);
          cy.get('.pagination-previous').should("not.have.class", "is-static");
          cy.get('.pagination-next').should("not.have.class", "is-static");
          // To prevent the test from taking a long time, end after 5 runs
          if (i === 4) { return false; }
        } else if (i > 0 && i === list.length - 1) {
          cy.get('.pagination-link.is-current').should("have.length", 1);
          cy.get('.pagination-previous').should("not.have.class", "is-static");
          cy.get('.pagination-next').should("have.class", "is-static");
        }
      });
    });

  });
});
