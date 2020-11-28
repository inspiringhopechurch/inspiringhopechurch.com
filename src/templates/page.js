import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import sanitizeHtml from "sanitize-html";

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
export default ({ data, location }) => {
  const page = data.ghostPage;

  function getPostHtml() {
    return {
      __html: sanitizeHtml(page.html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: { img: ["src", "srcset", "alt"], "*": ["class", "id"] },
      }),
    }; // this needs to be sanitized because post.html can contain user modifiable code
  }

  return (
    <>
      <SEO
        title={page.meta_title || page.title}
        desc={page.meta_description || page.excerpt}
        banner={page.featureImageSharp.publicURL}
        pathname={page.slug}
        article
      />
      <div className="container">
        <article className="content">
          <h1 className="content-title">{page.title}</h1>

          {/* The main page content */}
          <section className="content-body load-external-scripts" dangerouslySetInnerHTML={getPostHtml()} />
        </article>
      </div>
    </>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

// export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
