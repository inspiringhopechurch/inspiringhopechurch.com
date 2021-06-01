import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import config from "../../config";
import SEO from "../components/seo";
import MediaItem from "../components/mediaItem";
import FancyHeading from "../components/fancyHeading";
import "./blog.sass";

const Watch = ({ data }) => {
  const { edges } = data.allGhostPost;

  return (
    <>
      <SEO title="Encouraging Messages" />
      <section className={`hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <FancyHeading heading="Encouraging Messages" />
          </div>
        </div>
      </section>
      <section className={`box is-shadowless blog-content container`}>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }, index) => (
            <MediaItem
              key={node.id}
              title={node.title}
              description={node.excerpt}
              // blogImage={node.feature_image}
              link={`${config.postPrefix}/${node.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query WatchPageQuery {
    allGhostPost(sort: { order: DESC, fields: [published_at] }) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;

// Default export is rendered when user visits page.
export default Watch;
