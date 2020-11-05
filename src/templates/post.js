import React from "react";
import { graphql } from "gatsby";
import sanitizeHtml from "sanitize-html";
import SEO from "../components/seo";
import "./post.sass";
import logo from "../assets/logo.svg";

// Default export is rendered when user visits page.
export default ({ data }) => {
  const post = data.markdownRemark,
    { excerpt } = post,
    { date, description, image, summary, subtitle, title, path } = post.frontmatter,
    readTime = post.timeToRead,
    slug = post.fields.slug;

  function getPostHtml() {
    return { __html: sanitizeHtml(post.html) }; // this needs to be sanitized because post.html can contain user modifiable code
  }

  return (
    <>
      <SEO title={title} desc={description || summary || excerpt} image={image || logo} pathname={slug} article />
      <section className={`post hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container`}>
            <h1 className={`title has-text-white is-3`}>{title}</h1>
            <h2 className={`subtitle is-5 has-text-white`}>{subtitle}</h2>
          </div>
        </div>
      </section>
      <section className={`box blog-content ${path}`}>
        <div className={`columns is-centered`}>
          <div className={`column is-4-tablet is-2-fullhd is-3-desktop`}>
            <div className={`tags has-addons`}>
              <span className={`tag`}>Published</span>
              <span className={`tag is-dark`}>{date}</span>
            </div>
            <div className={`tags has-addons`}>
              <span className={`tag`}>Read Time</span>
              <span className={`tag is-dark`}>about {readTime} min.</span>
            </div>
            {/* <div className={`tags`}>
              <span className={`tag is-white`}>Tags:</span>

              {tags.map(tag => {
                return (
                  <Link
                    to={`/tag/${tag.replace(" ", "-")`}
                    className={`tag is-link`}
                    key={id + tag.replace(" ", "")}
                  >
                    {tag}
                  </Link>
                );
              })}
            </div> */}
          </div>

          <div
            className={`column content is-half-desktop is-two-thirds-tablet`}
            dangerouslySetInnerHTML={getPostHtml()}
          />
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      timeToRead
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        path
      }
    }
  }
`;
