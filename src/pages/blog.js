import React from "react";
import { graphql } from "gatsby";
import BlogItem from "../components/blogItem";
import "./blog.sass";

const Blog = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <>
      <section className={`hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <h1 className={`title has-text-white`}>Latest Blog Posts</h1>
          </div>
        </div>
      </section>
      <section className={`box blog-content`}>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }) => (
            <BlogItem
              blogTitle={node.frontmatter.title}
              blogDate={node.frontmatter.date}
              blogExcerpt={node.excerpt}
              blogSlug={node.fields.slug}
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
  query {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            path
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt(pruneLength: 350)
          id
          fields {
            slug
          }
        }
      }
    }
  }
`;

// Default export is rendered when user visits page.
export default Blog;
