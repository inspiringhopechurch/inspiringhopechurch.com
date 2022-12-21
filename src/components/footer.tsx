import React from "react";
import CookieConsent from 'react-cookie-consent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validUrl } from "../utils";
import { facebookUrl, spotifyUrl, title, trackingCookieName } from "../../config";
import "./footer.sass";

const Footer = ({ copyrightOwner = title }: FooterProps) => (
  <footer className="footer">
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton={true}
      cookieName={trackingCookieName}
    >
      <p>Our website would like to store cookies on your computer for the purpose of collecting analytics.</p>
      <p>If you decline, your information will not be provided to Google Analytics, and we will not be able to use it to improve our website.</p>
    </CookieConsent>
    <section className="copyright">
      <div className="container columns">
        <div className="column has-text-centered">
          <div className=" content is-small">
            <a
              className="button is-link mr-3"
              href={validUrl(facebookUrl) ? facebookUrl : ""}
              title="Link to Inspiring Hope Church facebook page"
            >
              <span className="icon"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></span>
            </a>
            <a
              className="button is-link mr-3"
              href={validUrl(spotifyUrl) ? spotifyUrl : ""}
              title="Link to Inspiring Hope Church Spotify page"
            >
              <span className="icon"><FontAwesomeIcon icon={["fab", "spotify"]} /></span>
            </a>
            <a className="button is-link mr-3" href="/feed.xml" title="XML RSS Feed">
              <span className="icon"><FontAwesomeIcon icon={["fas", "rss"]} /></span>
            </a>
            <a className="button is-link mr-3" href="/feed.json" title="JSON Feed">
              <span className="icon"><FontAwesomeIcon icon={["fas", "rss-square"]} /></span>
            </a>
            <a className="button is-sr-only" href="/sitemap.xml" title="XML Sitemap">
              Sitemap
            </a>
            <a className="content is-small is-sr-only" href="//orbitsolutions.dev">
              Developed by ORB IT Solutions.
            </a>
          </div>
        </div>
      </div>
      <div className="container columns">
        <div className="column has-text-centered">
          <p>&copy; {copyrightOwner}. A church proudly serving Jesus in Hamilton, Ohio since 2020.</p>
        </div>
      </div>
    </section>
  </footer>
);

type FooterProps = {
  copyrightOwner?: string
};

export default Footer;
