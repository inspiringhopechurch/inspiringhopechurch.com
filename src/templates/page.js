import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { cleanHtml, cleanHtmlForVideo, findGhostSection, generateVideoSnippet } from "../utils";
import { Accordion, ContactForm, FancyHeading, RefTagger, SEO } from "../components";
import easterBg from "../assets/Easter2022_Web_BG_02.jpg";
import easterBgOverlay from "../assets/Easter2022_Web_EASTERLOGO_02.png";
import "./page.sass";

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
  const page = data.ghostPage;
  const pages = data.allGhostPage.edges;
  const pageTitle = page.title;
  const isBeliefPage = location?.pathname.includes("/about/beliefs");
  const isMissionPage = location?.pathname.includes("/about/mission");
  const isGivePage = location?.pathname.includes("/give");
  const isBlogPage = location?.pathname.includes("/blog");
  const isEasterPage = location?.pathname.includes("/easter-sunday");
  let pageContent = {};
  let pageHeading = "";
  let videoList = [];
  const isBrowser = typeof document !== "undefined";

  const kidsSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-kids")
  )?.node;
  const youthSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-youth")
  )?.node;
  const serveSundaySection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-serve-sundays")
  )?.node;
  const inspireGroupsSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-groups")
  )?.node;

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
    let list = []
    if (videoList.length > 0) {
      import("plyr").then(component => {
        videoList.forEach(id => {
          list.push(new component.default(`[id="${id}-video"]`, {
            resetOnEnd: true,
            disableContextMenu: false,
            enabled: true,
            fullscreen: { enabled: true, fallback: true, }
          })
          )
        });
      }).catch(error => console.log("Could not load video player because: ", error))
    }
  })

  return (
    <> {/* eslint-disable react/jsx-pascal-case */}
      <SEO
        title={page.meta_title || page.title}
        desc={page.meta_description || page.excerpt}
        banner={page.featureImageSharp?.publicURL}
        page={isEasterPage ? "Easter" : undefined}
        pathname={page.slug}
        article={isBlogPage}
      />

      <section className="generated-page fade-in hero is-halfheight">
        <div className="hero-body" style={(page.featureImageSharp?.publicURL || isEasterPage) ? {
          background: `url(${page.featureImageSharp?.publicURL})`,
          backgroundImage: `${isEasterPage ? `url(${easterBgOverlay}) , url(${easterBg})` : ""}`,
          backgroundSize: `${isEasterPage ? "contain, cover" : "cover"}`,
          backgroundPosition: `${isEasterPage ? "center, center" : "center"}`,
          backgroundRepeat: `${isEasterPage ? "no-repeat" : ""}`,
        } : {}}>
          {!isEasterPage && (
            <div className="container has-text-centered">
              <FancyHeading heading={pageTitle} />
            </div>
          )}
        </div>
      </section>

      <section className={`${isEasterPage ? 'easter-page ' : ''}generated-page section container`}>
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

        {isEasterPage && (
          <div className="columns content is-medium is-centered">
            <div className="column is-two-thirds">
              <section className="easter-page groups-section">
                {kidsSection && (
                  <div className="columns container" dangerouslySetInnerHTML={cleanHtml(kidsSection.html)} />
                )}
                {youthSection && (
                  <div className="columns container" dangerouslySetInnerHTML={cleanHtml(youthSection.html)} />
                )}
                {serveSundaySection && (
                  <div className="columns container" dangerouslySetInnerHTML={cleanHtml(serveSundaySection.html)} />
                )}
                {inspireGroupsSection && (
                  <div className="columns container" dangerouslySetInnerHTML={cleanHtml(inspireGroupsSection.html)} />
                )}
              </section>
              <hr />
            </div>
          </div>
        )}
        {(location.pathname === "/get-connected" || location.pathname.startsWith("/events")) && (
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
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default Page;

export const postQuery = graphql`
  query ($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
    allGhostPage(
      filter: { tags: { elemMatch: { name: { eq: "Home Page" } } } }
    ) {
      edges {
        node {
          html
          title
          slug
        }
      }
    }
  }
`;
