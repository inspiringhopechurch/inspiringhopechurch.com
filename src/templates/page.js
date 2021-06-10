import React, { useEffect } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { cleanHtml, cleanHtmlForVideo, generateVideoSnippet } from "../utils";
import { RefTagger } from "../components/reftagger";
import ContactForm from "../components/contactForm";
import Accordion from "../components/accordion";
import FancyHeading from "../components/fancyHeading";
import SEO from "../components/seo";
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
  let videoList = [];
  const isBrowser = typeof document !== "undefined";

  // Since we don't have access to the DOM when server-side rendering,
  // only run the code below if in the browser.
  if (isBeliefPage && isBrowser) {
    const beliefsList = page.html.split(/<!--kg-card-begin: .*?-->/);

    let temporaryEl = document.createElement("div");
    // Skip the first entry (0) because its empty
    for (let idx = 1; idx < beliefsList.length; idx++) {
      temporaryEl.innerHTML = cleanHtml(beliefsList[idx]).__html;
      if (idx === 1 && temporaryEl.firstElementChild.tagName.toLowerCase() === "h1") {
        pageHeading = temporaryEl.firstElementChild.innerHTML;
      } else if (temporaryEl.firstElementChild.tagName.toLowerCase() === "h2") {
        // Increment the beliefsList index because, the way this is set up in Ghost,
        // we *should* have an h2 tag, followed directly by the accordion content in a div.
        pageContent[temporaryEl.firstElementChild.textContent.trim()] = cleanHtml(
          beliefsList[++idx]
        ).__html;
      }
    }
  }

  // We search for data-id attributes here. If found, we get the filename to be used when
  // replacing a placeholder container with our native video playback code.
  if (isGivePage) {
    const search = /data-id=["|'](.*?)["|']/gm; // Look for file name within data-id attribute
    const filenameList = [];
    let filenameMatch = search.exec(page.html);
    filenameMatch && filenameList.push(filenameMatch[1])

    // We don't get ALL the matches, just the first one. So we loop until
    // no more are returned
    while (filenameMatch != null) {
      filenameMatch = search.exec(page.html);
      filenameMatch && filenameList.push(filenameMatch[1])
    }

    videoList = filenameList;

    filenameList.forEach(file => {
      const videoPlaceholder = `<div class="container" data-id="${file}"></div>`;
      const videoSnippet = generateVideoSnippet(file, `${file}.jpg`);
      page.html = page.html.replace(videoPlaceholder, videoSnippet);
    })
  }


  useEffect(() => {
    if (videoList.length > 0) {
      videoList.forEach(file => {
        const vidContainer = document.querySelector(`#${file}`);

        import("../components/videoPlayer").then(component => {
          const VideoPlayer = component.default;
          render(
            <VideoPlayer
              enCaption={{ src: `/assets/${file}.en.vtt` }}
              esCaption={{ src: `/assets/${file}.es.vtt` }}
              mp4Src={`/assets/${file}.mp4`}
              webmSrc={`/assets/${file}.webm`}
              posterImg={`/assets/${file}.jpg`}
              preload
            />, vidContainer)
        }).catch(error => console.log("Could not load video player because: ", error))

      })
    }
  })

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

      <section className="generated-page section container">
        <div className="columns content is-medium is-centered">
          {/* The main page content */}
          {isBeliefPage ?
            (isBrowser ?
              <div className="column is-two-thirds">
                {<FancyHeading className="has-text-centered" heading={pageHeading} />}
                {Object.keys(pageContent).map((title, idx) => (
                  <Accordion key={title} title={title} isExpanded={idx === 0 ? true : false}>
                    <div dangerouslySetInnerHTML={{ __html: pageContent[title] }} />
                  </Accordion>
                ))}
              </div> :
              <div className="column is-two-thirds" dangerouslySetInnerHTML={cleanHtml(page.html)} />
            ) :
            <div className="column is-two-thirds" dangerouslySetInnerHTML={isGivePage ? cleanHtmlForVideo(page.html) : cleanHtml(page.html)} />}
          {/* cleanHtmlForVideo is used explicitly on the give page to remove the video embed iframe during sanitization. */}
          {location && (isBeliefPage || isMissionPage) && <RefTagger bibleVersion="HCSB" />}
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
