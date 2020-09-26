import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import ServiceItem from "../components/serviceItem";
import BlogItem from "../components/blogItem";
import Promotion from "../components/promotion";
import LoaderIcon from "../components/loader-icon";
import "./index.sass";
import videoPoster from "../assets/ihc_video.png";

export default ({ data }) => {
  const defaultMsg = "Get Inspiring Hope's latest updates.";
  const [message, setMessage] = useState(defaultMsg);
  const [emailAddress, setEmailAddress] = useState("");
  const [formSentIndicator, setFormSentIndicator] = useState(false);

  const { edges } = data.allMarkdownRemark;

  const handleChange = (event) => {
    const value = event.target.value;
    setEmailAddress(value);
  };

  const handleSubmit = (event) => {
    setFormSentIndicator(true);
    event.preventDefault();

    const cmsUrl = "https://cms.inspiringhopechurch.com";
    const postURL = `${cmsUrl}/members/api/send-magic-link/`;

    if (emailAddress === "") {
      setMessage(defaultMsg);
      setFormSentIndicator(false);
      return;
    }

    const values = {
      email: emailAddress,
      emailType: `subscribe`,
      labels: [],
    };

    fetch(postURL, {
      method: `POST`,
      mode: `cors`,
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify(values),
    })
      .then((result) => {
        if (result.ok) {
          setMessage(
            <>
              <div>
                <strong>
                  Great! <em>Check your inbox</em>
                </strong>{" "}
                to <strong>confirm</strong> your subscription.
              </div>
            </>
          );
          setEmailAddress("");
        } else {
          setMessage(<>We encountered an error. Please check your email address and try again.</>);
        }
        setFormSentIndicator(false);
      })
      .catch(() => {
        setMessage(
          <>
            We encountered an error. Please use the <Link to="/contact">contact form</Link> to let us know.
          </>
        );
        setFormSentIndicator(false);
      });
  };

  const services = [
      {
        name: "Mission",
        size: "2x",
        descr: (
          <>
            We exist to <em>inspire hope</em> by helping people discover God’s purpose for their lives through a
            relationship with Jesus.
          </>
        ),
      },
      {
        name: "Strategy",
        size: "2x",
        descr: (
          <>
            We will do this by inspiring people to <em>Follow</em> Jesus, <em>Live</em> in community, <em>Serve</em>{" "}
            those around them and <em>Expand</em> God’s kingdom.
          </>
        ),
      },
      {
        name: "Values",
        size: "2x",
        descr: `Our values describe our passions and define the heart with which will will accomplish our mission and vision.`,
      },
    ],
    invalidChars = /^[^a-zA-Z]+|[^\w:.-]+/g;

  return (
    <>
      <section className={`index-page hero is-large`}>
        <div className={`hero-underlay`}>
          <div className={`hero-body`}>
            <div className={`container`}>
              <div className={`columns is-vcentered`}>
                <div className={`column is-three-quarters`}>
                  <h1 className={`title has-text-white is-1 is-bold is-spaced`}>Welcome to Inspiring Hope Church.</h1>
                  <h2 className={`subtitle has-text-white is-4 is-muted`}>
                    We are a church dedicated to inspiring others to discover hope in Jesus.
                  </h2>
                  <p className="control">
                    <Link className={`button is-info is-medium`} to="/contact">
                      Say Hello
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`index-page subscriptions box index-content notification is-link is-radiusless mb-0`}>
        <div className="container">
          <figure className={`image is-16by9`}>
            <video
              className="has-ratio"
              controls={true}
              id="hero-video"
              width="100%"
              height="100%"
              preload="metadata"
              poster={videoPoster}
            >
              <source src="/assets/inspiring_hope_hero.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              {/* <source src="/assets/inspiring_hope_hero.webm" type="video/webm; codecs=vp8, vorbis" /> */}
              <track default kind="captions" srclang="en" src="/assets/captions.vtt" />
              Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
            </video>
          </figure>
        </div>
        <p className={`content mt-6 is-size-4 has-text-centered`}>
          Learn more about Inspiring Hope Church by watching this message from Pastor Ben.
        </p>
      </section>

      <section className={`index-page about-us box index-content is-radiusless mb-0`}>
        <Promotion promoEndDate="May 31, 2019 23:59:59" promoDiscount={25} />
        <div className={`columns content`}>
          <div className={`column is-full`}>
            <h1 className={`has-text-centered is-size-1 is-uppercase`}>Who We Are</h1>
          </div>
        </div>
        <div className={`columns is-multiline is-vcentered`}>
          {services.map((service, idx) => (
            <ServiceItem
              key={service.name.replace(invalidChars, "") + idx}
              serviceName={service.name}
              icon={service.icon}
              serviceDescription={service.descr}
            />
          ))}
        </div>
        <div className={`columns`}>
          <div className={`column is-full`}>
            <p className={`control has-text-centered`}>
              <Link className={`button is-link has-text-weight-light is-medium`} to="/about">
                Learn More ...
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className={`index-page subscriptions box index-content notification is-link is-radiusless mb-0`}>
        <div className={`columns content is-multiline is-mobile is-centered is-vcentered`}>
          <div className={`column is-narrow`}>
            <label htmlFor="subscribe" className="content">
              {message}
            </label>
          </div>
          <div className={`column is-narrow`}>
            <form>
              <div className={`field has-addons`}>
                <div className={`control`}>
                  <input
                    id="subscribe"
                    name="subscribe"
                    className={`input is-info`}
                    type="email"
                    placeholder="Sign up for newsletter"
                    value={emailAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className={`control`}>
                  <button type="submit" className={`button is-info`} onClick={handleSubmit}>
                    {formSentIndicator ? <LoaderIcon /> : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className={`index-page box index-content is-radiusless is-shadowless`}>
        <div className={`columns content`}>
          <div className={`column is-full`}>
            <h1 className={`is-size-1 has-text-centered is-uppercase`}>What We're Up To</h1>
          </div>
        </div>
        <div className={`columns is-multiline is-centered`}>
          {edges.map(({ node }) => (
            <BlogItem
              blogTitle={node.frontmatter.title}
              blogDate={node.frontmatter.date}
              blogExcerpt={node.excerpt}
              blogSlug={node.fields.slug}
              key={node.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(limit: 3, sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          id
          fields {
            slug
          }
        }
      }
    }
  }
`;
