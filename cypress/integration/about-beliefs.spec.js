/// <reference types="Cypress" />

context("Beliefs", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/about/beliefs");
  });

  describe("Beliefs Page", () => {
    it("serves document as utf-8", () => {
      // https://on.cypress.io/document
      cy.document()
        .should("have.property", "charset")
        .and("eq", "UTF-8");
    });

    it("has the proper page title", () => {
      // https://on.cypress.io/title
      cy.title().should("include", "Our Beliefs | Inspiring Hope Church");
    });

    it("has bible verse references with tooltips", () => {
      cy.get(".accordion.expanded + .accordion-content .tag > .rtBibleRef").each(($tag) => {
        cy.wrap($tag).trigger("mouseover");
        cy.get(".rtTooltip").should("exist");
      });
    });

    it("has expanded accordion", () => {
      cy.get(".accordion.expanded").should("exist");
    });

    it("has expandable accordion", () => {
      cy.get(".accordion.expanded").should("have.length", 1);
      cy.get(".accordion")
        .not(".expanded")
        .each(($accordion) => {
          cy.wrap($accordion)
            .find(".expanded")
            .should("not.exist");
          cy.wrap($accordion).trigger("click");
          cy.wrap($accordion)
            .filter(".expanded")
            .should("exist");
        });
      cy.get(".accordion.expanded").each(($accordion) => {
        cy.wrap($accordion).trigger("click");
        cy.wrap($accordion)
          .filter(".expanded")
          .should("not.exist");
      });
      cy.get(".accordion.expanded").should("have.length", 0);
    });
  });
});
