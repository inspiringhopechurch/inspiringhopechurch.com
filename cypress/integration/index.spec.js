/// <reference types="Cypress" />

const { Children } = require("react");

context("Index", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000");
  });

  describe("Home Page", () => {
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

    it("has the expected, navigation elements", () => {
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
        .should(($items) => {
          expect($items, "menu entries").to.have.length(3);
          expect($items.eq(0), "first").to.contain("Who We Are");
          expect($items.eq(1), "second").to.contain("Our Beliefs");
          expect($items.eq(2), "third").to.contain("Our Mission");
        });
      cy.get(".navbar-dropdown")
        .invoke("hide")
        .children()
        .should("be.hidden");
    });

    it("has a playable hero video", () => {
      cy.get("#hero-video").then((video) => {
        const el = video.get(0);
        el.muted = true;
        el.play();
        return video;
      });
      cy.wait(2000);
      cy.get("#hero-video").screenshot("Video after starting muted playback");

      cy.get("#hero-video").then((video) => {
        const el = video.get(0);
        el.textTracks[0].mode = "showing";
        return video;
      });
      cy.wait(2000);
      cy.get("#hero-video").screenshot("Video after showing first subtitle track");

      cy.get("#hero-video").then((video) => {
        const el = video.get(0);
        el.textTracks[0].mode = "hidden";
        el.textTracks[1].mode = "showing";
        return video;
      });
      cy.wait(3000);
      cy.get("#hero-video").screenshot("Video after showing second subtitle track");
    });

    it("has a usable newsletter signup form", () => {
      cy.get("#subscribe").should("exist");
      cy.get("[data-testid=submit-button]").should("exist");
      cy.get(".container > .content").should("have.text", "Get Inspiring Hope's latest updates.");

      cy.get("#subscribe").type("admininspiringhopechurch.com");
      cy.get("[data-testid=submit-button]").click();
      cy.get("[data-testid=submit-button] svg").should("exist");
      cy.get(".container > .content").should("contain.text", "We encountered an error.");

      cy.get("#subscribe").type("admin@inspiringhopechurch.com");
      cy.get("[data-testid=submit-button]").click();
      cy.get("[data-testid=submit-button] svg").should("exist");
      cy.get(".container > .content > div").should("contain.text", "Check your inbox");
    });
  });
});