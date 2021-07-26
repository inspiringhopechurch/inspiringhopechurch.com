import React, { useEffect } from "react";
import { render } from "react-dom";
import { graphql } from "gatsby";
import config from "../../config";
import SEO from "../components/seo";
import MediaItem from "../components/mediaItem";
import FancyHeading from "../components/fancyHeading";
import { generateVideoSnippet } from "../utils";

import "./watch.sass";

const Watch = ({ data }) => {
  const { edges } = data.allGhostPage;
  const videoList = {};

  edges.forEach(({ node }) => {
    if (node) {
      const search = /data-id=["|'](.*?)["|']/gm; // Look for file name within data-id attribute
      let filenameMatch = search.exec(node.html);
      videoList[node.id] = []
      filenameMatch && videoList[node.id].push(filenameMatch[1]);

      // We don't get ALL the matches, just the first one. So we loop until
      // no more are returned
      while (filenameMatch != null) {
        filenameMatch = search.exec(node.html);
        filenameMatch && videoList[node.id].push(filenameMatch[1]);
      }

      videoList[node.id].forEach(file => {
        const videoPlaceholder = `<div class="container" data-id="${file}"></div>`;
        const videoSnippet = generateVideoSnippet(file, `${file}.jpg`);
        node.html = node.html.replace(videoPlaceholder, videoSnippet);
      })
    }

  });

  useEffect(() => {
    Object.keys(videoList).forEach(id => {
      if (videoList[id].length > 0) {

        videoList[id].forEach(file => {
          const vidContainer = document.getElementById(`${file}`);

          vidContainer && import("../components/videoPlayer").then(component => {
            const VideoPlayer = component.default;
            render(
              <VideoPlayer
                enCaption={{ src: `/assets/${file}.en.vtt` }}
                esCaption={{ src: `/assets/${file}.es.vtt` }}
                mp4Src={`/assets/${file}.mp4`}
                preload
              />, vidContainer)
          }).catch(error => console.log("Could not load video player because: ", error))

        })
      }
    })
  })

  return (
    <>
      <SEO title="Encouraging Messages" />
      <section className="hero is-halfheight">
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
            description="Join us for the livestream this Sunday starting at 10:00 am."
            link=""
            imgSrc=""
            vidSrc={`
            <figure class="column is-12 image is-16by9">
              <iframe
                class="has-ratio"
                src="https://stream.inspiringhopechurch.com/embed/video"
                title="Encouraging Messages from Inspiring Hope"
                referrerPolicy="origin"
                scrolling="no"
                allowFullScreen />
            </figure>
            `}
          />
          {edges.map(({ node }) => (
            <MediaItem
              key={node.id}
              category={node.primary_tag?.name}
              title={node.title}
              description={node.excerpt}
              link={`${config.postPrefix}/${node.slug}`}
              imgSrc={node.feature_image}
              vidSrc={node.html}
              timestamp={node.published_at}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query WatchPageQuery {
    allGhostPage(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { name: { eq: "Sunday Message" } } } }
    ) {
      edges {
        node {
          id
          html
          title
          excerpt
          feature_image
          primary_tag {
            name
          }
          published_at
        }
      }
    }
  }
`;

// Default export is rendered when user visits page.
export default Watch;
