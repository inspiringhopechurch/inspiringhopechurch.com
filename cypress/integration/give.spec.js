/// <reference types="Cypress" />
import terminalLog from "../support/terminalLog";

context("Give", () => {
  beforeEach(() => {
    cy.visit("/give");
  });

  describe("Give Page", () => {
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
      cy.title().should("include", "Give to Inspiring Hope Church | Inspiring Hope Church");
    });

    it("has a playable how to give video", () => {
      cy.get("#how_to_give_online-video").then((video) => {
        const el = video.get(0);
        el.muted = true;
        el.play();
        return video;
      });
      cy.wait(1000);
      cy.get("#how_to_give_online-video").screenshot("How to Give Online video after starting muted playback");

      cy.get("#how_to_give_online-video").then((video) => {
        const el = video.get(0);
        el.pause();
        return video;
      });
    });

    it("has a playable text to give video", () => {
      cy.get("#text_to_give-video").then((video) => {
        const el = video.get(0);
        el.muted = true;
        el.play();
        return video;
      });
      cy.wait(1000);
      cy.get("#text_to_give-video").screenshot("Text to Give video after starting muted playback");

      cy.get("#text_to_give-video").then((video) => {
        const el = video.get(0);
        el.pause();
        return video;
      });
    });

  });
});
