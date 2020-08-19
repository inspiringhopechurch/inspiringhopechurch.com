import React from "react";
import { Link } from "gatsby";
import "./404.sass";
import logo from "../assets/logo.svg";

const NotFound = () => (
  <>
    <section className={`not-found hero is-fullheight-with-navbar`}>
      <div className={`hero-body`}>
        <div className={`container has-text-centered`}>
          <h1 className={`title is-1 not-found`}>
            <img alt="Page not found html code " src={logo} />
          </h1>
          <p className={`subtitle is-2 has-text-white`}>We didn't find the page you asked for...</p>
          <p className={`subtitle is-2 has-text-white`}>
            Please go back to the{" "}
            <Link className={`is-primary`} to="/">
              home page
            </Link>{" "}
            and try again.
          </p>
        </div>
      </div>
    </section>
  </>
);

// Default export is rendered when user visits page.
export default NotFound;
