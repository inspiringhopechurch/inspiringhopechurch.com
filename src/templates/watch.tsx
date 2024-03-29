import React from "react";
import config from "../../config";
import { FancyHeading, MediaItem, SEO, Pagination } from "../components";
import { generateVideoSnippet } from "../utils";

import "./watch.sass";
type TVideoList = {
  [x: string]: string[]
}
type TPageContext = {
  pageContext: {
    watchPages: Queries.GhostPageEdge[];
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  }
}

const Watch = ({ pageContext }: TPageContext) => {
  const { watchPages } = pageContext;
  const videoList = {} as TVideoList;

  const useObjectStorage = true
  watchPages.forEach(({ node }, i) => {
    if (node && i < pageContext.limit) {
      const search = /data-id=["|'](.*?)["|']/gm; // Look for file name within data-id attribute

      if (!node.html) {
        throw new Error("No content found for watch page");
      }

      // We don't get ALL the matches here, just the first one. So later on, we'll search again
      // in a loop until no more matches are found.
      let filenameMatch = search.exec(node.html);
      videoList[node.id] = []
      filenameMatch && videoList[node.id].push(filenameMatch[1]);

      while (filenameMatch != null) {
        filenameMatch = search.exec(node.html);
        filenameMatch && videoList[node.id].push(filenameMatch[1]);
      }

      videoList[node.id].forEach(file => {
        const videoPlaceholder = `<div class="container" data-id="${file}"></div>`;
        const videoSnippet = generateVideoSnippet(file, "", useObjectStorage);
        // @ts-expect-error node.html is writeable
        node.html = node.html.replace(videoPlaceholder, videoSnippet);
      })
    }

  });

  return (
    <> {/* eslint-disable react/jsx-pascal-case */}
      <section className="hero fade-in is-halfheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <FancyHeading heading="Encouraging Messages" />
          </div>
        </div>
      </section>
      <section className="box is-shadowless watch-content container">
        <div className="columns is-multiline is-centered">
          <MediaItem
            category="Live Stream"
            title="Watch Live!"
            description="Join us on our livestream each Sunday starting at 10:00 am."
            imgSrc=""
            vidSrc={`
            <figure class="column is-12 image is-16by9">
              <iframe
                class="has-ratio"
                src="https://stream.inspiringhopechurch.com/embed/video"
                title="Stream Sunday Messages from Inspiring Hope Church"
                referrerpolicy="origin"
                scrolling="no"
                allow="fullscreen"
                allowfullScreen="true" />
            </figure>
            `}
          />
          {watchPages.map(({ node }, i) => {
            if (node && i < pageContext.limit) {
              return (
                <MediaItem
                  key={node.id}
                  category={node.primary_tag?.name ?? undefined}
                  title={node.title!}
                  description={node.excerpt ?? undefined}
                  link={`${config.postPrefix}/${node.slug}`}
                  imgSrc={node.feature_image ?? undefined}
                  vidSrc={node.html ?? undefined}
                  timestamp={node.published_at ?? undefined}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        {watchPages.length && <Pagination destination="/watch" totalPages={pageContext.numPages} currentPage={pageContext.currentPage} />}
      </section>
    </>
  );
};

// Default export is rendered when user visits page.
export default Watch;

export const Head = () => <SEO title="Encouraging Messages" />
