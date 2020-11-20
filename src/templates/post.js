import React from "react";
import { graphql } from "gatsby";
import sanitizeHtml from "sanitize-html";
import SEO from "../components/seo";
import "./post.sass";

// Default export is rendered when user visits page.
export default ({ data }) => {
  const post = data.ghostPost,
    {
      excerpt,
      html,
      published_at_pretty,
      reading_time,
      slug,
      feature_image,
      meta_description,
      meta_title,
      subtitle,
      title,
    } = post;

  function getPostHtml() {
    return {
      __html: sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: { img: ["src", "srcset", "alt"], "*": ["class", "id"] },
      }),
    }; // this needs to be sanitized because post.html can contain user modifiable code
  }

  // TODO: Fix SEO generation here
  return (
    <>
      <SEO
        title={meta_title || title}
        desc={meta_description || excerpt}
        banner={feature_image}
        pathname={slug}
        article
      />
      <section className={`post hero is-halfheight`}>
        <div
          className={`hero-body`}
          style={{ background: `url('${feature_image}') center top`, backgroundSize: "cover" }}
        >
          <div className={`container`}>
            <h1 className={`title has-text-white is-3`}>{title}</h1>
            {subtitle && <h2 className={`subtitle is-5 has-text-white`}>{subtitle}</h2>}
          </div>
        </div>
      </section>
      <section className={`box blog-content`}>
        <div className={`columns is-centered`}>
          <div className={`column is-4-tablet is-2-fullhd is-3-desktop`}>
            <div className={`tags has-addons`}>
              <span className={`tag`}>Published</span>
              <span className={`tag is-dark`}>{published_at_pretty}</span>
            </div>
            <div className={`tags has-addons`}>
              <span className={`tag`}>Read Time</span>
              <span className={`tag is-dark`}>about {reading_time} min.</span>
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
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
