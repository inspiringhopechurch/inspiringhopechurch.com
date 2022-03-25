import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import config from "../../config";
import "./header.sass";
// import logo from "../assets/logo_icon.svg";

const Header = ({ location }) => {
  const [menuIsMobile, setMenuIsMobile] = useState(false);

  const toggleMenu = () => setMenuIsMobile(!menuIsMobile);
  const hideMenu = () => setMenuIsMobile(false);

  const homeUrl = "/",
    blogUrl      = config.postPrefix,
    aboutUrl     = "/about",
    missionUrl   = "/about/mission",
    beliefsUrl   = "/about/beliefs",
    partnersUrl  = "/about/partners",
    contactUrl   = "/contact",
    giveUrl      = "/give",
    watchUrl = "/watch/",
    getConnected = "/get-connected",
    easterUrl = "/events/easter-sunday-2022";

  return (
    <header>
      <nav
        className={`navbar is-fixed-top`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={`container px-2`}>
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              to={homeUrl}
              state={{ prevPath: location.pathname }}
              data-testid="logo-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2892 4200"
                fill="#58cadd"
              >
                <title>Inspiring Hope Church Icon</title>
                <path d="M1766 1515V0h-640v1053l640 462zM640 702V0H0v240l640 462zm486 663v1978a263 263 0 00100 208l484 374a33 33 0 0053-26V1827zM0 552v2494a265 265 0 00100 209l485 374a33 33 0 0055-29V1014zM2252 0v1800a33 33 0 01-52 27l-434-314v312l377 275a261 261 0 01109 213v1300a260 260 0 00100 208l484 374a33 33 0 0053-26V0z" />
              </svg>
            </Link>

            <button
              className={`navbar-burger ${menuIsMobile ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="nav-menu"
              onClick={toggleMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
          <div
            id="nav-menu"
            className={`navbar-menu ${menuIsMobile ? "is-active" : ""}`}
          >
            <div
              className="navbar-start"
              role="none"
              onClick={hideMenu}
              onKeyPress={hideMenu}
            >
              <Link
                className={`navbar-item ${
                  location.pathname === homeUrl ? "is-active-page" : ""
                }`}
                to={homeUrl}
                state={{ prevPath: location.pathname }}
              >
                Home
              </Link>
              <Link
                className={`navbar-item ${
                  location.pathname === easterUrl ? "is-active-page" : ""
                }`}
                to={easterUrl}
                state={{ prevPath: location.pathname }}
              >
                Easter
              </Link>
              <Link
                className={`navbar-item ${
                  location.pathname.includes(getConnected)
                    ? "is-active-page"
                    : ""
                }`}
                to={getConnected}
                state={{ prevPath: location.pathname }}
              >
                Get Connected
              </Link>
              <div
                className={`navbar-item ${
                  location.pathname.includes(aboutUrl) ? "is-active-page" : ""
                } has-dropdown is-hoverable`}
              >
                <Link
                  className="navbar-link"
                  to={aboutUrl}
                  state={{ prevPath: location.pathname }}
                >
                  About Us
                </Link>
                <div className="navbar-dropdown">
                  <Link
                    className="navbar-item"
                    to={aboutUrl}
                    state={{ prevPath: location.pathname }}
                  >
                    Who We Are
                  </Link>
                  <Link
                    className="navbar-item"
                    to={beliefsUrl}
                    state={{ prevPath: location.pathname }}
                  >
                    Our Beliefs
                  </Link>
                  <Link
                    className="navbar-item"
                    to={missionUrl}
                    state={{ prevPath: location.pathname }}
                  >
                    Our Mission
                  </Link>
                  <Link
                    className="navbar-item"
                    to={partnersUrl}
                    state={{ prevPath: location.pathname }}
                  >
                    Our Partners
                  </Link>
                </div>
              </div>
              <Link
                className={`navbar-item ${location.pathname.includes(watchUrl) ? "is-active-page" : ""
                  }`}
                to={watchUrl}
                state={{ prevPath: location.pathname }}
              >
                Watch
              </Link>
              <Link
                className={`navbar-item ${location.pathname.includes(blogUrl) ? "is-active-page" : ""
                  }`}
                to={blogUrl}
                state={{ prevPath: location.pathname }}
              >
                Blog
              </Link>
              <Link
                className={`navbar-item ${
                  location.pathname.includes(contactUrl) ? "is-active-page" : ""
                }`}
                to={contactUrl}
                state={{ prevPath: location.pathname }}
              >
                Contact
              </Link>
            </div>
            <div
              className="navbar-end"
              role="none"
              onClick={hideMenu}
              onKeyPress={hideMenu}
            >
              <Link
                className={`navbar-item ${
                  location.pathname.includes(giveUrl) ? "is-active-page" : ""
                }`}
                to={giveUrl}
                state={{ prevPath: location.pathname }}
              >
                Give
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string,
    host: PropTypes.string,
    hostname: PropTypes.string,
    href: PropTypes.string,
    key: PropTypes.string,
    origin: PropTypes.string,
    port: PropTypes.string,
    protocol: PropTypes.string
  }).isRequired
};

export default Header;
