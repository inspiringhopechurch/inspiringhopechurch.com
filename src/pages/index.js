import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import config from "../../config"
import BlogItem from "../components/blogItem";
import Promotion from "../components/promotion";
import LoaderIcon from "../components/loader-icon";
import { cleanHtml } from "../utils";
import "./index.sass";
import videoPoster from "../assets/ihc_video.png";
import captionEn from "file-loader!../assets/captions.en.vtt";
import captionEs from "file-loader!../assets/captions.es.vtt";

export default ({ data }) => {
  const defaultMsg = "Get Inspiring Hope's latest updates." || <></>;
  const [message, setMessage] = useState(defaultMsg);
  const [emailAddress, setEmailAddress] = useState("");
  const [formSentIndicator, setFormSentIndicator] = useState(false);

  const posts = data.allGhostPost.edges;
  const whoWeAreSection = data.ghostPage;

  /**
   * Handles changes to the form's inputs. Should be passed to an input's
   * onChange prop.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Provides the value for the input being changed
   */
  const handleChange = (event) => {
    const value = event.target.value;
    setEmailAddress(value);
  };

  /**
   * (Eventual) Async function. Sends form data to server and waits for a response.
   * Once the response is obtained, should update page with the server's response.
   * @param {React.SyntheticEvent<HTMLButtonElement>} event - Used to override the browser's default 'submit' behavior
   */
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
      email: emailAddress.trim(),
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
              <source src="/assets/inspiring_hope_intro.webm" type="video/webm" />
              <source src="/assets/inspiring_hope_intro.mp4" type="video/mp4" />
              <track kind="captions" srcLang="en" label="English" src={captionEn} />
              <track kind="captions" srcLang="es" label="Español" src={captionEs} />
              Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
            </video>
          </figure>
        </div>
        <p className={`container is-fluid mt-6 is-size-4 has-text-centered`}>
          Learn more about Inspiring Hope Church by watching this message from Pastor Ben.
        </p>
      </section>

      <section className={`index-page about-us box index-content is-radiusless mb-0`}>
        <Promotion promoEndDate="May 31, 2019 23:59:59" promoDiscount={25} />
        <div className={`columns content`}>
          <div className={`column is-full`}>
            <h1 className={`has-text-centered is-size-1 is-uppercase`}>{whoWeAreSection.title}</h1>
          </div>
        </div>
        <div className="columns is-multiline" dangerouslySetInnerHTML={cleanHtml(whoWeAreSection.html)} />
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

      <section
        className={`index-page subscriptions box index-content notification is-link is-radiusless is-clipped mb-0`}
      >
        <div className={`columns is-multiline is-mobile is-centered is-vcentered has-text-centered`}>
          <div className={`column container is-fluid is-narrow`}>
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
                  <button data-testid="submit-button" type="submit" className={`button is-info`} onClick={handleSubmit}>
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
            <h1 className={`is-size-1 has-text-centered is-uppercase`}>Inspiring Moments</h1>
          </div>
        </div>
        <div className={`columns is-multiline is-centered`}>
          {posts.map(({ node }) => (
            <BlogItem
              blogTitle={node.title}
              blogImage={node.featureImageSharp.childImageSharp.fluid}
              blogDate={node.published_at_pretty}
              blogExcerpt={node.excerpt}
              blogLink={`${config.postPrefix}/${node.slug}`}
              key={node.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export const query = graphql`
  query GhostPostQuery {
    allGhostPost(sort: { order: DESC, fields: [published_at] }, limit: 3, skip: 0) {
      edges {
        node {
          ...GhostPostFieldsForIndex
        }
      }
    }
    ghostPage(title: {eq: "Who We Are"}) {
      html
      title
    }
  }
`;
