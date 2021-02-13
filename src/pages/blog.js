import React from "react";
import { graphql } from "gatsby";
import config from "../../config";
import SEO from "../components/seo";
import BlogItem from "../components/blogItem";
import FancyHeading from "../components/fancyHeading";
import "./blog.sass";

const Blog = ({ data }) => {
  const { edges } = data.allGhostPost;

  return (
    <>
      <SEO title="Inspiring Moments" />
      <section className={`hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <FancyHeading heading="Inspiring Moments" />
          </div>
        </div>
      </section>
      <section className={`box is-shadowless blog-content container`}>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }, index) => (
            <BlogItem
              isFirstItem = {index === 0}
              blogTitle={node.title}
              // blogImage={node.feature_image}
              blogImageObj={node.featureImageSharp.childImageSharp.fluid}
              blogDate={node.published_at_pretty}
              blogExcerpt={node.excerpt}
              blogLink={`${config.postPrefix}/${node.slug}`}
              blogAuthor={node.primary_author.name}
              blogReadingTime={node.reading_time}
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
