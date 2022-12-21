import React, { useLayoutEffect } from "react";
import { Link, navigate } from "gatsby";
import { FancyHeading, SEO } from "../components";
import "./404.sass";

const NotFound = ({ location }: { location: Location }) => {
  useLayoutEffect(() => {
    if (location.pathname === '/easter-sunday-2022' || location.pathname === '/easter-sunday-2022/') {
      navigate('/events/easter-sunday-2022', { replace: true })
    }
  });

  return <>
    <section className="not-found-page fade-in hero is-halfheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <FancyHeading heading="Page Not Found" />
        </div>
      </div>
    </section>

    <section className="not-found-page section container hero is-halfheight">
      <div className="columns content is-medium is-centered">
        <div className="container has-text-centered">
          <p className="title">
            We did not find the page you asked for.
          </p>
          <p className="subtitle">
            Please return to Inspiring Hope Church's <Link className="is-primary" to="/">home page</Link>{" "}
            and try again.
          </p>
        </div>
      </div>
    </section>
  </>
};

// Default export is rendered when user visits page.
export default NotFound;

export const Head = () => <SEO title="Page Not Found" />
