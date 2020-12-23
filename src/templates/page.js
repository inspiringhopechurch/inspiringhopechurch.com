import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ContactForm from "../components/contactForm";
import { cleanHtml } from "../utils";
import SEO from "../components/seo";
import { RefTagger } from "../components/reftagger";
import "./page.sass";

/**
 * Single page (/:slug)
 *
 * This file renders a single page and loads all the content.
 *
 */
const Page = ({ data, location }) => {
  const page = data.ghostPage;
  const pageName = page.title;

  return (
    <>
      <SEO
        title={page.meta_title || page.title}
        desc={page.meta_description || page.excerpt}
        banner={page.featureImageSharp?.publicURL}
        pathname={page.slug}
        article
      />

      <section className="generated-page hero is-halfheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1-mobile">{pageName}</h1>
          </div>
        </div>
      </section>

      <section className="box container is-shadowless">
        <div className="columns content is-medium is-centered">
          {/* The main page content */}
          <div className="column is-two-thirds" dangerouslySetInnerHTML={cleanHtml(page.html)} />
          { (location.pathname === '/about/missions' || location.pathname === '/about/beliefs') && <RefTagger bibleVersion="HCSB" />}
        </div>
        
        { location.pathname === '/get-connected' && (
          <div className="columns content is-medium is-centered">
            <div className={`column is-two-thirds`}>
              <ContactForm formTitle={"Get in Touch"} submitButtonTitle={"Send Message"} />
            </div>
          </div>
        )}
      </section>
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

export default Page;

export const postQuery = graphql`
  query($slug: String!) {
    ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
  }
`;
