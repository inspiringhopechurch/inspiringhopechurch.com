import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import config from "../../config"
import "./header.sass";
import logo from "../assets/logo.svg";

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
    // giveUrl      = "/give",
    getConnected = "/get-connected";

  return (
    <header>
      <nav className={`navbar is-fixed-top`} role="navigation" aria-label="main navigation">
        <div className={`container px-2`}>
          <div className="navbar-brand">
            <Link className="navbar-item" to={homeUrl} state={{ prevPath: location.pathname }} data-testid="logo-link">
              <img src={logo} alt="Inspiring Hope Logo" />
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
          <div id="nav-menu" className={`navbar-menu ${menuIsMobile ? "is-active" : ""}`}>
            <div className="navbar-start pr-5" role="none" onClick={hideMenu} onKeyPress={hideMenu}>
              <Link
                className={`navbar-item ${location.pathname === homeUrl ? "is-active-page" : ""}`}
                to={homeUrl}
                state={{ prevPath: location.pathname }}
              >
                Home
              </Link>
              <Link
                className={`navbar-item ${location.pathname.includes(getConnected) ? "is-active-page" : ""}`}
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
                <Link className="navbar-link" to={aboutUrl} state={{ prevPath: location.pathname }}>
                  About Us
                </Link>
                <div className="navbar-dropdown">
                  <Link className="navbar-item" to={aboutUrl} state={{ prevPath: location.pathname }}>
                    Who We Are
                  </Link>
                  <Link className="navbar-item" to={beliefsUrl} state={{ prevPath: location.pathname }}>
                    Our Beliefs
                  </Link>
                  <Link className="navbar-item" to={missionUrl} state={{ prevPath: location.pathname }}>
                    Our Mission
                  </Link>
                  <Link className="navbar-item" to={partnersUrl} state={{ prevPath: location.pathname }}>
                    Our Partners
                  </Link>
                </div>
              </div>
              <Link
                className={`navbar-item ${location.pathname.includes(blogUrl) ? "is-active-page" : ""}`}
                to={blogUrl}
                state={{ prevPath: location.pathname }}
              >
                News
              </Link>
              <Link
                className={`navbar-item ${location.pathname.includes(contactUrl) ? "is-active-page" : ""}`}
                to={contactUrl}
                state={{ prevPath: location.pathname }}
              >
                Contact
              </Link>
            </div>
            {/* }
          <div className='navbar-end'>
            <Link className='navbar-item' to={giveUrl} state={{ prevPath: location.pathname }}>
              Give
            </Link>
          </div>
          { */}
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
    protocol: PropTypes.string,
  }).isRequired,
};

export default Header;
