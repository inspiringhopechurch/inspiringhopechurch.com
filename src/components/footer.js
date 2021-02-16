import React from "react";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validUrl } from "../utils";
import { facebookUrl, title } from "../../config";
import "./footer.sass";

const Footer = (props) => (
  <footer className={`footer`}>
    <section className={`copyright`}>
      <div className={`container columns is-vcentered content is-small`}>
        <div className={`column`}>
          <p>&copy; {props.copyrightOwner}. A church proudly serving Jesus in Hamilton, Ohio since 2020.</p>
        </div>
        <div className={`column is-narrow`}>
          <div className={`navbar-end is-flex`}>
            <a
              className={`button is-primary is-outlined`}
              href={validUrl(facebookUrl) ? facebookUrl : ""}
              title="Link to Inspiring Hope Church facebook page"
            >
              <span className="icon"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></span>
            </a>
            <a className="navbar-item is-sr-only" href="/sitemap.xml" title="XML Sitemap">
              Sitemap
            </a>
            <a className="navbar-item" href="/feed.xml" title="XML RSS Feed">
              RSS
            </a>
            <a className="navbar-item" href="/feed.json" title="JSON Feed">
              JSON
            </a>
            <a className="navbar-item" href="//orbitsolutions.dev">
              Made by ORB IT Solutions.
            </a>
          </div>
        </div>
      </div>
    </section>
  </footer>
);

Footer.propTypes = {
  copyrightOwner: PropTypes.string.isRequired
};

Footer.defaultProps = {
  copyrightOwner: title
};

export default Footer;
