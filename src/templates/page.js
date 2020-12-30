import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { cleanHtml, cleanHtmlForVideo } from "../utils";
import { RefTagger } from "../components/reftagger";
import ContactForm from "../components/contactForm";
import Accordion from "../components/accordion";
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
  const pageName = page.title;
  const isBeliefPage = location?.pathname.includes('/about/beliefs');
  const isMissionPage = location?.pathname.includes('/about/mission');
  const isGivePage = location?.pathname.includes('/give');
  let accordionContent = {};
  let accordionHeader = '';
  const isBrowser = typeof document !== 'undefined';

  // Since we don't have access to the DOM when server-side rendering,
  // only run the code below if in the browser.
  if ( isBeliefPage && isBrowser ) {
    const beliefsList = page.html.split(/<!--kg-card-begin: .*?-->/);

    let temporaryEl = document.createElement('div');
    // Skip the first entry (0) because its empty
    for (let idx=1; idx < beliefsList.length; idx++) {
      temporaryEl.innerHTML = cleanHtml(beliefsList[idx]).__html;
      if (idx === 1 && (temporaryEl.firstChild.tagName.toLowerCase() === 'h1') ) {
        accordionHeader = temporaryEl.firstChild.innerText;
      } else if (temporaryEl.firstChild.tagName.toLowerCase() === 'h2') {
        // Increment the beliefsList index because, the way this is set up in Ghost,
        // we *should* have an h2 tag, followed directly by the accordion content in a div. 
        accordionContent[temporaryEl.firstChild.innerText] = cleanHtml(beliefsList[++idx]).__html;
      }
    }
  }

  if (isGivePage) {
    const howToGiveOnlineVideoPlaceholder=`<div class=\"container\" data-id=\"how_to_give_online\"></div>`;
    const textToGiveVideoPlaceholder=`<div class=\"container\" data-id=\"text_to_give\"></div>`;

    const howToGiveOnlineVideo = `<div class="container" data-id="how_to_give_online">
      <figure className="image is-16by9">
        <video
          class="has-ratio"
          controls="${true}"
          id="hero-video"
          width="100%"
          height="100%"
          preload="metadata"
          poster="${howToVideoPoster}"
        >
          <source src="/assets/how_to_give_online.webm" type="video/webm" />
          <source src="/assets/how_to_give_online.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src={captionEn} />
          <track kind="captions" srcLang="es" label="Español" src={captionEs} />
          Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
        </video>
      </figure></div>`;

    const textToGiveVideo = `<div class="container" data-id="text_to_give">
      <figure className="image is-16by9">
        <video
          class="has-ratio"
          controls="${true}"
          id="hero-video"
          width="100%"
          height="100%"
          preload="metadata"
          poster="${textToVideoPoster}"
        >
          <source src="/assets/text_to_give.webm" type="video/webm" />
          <source src="/assets/text_to_give.mp4" type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" src={captionEn} />
          <track kind="captions" srcLang="es" label="Español" src={captionEs} />
          Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
        </video>
      </figure></div>`;

      page.html = page.html.replace(howToGiveOnlineVideoPlaceholder, howToGiveOnlineVideo);
      page.html = page.html.replace(textToGiveVideoPlaceholder,textToGiveVideo);
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
            <h1 className="title is-size-1-mobile">{pageName}</h1>
          </div>
        </div>
      </section>

      <section className="box container is-shadowless">
        <div className="columns content is-medium is-centered">
          {/* The main page content */}
          {isBeliefPage ? 
            (isBrowser ?
              <div className="column is-two-thirds">
                {<h1 className="title is-size-1 is-uppercase has-text-centered" dangerouslySetInnerHTML={{__html: accordionHeader}} />}
                {Object.keys(accordionContent).map((title, idx) => (
                  <Accordion key={title} title={title} isExpanded={idx === 0 ? true : false}>
                    <div dangerouslySetInnerHTML={{__html: accordionContent[title]}} />
                  </Accordion>
                ))}
              </div> :
              <div className="column is-two-thirds" dangerouslySetInnerHTML={cleanHtml(page.html)} />
            ) :
            <div className="column is-two-thirds" dangerouslySetInnerHTML={isGivePage ? cleanHtmlForVideo(page.html) : cleanHtml(page.html)} />}
          { location && (isBeliefPage || isMissionPage) && <RefTagger bibleVersion="HCSB" />}
        </div>

        { location.pathname === '/get-connected' && (
          <div className="columns content is-medium is-centered">
            <div className={`column is-two-thirds`}>
              <ContactForm formTitle={"Get in Touch"} submitButtonTitle={"Send Message"} />
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
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
