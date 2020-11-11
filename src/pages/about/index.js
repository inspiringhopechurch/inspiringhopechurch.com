import React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import SEO from "../../components/seo";
import "./about.sass";
import logo from "../../assets/logo.svg";

const About = ({ location, data }) => {
  const pageName = "About Us";

  return (
    <>
      <SEO title={pageName} pathname={location.pathname} />
      <section className="about-page hero is-halfheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1-mobile">{pageName}</h1>
          </div>
        </div>
      </section>

      <section className="box container is-shadowless">
        <div className="columns content is-medium is-centered">
          <div className="column is-two-thirds">
            <h1 className="title is-size-1 is-uppercase has-text-centered">Who We Are</h1>

            <h2 className="is-size-4 is-uppercase">
              <span className="has-text-weight-light">The</span> <span className="decorated">Mangrums</span>
            </h2>

            <div className="columns is-vcentered">
              <div className="column is-half">
                <img className="image" alt="Inspiring Hope Church logo" src={logo} />
              </div>
              <div className="column">
                <p className="content">
                  Ben and Brittany Mangrum moved to Hamilton, Ohio from northeast Oklahoma in January, 2020. God has
                  blessed these high school sweethearts with four beautiful children (Peyton, Channing, Teagan, and
                  Sterling). Their family enjoys spending time together by playing games and having weekly movie nights.
                </p>
              </div>
            </div>

            <div className="columns is-vcentered">
              <div className="column is-half">
                <p className="content">
                  Before moving to Ohio, Ben served in ministry for seven years at Crescent Valley Baptist Church in
                  Tahlequah, Oklahoma; the last four years he served as the Executive Pastor. While preparing to launch
                  Inspiring Hope Church in Hamilton, Ben was a church plant resident, serving on staff with Grace Point
                  Fellowship for a year.
                </p>
                <p className="content">
                  Brittany is a stay-at-home mother, and teaches English online (ESL) part time. She homeschools their
                  four children, and serves alongside Ben in preparing to plant Inspiring Hope Church.
                </p>
              </div>
              <div className="column">
                {/* <Img className="image" alt="The Mangrum family" fixed={data.file.childImageSharp.fixed} /> */}
                <Img className="image" alt="The Mangrum family" fluid={data.file.childImageSharp.fluid} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Default export is rendered when user visits page.
export default About;

export const query = graphql`
  query {
    file(relativePath: { eq: "assets/mangrum_family.jpg" }) {
      childImageSharp {
        fixed(width: 750) {
          ...GatsbyImageSharpFixed_withWebp
        }
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
