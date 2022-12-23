import React, { useEffect } from "react";
import { graphql, type HeadProps, type PageProps } from "gatsby";
import { cleanHtml, cleanHtmlForVideo, findGhostSection, generateVideoSnippet } from "../utils";
import { Accordion, ContactForm, FancyHeading, RefTagger, SEO } from "../components";
import easterBg from "../assets/Easter2022_Web_BG_02.jpg";
import easterBgOverlay from "../assets/Easter2022_Web_EASTERLOGO_02.png";
import "./page.sass";

type PageDataProps = {
  ghostPage: Queries.GhostPage
  allGhostPage: Queries.GhostPageConnection
};

/**
 * Single page (/:slug)
 * This file renders a single page and loads all its content.
 */
const Page = ({ data, location }: PageProps<PageDataProps>) => {
  const page = data.ghostPage;
  const pages = data.allGhostPage.edges;
  const isBeliefPage = location?.pathname.includes("/about/beliefs");
  const isMissionPage = location?.pathname.includes("/about/mission");
  const isGivePage = location?.pathname.includes("/give");
  const isEasterPage = location?.pathname.includes("/easter-sunday");
  let pageContent = {} as Record<string, string>;
  let pageHeading = "";
  let pageHtmlMod = "";
  let videoList: string[] = [];

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

  if (!page.title || !page.html) {
    throw new Error("No page title, or page content provided.")
  }
  const pageTitle = page.title;

  const findContentInTag = (markup: string) => {
    const contentRegex = new RegExp(/([^>\s])[^<>]+(?=[<])/);
    const initialMatch = markup.match(contentRegex);

    return initialMatch ? initialMatch[0] : initialMatch;
  }

  // Since we don't have access to the DOM when server-side rendering,
  // only run the code below if in the browser.
  if (isBeliefPage) {
    pageHtmlMod = page.html;
    const beliefsList = page.html.split(/<!--kg-card-begin: .*?-->/);

    // Skip the first entry (0) because its empty
    for (let idx = 1; idx < beliefsList.length; idx++) {
      const tmpEl = cleanHtml(beliefsList[idx]).__html;

      if (idx === 1 && tmpEl.toLowerCase().startsWith("<h1")) {
        // Matches content within outermost tag
        const tagContentMatch = findContentInTag(tmpEl);
        if (tagContentMatch) {
          pageHeading = tagContentMatch;
        }
      } else if (tmpEl.toLowerCase().startsWith("<h2")) {
        const tagContentMatch = findContentInTag(tmpEl);
        if (!tagContentMatch || !tagContentMatch.trim()) { return };
        // Increment the beliefsList index because, the way this is set up in Ghost,
        // we *should* have an h2 tag, followed directly by the accordion content in a div.
        pageContent[tagContentMatch.trim()] = cleanHtml(beliefsList[++idx]).__html;
      }
    }
  }

  // We search for data-id attributes here. If found, we get the filename to be used when
  // replacing a placeholder container with our native video playback code.
  if (isGivePage) {
    const search = /data-id=["|'](.*?)["|']/gm; // Look for file name within data-id attribute
    const filenameList: string[] = [];
    let filenameMatch = search.exec(page.html);
    filenameMatch && filenameList.push(filenameMatch[1]);

    // We don't get ALL the matches, just the first one. So we loop until
    // no more are returned
    while (filenameMatch != null) {
      filenameMatch = search.exec(page.html);
      filenameMatch && filenameList.push(filenameMatch[1]);
    }

    videoList = filenameList;
    pageHtmlMod = page.html;

    filenameList.forEach(file => {
      const videoPlaceholder = `<div class="container" data-id="${file}"></div>`;
      const videoSnippet = generateVideoSnippet(file, `${file}.jpg`);
      pageHtmlMod = pageHtmlMod.replace(videoPlaceholder, videoSnippet);
    })
  }

  /** Original, or modified html markup */
  const pageHTML = pageHtmlMod || page.html;


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
          }));
        });
      }).catch(error => console.log("Could not load video player because: ", error));
    }
  });

  return (
    <>
      <section className="generated-page fade-in hero is-halfheight">
        <div className="hero-body" style={(page.featureImageSharp?.publicURL || isEasterPage) ? {
          background: `url(${page.featureImageSharp?.publicURL})`,
          backgroundImage: `${isEasterPage ? `url(${easterBgOverlay}) , url(${easterBg})` : ""}`,
          backgroundSize: `${isEasterPage ? "contain, cover" : "cover"}`,
          backgroundPosition: `${isEasterPage ? "center, center" : "center"}`,
          backgroundRepeat: `${isEasterPage ? "no-repeat" : ""}`,
        } : undefined}>
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
            <div className="column is-two-thirds">
              {<FancyHeading className="has-text-centered" heading={pageHeading} />}
              {Object.keys(pageContent).map((title, idx) => (
                <Accordion key={title} title={title} isExpanded={idx === 0 ? true : false}>
                  <div dangerouslySetInnerHTML={{ __html: pageContent[title] }} />
                </Accordion>
              ))}
            </div> :
            <div className="column is-two-thirds" dangerouslySetInnerHTML={isGivePage ? cleanHtmlForVideo(pageHTML) : cleanHtml(pageHTML)} />}
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

export default Page;

export const Head = ({ data, location }: HeadProps<PageDataProps>) => {
  const page = data.ghostPage,
    isBlogPage = location.pathname.includes("/blog"),
    isEasterPage = location.pathname.includes("/easter-sunday"),
    {
      excerpt,
      featureImageSharp,
      meta_description,
      meta_title,
      title
    } = page;

  return (
    <SEO
      title={(meta_title ?? title) ?? undefined}
      desc={(meta_description ?? excerpt) ?? undefined}
      banner={featureImageSharp?.publicURL ?? undefined}
      page={isEasterPage ? "Easter" : undefined}
      pathname={location.pathname}
      article={isBlogPage}
    />
  )
}

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
