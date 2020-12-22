import React from "react";
import { graphql } from "gatsby";
import config from "../../config"
import BlogItem from "../components/blogItem";
import "./blog.sass";

const Blog = ({ data }) => {
  const { edges } = data.allGhostPost;

  return (
    <>
      <section className={`hero is-link is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <h1 className={`title has-text-white`}>Inspiring Moments</h1>
          </div>
        </div>
      </section>
      <section className={`box is-shadowless blog-content container`}>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }) => (
            <BlogItem
              blogTitle={node.title}
              // blogImage={node.feature_image}
              blogImage={node.featureImageSharp.childImageSharp.fluid}
              blogDate={node.published_at_pretty}
              blogExcerpt={node.excerpt}
              blogLink={`${config.postPrefix}/${node.slug}`}
              onBlogIndex={true}
              key={node.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query BlogPostQuery {
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
export default Blog;
