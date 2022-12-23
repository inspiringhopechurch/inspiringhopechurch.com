import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContactForm, FancyHeading, SEO } from "../components";
import { validUrl } from "../utils";
import { facebookUrl } from "../../config";
import "./contact.sass";

const Contact = () => (
  <>
    <section className={`contact-page fade-in hero is-halfheight`}>
      <div className={`hero-body`}>
        <div className={`container has-text-centered`}>
          <FancyHeading heading="Contact Us" />
        </div>
      </div>
    </section>

    <section
      className={`contact-page contact-content section is-halfheight`}
    >
      <div className={`columns content is-centered`}>
        <div className={`column is-one-third-tablet mb-4`}>
          <FancyHeading className={`has-text-centered`} heading={"Have Questions?"} />
          <p>
            Do you have questions about Inspiring Hope Church? Would like to join one of our groups? <br />
            Please feel free to call, reach us on facebook, or use the form on this page to get in touch!
          </p>
          <p>
            <span className="icon"><FontAwesomeIcon icon={["fas", "map-marker-alt"]} size="lg" /></span> Based in Hamilton, Ohio.
          </p>
          <p>
            <a href="tel:19189318591" title="Get in touch!">
              <span className="icon"><FontAwesomeIcon icon={["fas", "phone"]} size="lg" flip="horizontal" /></span> 1 (918) 931-8591
            </a>
          </p>
          <p>
            <a
              href={validUrl(facebookUrl) ? facebookUrl : ""}
              title="Link to Facebook page"
            >
              <span className="icon"><FontAwesomeIcon icon={["fab", "facebook-f"]} size="lg" /></span> Inspiring Hope Facebook page
            </a>
          </p>
        </div>

        <div
          className={`column is-two-thirds-tablet is-two-fifths-widescreen`}
        >
          <ContactForm
            formTitle={"Get in Touch"}
            submitButtonTitle={"Send Message"}
          />
        </div>
      </div>
    </section>
  </>
);

// Default export is rendered when user visits page.
export default Contact;

export const Head = () => <SEO title="Contact Us" />
