import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { cleanHtml, cleanHtmlForVideo, generateVideoSnippet } from "../utils";
import { RefTagger } from "../components/reftagger";
import ContactForm from "../components/contactForm";
import Accordion from "../components/accordion";
import FancyHeading from "../components/fancyHeading";
import SEO from "../components/seo";
import howToVideoPoster from "../assets/how_to_give_online.jpg";
import textToVideoPoster from "../assets/text_to_give.jpg";
import "./page.sass";

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
  const page = data.ghostPage;
  const pageTitle = page.title;
  const isBeliefPage = location?.pathname.includes("/about/beliefs");
  const isMissionPage = location?.pathname.includes("/about/mission");
  const isGivePage = location?.pathname.includes("/give");
  let pageContent = {};
  let pageHeading = "";
  const isBrowser = typeof document !== "undefined";

  // Since we don't have access to the DOM when server-side rendering,
  // only run the code below if in the browser.
  if (isBeliefPage && isBrowser) {
    const beliefsList = page.html.split(/<!--kg-card-begin: .*?-->/);

    let temporaryEl = document.createElement("div");
    // Skip the first entry (0) because its empty
    for (let idx = 1; idx < beliefsList.length; idx++) {
      temporaryEl.innerHTML = cleanHtml(beliefsList[idx]).__html;
      if (idx === 1 && temporaryEl.firstChild.tagName.toLowerCase() === "h1") {
        pageHeading = temporaryEl.firstChild.innerText;
      } else if (temporaryEl.firstChild.tagName.toLowerCase() === "h2") {
        // Increment the beliefsList index because, the way this is set up in Ghost,
        // we *should* have an h2 tag, followed directly by the accordion content in a div.
        pageContent[temporaryEl.firstChild.innerText] = cleanHtml(
          beliefsList[++idx]
        ).__html;
      }
    }
  }

  // We search for a placeholder section for our native video playback here, and generate
  // the necessary code. This EXACT code needs to be present in Ghost for this to work.
  if (isGivePage) {
    const howToGiveOnlineVideoPlaceholder = `<div class="container" data-id="how_to_give_online"></div>`;
    const textToGiveVideoPlaceholder = `<div class="container" data-id="text_to_give"></div>`;

    const howToGiveOnlineVideo = generateVideoSnippet(
      "how_to_give_online",
      howToVideoPoster
    );
    const textToGiveVideo = generateVideoSnippet(
      "text_to_give",
      textToVideoPoster
    );

    page.html = page.html.replace(
      howToGiveOnlineVideoPlaceholder,
      howToGiveOnlineVideo
    );
    page.html = page.html.replace(textToGiveVideoPlaceholder, textToGiveVideo);
  }

  return (
    <>
      <SEO
        title={page.meta_title || page.title}
        desc={page.meta_description || page.excerpt}
        banner={page.featureImageSharp?.publicURL}
        pathname={page.slug}
        article
      />

      <section className="generated-page hero is-halfheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <FancyHeading heading={pageTitle} />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="columns content is-medium is-centered">
          {/* The main page content */}
          {isBeliefPage ? 
            (isBrowser ?
              <div className="column is-two-thirds">
                {<FancyHeading className="has-text-centered" heading={pageHeading} />}
                {Object.keys(pageContent).map((title, idx) => (
                  <Accordion key={title} title={title} isExpanded={idx === 0 ? true : false}>
                    <div dangerouslySetInnerHTML={{__html: pageContent[title]}} />
                  </Accordion>
                ))}
              </div> :
              <div className="column is-two-thirds" dangerouslySetInnerHTML={cleanHtml(page.html)} />
            ) :
            <div className="column is-two-thirds" dangerouslySetInnerHTML={isGivePage ? cleanHtmlForVideo(page.html) : cleanHtml(page.html)} />}
            {/* cleanHtmlForVideo is used explicitly on the give page to remove the video embed iframe during sanitization. */}
          { location && (isBeliefPage || isMissionPage) && <RefTagger bibleVersion="HCSB" />}
        </div>

        {location.pathname === "/get-connected" && (
          <div className="columns content is-medium is-centered">
            <div className={`column is-two-thirds`}>
              <ContactForm
                formTitle={"Get in Touch"}
                submitButtonTitle={"Send Message"}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
