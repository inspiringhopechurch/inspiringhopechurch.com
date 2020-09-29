import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import "./header.sass";
import logo from "../assets/logo.svg";

const Header = (props) => (
  <header>
    <nav className={`navbar is-fixed-top`} role="navigation" aria-label="main navigation">
      <div className={`container px-2`}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={logo} alt="Inspiring Hope Logo" />
          </Link>

          <button
            className={`navbar-burger ${props.mobileMenuActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="nav-menu"
            onClick={props.toggleMenuHandler}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          id="nav-menu"
          role="menuitem"
          className={`navbar-menu ${props.mobileMenuActive ? "is-active" : ""}`}
          onClick={props.hideMenuHandler}
          onKeyPress={props.hideMenuHandler}
        >
          <div className="navbar-start pr-5">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <div className={`navbar-item has-dropdown is-hoverable`}>
              <Link className="navbar-link" to="/about">
                About Us
              </Link>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to="/about">
                  Who We Are
                </Link>
                <Link className="navbar-item" to="/about/beliefs">
                  Our Beliefs
                </Link>
                <Link className="navbar-item" to="/about/mission">
                  Our Mission
                </Link>
              </div>
            </div>
            <a className="navbar-item" href="https://cms.inspiringhopechurch.com/">
              News
            </a>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
          </div>
          {/* }
          <div className='navbar-end'>
            <Link className='navbar-item' to="/give">
              Give
            </Link>
          </div>
          { */}
        </div>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  toggleMenuHandler: PropTypes.func.isRequired,
  hideMenuHandler: PropTypes.func.isRequired,
  mobileMenuActive: PropTypes.bool.isRequired,
};

export default Header;
