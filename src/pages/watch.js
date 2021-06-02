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
      <section className={`hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <FancyHeading heading="Encouraging Messages" />
          </div>
        </div>
      </section>
      <section className={`box is-shadowless blog-content container`}>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }) => (
            <MediaItem
              key={node.id}
              category={node.primary_tag?.name}
              title={node.title}
              description={node.excerpt}
              imgSrc={node.feature_image}
              link={`${config.postPrefix}/${node.slug}`}
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
