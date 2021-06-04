import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import config from "../../config";
import SEO from "../components/seo";
import MediaItem from "../components/mediaItem";
import FancyHeading from "../components/fancyHeading";
import "./blog.sass";

const Watch = ({ data }) => {
  const { edges } = data.allGhostPage;

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
      <section className="box is-shadowless blog-content container">
        <div className="columns is-multiline is-centered">
          <MediaItem
            category="Live Stream"
            title="Watch Live!"
            description="This would typically have a description of some sort or be empty."
            link=""
            imgSrc=""
            vidSrc={`
            <figure className="column is-12 image is-16by9">
              <iframe
                className="has-ratio"
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
        }
      }
    }
  }
`;

// Default export is rendered when user visits page.
export default Watch;
