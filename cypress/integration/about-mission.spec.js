/// <reference types="Cypress" />

context("Mission", () => {
  beforeEach(() => {
    cy.visit("/about/mission");
  });

  describe("Mission Page", () => {
    it("serves document as utf-8", () => {
      // https://on.cypress.io/document
      cy.document()
        .should("have.property", "charset")
        .and("eq", "UTF-8");
    });

    it("has no a11y violations on load", () => {
      cy.injectAxe();
      cy.checkA11y();
    });

    it("has the proper page title", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "Our Mission | Inspiring Hope Church");
    });

    it("has bible verse references with tooltips", () => {
      cy.get(".tag > .rtBibleRef").each((tag) => {
        cy.wrap(tag).trigger("mouseover");
        cy.get(".rtTooltip").should("exist");
      });
    });
  });
});
