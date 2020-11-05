import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "../components/contactForm";
import SEO from "../components/seo";
import { validUrl } from "../utils";
import { facebookUrl } from "../../config";
import "./contact.sass";

const Contact = () => {
  return (
    <>
      <SEO title="Contact Us" />
      <section className={`contact-page hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <h1 className={`title is-size-1-mobile`}>Contact Us</h1>
          </div>
        </div>
      </section>

      <section className={`contact-page box contact-content is-shadowless is-halfheight`}>
        <div className={`columns is-centered`}>
          <div className={`column is-one-third-tablet`}>
            <h1 className={`title has-text-link is-uppercase`}>Have Questions?</h1>
            <p className={`content`}>
              Do you have questions about Inspiring Hope Church? Would like to join one of our groups? <br />
              Please feel free to call, reach us on facebook, or use the form on this page to get in touch!
            </p>
            <p className={`content`}>
              <FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="lg" /> Based in Hamilton, Ohio.
            </p>
            <p className={`content`}>
              <a href="tel:19189318591" title="Get in touch!">
                <FontAwesomeIcon icon={["fas", "phone"]} size="lg" flip="horizontal" /> 1 (918) 931-8591
              </a>
            </p>
            <p className={`content`}>
              <a href={validUrl(facebookUrl) ? facebookUrl : ""} title="Link to Facebook page">
                <FontAwesomeIcon icon={["fab", "facebook-f"]} size="lg" /> Inspiring Hope Facebook page
              </a>
            </p>
          </div>

          <ContactForm formTitle={"Get in Touch"} submitButtonTitle={"Send Message"} />
        </div>
      </section>
    </>
  );
};

// Default export is rendered when user visits page.
export default Contact;
