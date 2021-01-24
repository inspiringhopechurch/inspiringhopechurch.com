import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config"
import BlogItem from "../components/blogItem";
import FancyHeading from "../components/fancyHeading";
import LoaderIcon from "../components/loader-icon";
import { cleanHtml } from "../utils";
import "./index.sass";
import videoPoster from "../assets/ihc_video.jpg";
import captionEn from "file-loader!../assets/captions.en.vtt";
import captionEs from "file-loader!../assets/captions.es.vtt";

const HomePage = ({ data }) => {
  const defaultMsg = "Get Inspiring Hope's latest updates." || <></>;
  const [message, setMessage] = useState(defaultMsg);
  const [emailAddress, setEmailAddress] = useState("");
  const [formSentIndicator, setFormSentIndicator] = useState(false);

  const posts = data.allGhostPost.edges;
  const pages = data.allGhostPage.edges;

  /**
   * Finds the item in an array that contains a given slug. This slug
   * corresponds to a particular slice of content in Ghost will will be
   * used on this page.
   * @param {Object} page - Object that represents a gatsby page content.
   * @param {string} query - string that corresponds to a Ghost slug.
   */
  const findGhostSection = (page, query) => {
    return (page.node.slug === query) ? page.node : undefined;
  }

  const bibleVerseSection = pages.find((page) => findGhostSection(page, "home-page-verse"))?.node;
  const weeklyGatheringSection = pages.find((page) => findGhostSection(page, "home-weekly-gathering"))?.node;
  const careSection = pages.find((page) => findGhostSection(page, "home-weekly-gathering-covid-care"))?.node;
  const kidsSection = pages.find((page) => findGhostSection(page, "home-weekly-gathering-inspire-kids"))?.node;
  const whoWeAreSection = pages.find((page) => findGhostSection(page, "home-who-we-are"))?.node;

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
                <div className={`column`}>
                  <h1 className={`has-text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" strokeMiterlimit="10" strokeWidth=".4" viewBox="0 0 5691 1280">
                      <title>Inspiring Hope Church</title>
                      <g fill="#221f53" stroke="#221f53">
                        <path id="logo-church" strokeWidth="4" d="M4116 1256c-46 0-82-38-81-87a83 83 0 01145-57l10-10c-62-63-171-24-170 69s112 131 171 65l-9-9a88 88 0 01-66 29zm333-93h-122v-89h-15v192h15v-90h122v90h15v-192h-15v89zm293 23c1 46-24 70-63 70-41 0-65-26-65-71v-111h-14v112c0 54 33 83 79 83s78-29 78-85v-109h-14zm300-57c-1-36-30-54-69-55h-80v192h14v-79h63l61 79h18l-63-82c32-4 56-23 56-55zm-135 45v-87h65c35 0 55 17 55 42 0 28-23 45-55 45zm353 82c-46 0-81-38-81-87a83 83 0 01145-57l10-10c-61-63-171-24-170 69s112 131 172 65l-10-9a88 88 0 01-66 29zm334-93h-123v-89h-14v192h14v-90h123v90h14v-192h-14v89z"/>
                      </g>
                      <g fill="#58cadd" stroke="#58cadd">
                        <path id="logo-inspiring-hope" strokeWidth="4" d="M881 307c45-58 91-117 128-181 35-59 3-125-67-124h-14l-15 2c-118 16-233 57-346 96-152 58-309 112-443 207a153 153 0 00-21 20h-1c-19 23-2 58 22 69a196 196 0 0041 14c80 16 162 18 244 17h13a284 284 0 0169 5 51 51 0 0016 1 15 15 0 015-1c10-1 0-17-5-20a66 66 0 00-27-10 443 443 0 00-95-8c-82-1-167-2-248-21a13 13 0 01-9-8 21 21 0 014-11 44 44 0 0111-9l12-9a850 850 0 01155-88q141-64 288-116a2369 2369 0 01263-80 379 379 0 01102-13 107 107 0 0119 4 5 5 0 012 1 14 14 0 018 13l-2 6a60 60 0 01-5 15 33 33 0 00-4 6l-31 53C821 320 672 487 523 653s-340 369-495 528a307 307 0 00-23 25 23 23 0 000 25 12 12 0 0015 4l36-37c273-272 585-589 825-891zm1040 138a12 12 0 006 2 56 56 0 0016-5l35-19c3-1 4-5 5-7a19 19 0 00-7-19 17 17 0 00-19-5c-20 8-59 29-36 53zm257 181a11 11 0 01-6-19c8-11 16-17 25-28l18-27a25 25 0 001-20 29 29 0 00-40-19 4 4 0 01-2 0l-23 12c-34 22-68 44-101 68-8 6-14 1-10-7l7-12 10-16 26-42a21 21 0 00-10-28 10 10 0 00-8-1 34 34 0 00-9 8l-47 66a422 422 0 01-36 35c-58 48-133 107-206 109-7 0-23-3-23-15a197 197 0 0138-62 24 24 0 003-3 1088 1088 0 0175-83c9-10 8-20-3-29a16 16 0 00-19 2l-10 8-21 19a217 217 0 01-37 27c-25 13-37 20-100 33a64 64 0 01-32-1c-4-2-10-15-12-19l-4-5c-49-50-122-6-167 26l-41 32a7 7 0 01-11-10l4-7a755 755 0 0045-99c3-9-1-18-12-26-2-3-9-4-11 0a56 56 0 00-7 10l-23 41a190 190 0 01-16 27 199 199 0 01-73 48c-49 19-91 29-137 46-16 6-22-1-18-13l1-12a553 553 0 0117-54 128 128 0 0180-79c14-5 20 2 28 1a10 10 0 009-10 19 19 0 00-10-19 65 65 0 00-39-5c-43 5-74 38-92 76a136 136 0 00-6 13 56 56 0 01-14 22c-53 44-80 50-131 75-7 3 0-19 2-25v-3a59 59 0 00-26-62c-44-23-105 31-143 52a116 116 0 01-15 7 7 7 0 01-4-2l-2-2a40 40 0 012-4 110 110 0 019-15c19-24 30-42 50-66 9-12 17-23 6-37-4-5-17-8-22-3a69 69 0 00-11 13 40 40 0 00-4 5c-46 63-97 122-138 187a31 31 0 005 39 16 16 0 0019 5 22 22 0 015-3c55-42 110-87 171-121a188 188 0 0155-25 36 36 0 018-1c2 1 6 3 6 5a26 26 0 010 13 154 154 0 01-7 18l-7 23c-8 18-17 68 8 61 12-3 37-36 62-51 38-22 80-47 98-64 4-5 4 4 3 8l-12 54c-1 7-5 22-11 25-24 12-95 44-122 63-46 31-72 56-70 84 0 20 25 26 70 24a236 236 0 0044-7c58-16 90-67 104-117l8-24c4-10 4-10 17-18 55-30 136-48 198-84 7-4 6 5-1 17l-74 129c-24 45-80 123-103 169a21 21 0 002 12 73 73 0 0012 14c3 4 12 5 15 1a1521 1521 0 01222-274 105 105 0 004 30 38 38 0 0043 27c55-7 108-24 139-64a191 191 0 0021-37 20 20 0 0113-12l42-11a368 368 0 0071-26c8-4 8 0 3 6l-25 29a139 139 0 00-25 53c-4 29 16 60 48 59 70-11 115-59 182-96 6-2 15-5-3 19l-38 53-32 50a23 23 0 005 27 16 16 0 0022 5c69-64 171-172 252-220 6-4-1 15-6 20a39 39 0 00-7 15 27 27 0 0025 35c18 1 25-13 17-16zM1074 775a147 147 0 01-44 36 162 162 0 01-60 19c-9 1-23-1-23-13 0-16 25-49 94-74 24-9 38-12 49-17 5-3 9 0 5 11a173 173 0 01-21 38zm528-167c-42 19-108 103-161 71a7 7 0 01-2-8 51 51 0 0114-19c29-23 51-42 86-56a135 135 0 0158-10c12 2 19 15 5 22zm805-137a13 13 0 006 3 57 57 0 0016-4l37-17c2 0 4-4 5-7a19 19 0 00-6-20 17 17 0 00-19-6c-20 8-60 26-39 51zm895 109a360 360 0 01-46 37 915 915 0 01-140 69c-19 9-11-6-4-18a1310 1310 0 0067-124 70 70 0 007-19 19 19 0 00-2-12 122 122 0 00-16-17 12 12 0 00-17-2 909 909 0 01-217 173 595 595 0 01-54 26 5 5 0 01-2 0c-13 6-30 6-38-2s-7-25 4-44a262 262 0 01113-101c31-15 67-20 98 0 6 3 9-1 8-5a29 29 0 00-6-12 90 90 0 00-57-28c-48-7-99 24-136 57a722 722 0 01-56 50 745 745 0 01-100 62c-11 6 0-28 2-38 4-23-4-52-25-63-44-22-105 32-143 52-10 6-19-4-10-15 19-24 30-42 50-66 9-12 17-23 6-37-4-5-17-8-22-3a69 69 0 00-11 13 32 32 0 00-4 5l-39 51a221 221 0 01-43 40c-63 46-117 63-207 94-10 3-20-1-20-13a195 195 0 0139-62 33 33 0 002-3 1088 1088 0 0175-83c9-10 8-20-3-29a14 14 0 00-19 1 109 109 0 00-11 8h0a667 667 0 00-87 95 150 150 0 00-28 58c-4 29 17 64 48 59 29-4 50-17 74-30 36-20 75-44 111-62 9-4 10 4-1 19l-29 45a31 31 0 005 39 16 16 0 0020 4 22 22 0 014-3c56-42 110-86 172-121a188 188 0 0154-25 36 36 0 018-1c2 1 6 3 6 5a26 26 0 010 13 154 154 0 01-7 18l-7 23c-12 35-8 74 17 66a114 114 0 0031-24c35-30 55-56 85-72 10-5-2 4-3 37a101 101 0 002 17 92 92 0 0020 36c21 22 56 15 82 10a279 279 0 0070-30c70-40 106-85 109-80s0 15-4 20c-16 24-30 50-45 75-7 12-12 22-25 29-95 57-207 68-288 181-16 23-33 57-28 90s33 48 70 43a178 178 0 0034-11c73-34 92-70 132-114a1258 1258 0 00112-146c10-20 31-30 50-39a1400 1400 0 00188-118c26-19 38-35 42-45 2-7-8-11-17-3zm-363 270c-66 72-65 84-128 139-23 20-67 38-83 32-11-4-10-21 7-45 46-68 153-127 203-153 6-3 38-20 34-15l-33 43zm1651-254a13 13 0 00-3-4 2 2 0 010-1c-10-15-27-12-42-13l-11-1c-8-1-13-3-10-9l29-44c97-139 235-246 361-363l25-23 1-2v-10a21 21 0 00-30-12 333 333 0 00-30 23q-120 108-232 225-93 98-178 201a33 33 0 01-30 15l-120 2-112 5a65 65 0 01-21 0c-7-3 0-10 3-14 9-12 12-14 22-24 88-93 178-184 253-287 18-30 40-62 34-99a86 86 0 00-50-68 127 127 0 00-49-15l-14-2a543 543 0 00-59-3 1454 1454 0 00-638 179c-60 35-119 77-151 140-22 39-19 94 21 120 6 5 25 12 28 1s-11-20-21-25c-24-10-11-39-5-57 89-203 639-343 846-319a129 129 0 0154 16 20 20 0 019 14c-1 32-19 60-37 85q-34 44-69 86c-80 92-165 177-249 264l-6 6a39 39 0 01-27 11 51 51 0 00-8 0c-122 10-247 19-363 60a192 192 0 00-46 24 37 37 0 00-12 30 40 40 0 0015 28 36 36 0 0016 5 7 7 0 005-5c1-2 0-4-1-6a3 3 0 010-2c-4-11-8-30 35-43 32-10 60-14 89-20h1c54-12 108-19 162-25q31-4 64-6c2 0 12-2 14 3s-6 9-7 10c-176 185-396 397-581 576h-1c-13 15-41 28-22 50a10 10 0 0014 2c214-194 470-433 670-641a40 40 0 0133-13l80-5c52-2 116-6 169-6 19 0 20 1 13 11-44 60-92 121-111 194-10 36 1 76 33 97 19 12 35 7 56-2 53-23 53-45 53-60a29 29 0 00-13-22c-2-1-8-4-9-1a190 190 0 01-10 20c-22 27-49 44-67 41-14-2-18-18-15-30 11-62 49-114 84-165q28-38 58-75a26 26 0 0118-10c27-3 53 0 79 0a11 11 0 0013-7 7 7 0 000-5zm1098-13c-2-4-7 0-10 1-6 3-21 14-46 27a586 586 0 01-152 58c-52 12-91 15-103 4s-16-17-4-36l14-17 10-10a14 14 0 0111-4 235 235 0 0068 8c34-2 57-8 77-27a49 49 0 002-64c-29-30-84-7-127 14a301 301 0 00-51 37 13 13 0 01-10 3 339 339 0 00-95 7 94 94 0 01-13 2 13 13 0 01-13-2l-10-14a84 84 0 00-13-12c-48-33-114 7-155 36l-35 28c-6 5-15 11-18 8s1-14 5-21a760 760 0 0045-99c3-9-1-18-12-26a9 9 0 00-11 0 50 50 0 00-7 10l-39 72a55 55 0 01-14 19 230 230 0 01-133 40c-9 0 7-17 10-30a109 109 0 005-26c0-25-25-48-50-39l-14 6c-5 2-11 4-14-7-6-21-18-20-30-16-50 20-89 59-120 102a193 193 0 00-19 38c-17 42 15 102 63 90 52-12 97-46 134-83a34 34 0 0122-11c48-4 84-11 125-37 6-4 10 1 6 6-23 43-51 91-75 133-25 44-98 143-122 188a21 21 0 002 12 70 70 0 0012 14c3 4 12 5 16 1 53-80 152-216 224-280a9 9 0 0110-4c7 2 6 17 14 28s38 20 54 19c50-3 94-17 126-59 21-27 17-54 26-59a150 150 0 0190-19c6 2 11 4 7 9a177 177 0 00-13 22 68 68 0 0021 79c23 19 64 15 97 9 77-16 134-46 229-114a10 10 0 003-14zm-223-28c32-14 47-16 59-12 15 4 15 22-30 39a144 144 0 01-66 6c-8-2 12-21 37-33zm-711 104a257 257 0 01-90 48 100 100 0 01-10 2 5 5 0 00-2 1 14 14 0 01-13-15c5-34 28-62 51-87a285 285 0 0158-50 9 9 0 0112 0c5 6 2 9-3 14a106 106 0 00-11 14 35 35 0 0017 50c9 5 9 9-9 23zm55-51c-15 13-17 15-24 15-20 0-33-7-26-24a52 52 0 0151-32 14 14 0 0115 13 42 42 0 01-16 28zm401-3c-50 29-78 90-147 67-3-1-16-10-10-19a118 118 0 0119-20 218 218 0 0178-46 192 192 0 0144-8c5 0 22 2 25 10 3 6-5 14-9 16z"/>
                      </g>
                    </svg>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {bibleVerseSection && (
      <section className={`index-page verse-content has-text-centered`} dangerouslySetInnerHTML={cleanHtml(bibleVerseSection.html)} />
    )}

    {whoWeAreSection && (
      <section className={`index-page about-us box is-radiusless mb-0`}>
        <div className={`columns container content`}>
          <div className={`column is-full has-text-centered`}>
            <FancyHeading className="fancy-heading" heading={whoWeAreSection.title} />
          </div>
        </div>
        <div className="columns container is-multiline" dangerouslySetInnerHTML={cleanHtml(whoWeAreSection.html)} />
        <div className={`columns`}>
          <div className={`column is-full`}>
            <div className={`control has-text-centered`}>
              <Link className={`button is-link has-text-weight-light is-medium`} to="/about">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    )}

      <section className="index-page video-content">
        <div>
          <figure className="image is-16by9">
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
        <p className="container is-fluid py-3 is-size-4 has-text-centered">
          Learn more about Inspiring Hope Church by watching this message from Pastor Ben.
        </p>
      </section>

    {weeklyGatheringSection && (
      <section className="index-page gathering-section box is-radiusless mb-0 px-0">
        <div className="columns container content">
          <div className="column is-full has-text-centered">
            <FancyHeading className="fancy-heading" heading={weeklyGatheringSection.title} />
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={cleanHtml(weeklyGatheringSection.html)} />
      </section>
    )}

      <section className="index-page caring-section section">
        <div className="columns container content">
          <div className="column is-full has-text-centered">
            <h1>Caring for others</h1>
          </div>
        </div>
        
        <div className="container">
          <div className="level is-mobile-mobile is-medium">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <FontAwesomeIcon icon={["fas", "head-side-mask"]} size="8x" />
                </p>
                <p className="is-uppercase">Encouraging Masks</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <FontAwesomeIcon icon={["fas", "people-arrows"]} size="8x" />
                </p>
                <p className="is-uppercase">Social Distancing</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <FontAwesomeIcon icon={["fas", "pump-soap"]} size="8x" />
                </p>
                <p className="is-uppercase">Providing Hand Sanitizer</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">
                  <FontAwesomeIcon icon={["fas", "spray-can"]} size="8x" />
                </p>
                <p className="is-uppercase">Maintaining Clean Spaces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    { careSection && (
      <section className="index-page container caring-section">
        <div dangerouslySetInnerHTML={cleanHtml(careSection.html)} />
      </section>
    )}

    {kidsSection && (
      <section className="index-page kids-section section">
        <div className="columns container" dangerouslySetInnerHTML={cleanHtml(kidsSection.html)} />
        
        <div className="columns container">
          <div className="column is-full">
            <div className="control has-text-centered">
              <Link className="button is-link has-text-weight-light is-medium" to="/get-connected">
                Get Connected
              </Link>
            </div>
          </div>
        </div>
      </section>
    )}

      <section className={`index-page box is-radiusless is-shadowless mb-0`}>
        <div className={`columns content`}>
          <div className={`column is-full has-text-centered`}>
            <FancyHeading className="fancy-heading" heading={"Inspiring Moments"} />
          </div>
        </div>
        <div className={`columns is-multiline is-centered`}>
          {posts.map(({ node }) => (
            <BlogItem
              blogTitle={node.title}
              blogImageObj={node.featureImageSharp.childImageSharp.fluid}
              blogDate={node.published_at_pretty}
              blogExcerpt={node.excerpt}
              blogLink={`${config.postPrefix}/${node.slug}`}
              key={node.id}
            />
          ))}
        </div>
      </section>

      <section
        className={`index-page subscriptions  is-radiusless is-clipped mb-0`}
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
                    className={`input is-link`}
                    type="email"
                    placeholder="Sign up for newsletter"
                    value={emailAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className={`control`}>
                  <button data-testid="submit-button" type="submit" className={`button is-link`} onClick={handleSubmit}>
                    {formSentIndicator ? <LoaderIcon /> : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;

export const query = graphql`
  query GhostPostQuery {
    allGhostPost(sort: { order: DESC, fields: [published_at] }, limit: 3, skip: 0) {
      edges {
        node {
          ...GhostPostFieldsForIndex
        }
      }
    }
    allGhostPage(filter: {tags: {elemMatch: {name: {eq: "Home Page"}}}}) {
      edges {
        node {
          html
          title
          slug
        }
      }
    }
  }
`;
