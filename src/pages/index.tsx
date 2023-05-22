import React, { type ChangeEvent, type ReactNode, type SyntheticEvent, useEffect, useState } from "react";
import { graphql, Link, type PageProps } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../config";
import { BlogItem, FancyHeading, Map, SEO } from "../components";
import { cleanHtml, findGhostSection } from "../utils";
import "./index.sass";

const HomePage = ({ data }: PageProps<Queries.GhostPostsQuery>) => {
  const SUNDAY = 0;
  const defaultMsg = "Get Inspiring Hope's latest updates.";
  const today = new Date();
  const isSunday = today.getDay() === SUNDAY;
  const [message, setMessage] = useState<ReactNode>(defaultMsg);
  const [emailAddress, setEmailAddress] = useState("");
  const [formSentIndicator, setFormSentIndicator] = useState(false);
  const [isMorning, setIsMorning] = useState(false);
  const posts = data.allGhostPost.edges;
  const pages = data.allGhostPage.edges;

  const bibleVerseSection = pages.find(page =>
    findGhostSection(page, "home-page-verse")
  )?.node;
  const weeklyGatheringSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering")
  )?.node;
  const careSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-covid-care")
  )?.node;
  const kidsSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-kids")
  )?.node;
  const youthSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-youth")
  )?.node;
  const serveSundaySection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-serve-sundays")
  )?.node;
  const inspireGroupsSection = pages.find(page =>
    findGhostSection(page, "home-weekly-gathering-inspire-groups")
  )?.node;
  const whoWeAreSection = pages.find(page =>
    findGhostSection(page, "home-who-we-are")
  )?.node;

  /**
   * Handles changes to the form's inputs. Should be passed to an input's
   * onChange prop.
   * @param {React.ChangeEvent<HTMLInputElement>} event - Provides the value for the input being changed
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailAddress(value);
  };

  /**
   * (Eventual) Async function. Sends form data to server and waits for a response.
   * Once the response is obtained, should update page with the server's response.
   * @param {React.SyntheticEvent<HTMLButtonElement>} event - Used to override the browser's default 'submit' behavior
   */
  const handleSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
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
            <div>
              <strong>
                Great! <em>Check your inbox</em>
              </strong>{" "}
              to <strong>confirm</strong> your subscription.
            </div>
          );
          setEmailAddress("");
        } else {
          setMessage(
            "We encountered an error. Please check your email address and try again."
          );
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

  useEffect(() => {
    if (today.getHours() === 9) {
      setIsMorning(true);
    } else if (today.getHours() === 10) {
      setIsMorning(true);
    } else if (today.getHours() === 11) {
      setIsMorning(true);
    } else if (today.getHours() === 12) {
      setIsMorning(true);
    } else {
      setIsMorning(false); // resets isMorning. Causes re-render?
    }
  });

  return (
    <>
      <section className="index-page fade-in hero is-large">
        <div className="hero-underlay">
          <div className="hero-body">
            <div className="container">
              {/* <div className="columns is-vcentered">
                <div className="column has-text-centered">
                  <img alt="Kids Camp" className="hero-image" src={kidsCamp} />
                </div>
              </div> */}
              <div className={`columns is-vcentered`}>
                <div className={`column`}>
                  <h1 className={`has-text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1000">
                      <title>Church in the YMCA begins February 5, 10:00 a.m. YMCA membership not required.</title>
                      <path d="M157.8 783.1c0 4.1-2 6.2-6.1 6.2h-20.2c-4 0-6.1-2-6.1-6.2v-16h10v13.7h12.3v-13.2l-20.1-19a7.1 7.1 0 0 1-2.2-5.4v-15c0-4.1 2-6.2 6-6.2h20.3c4 0 6.1 2 6.1 6.1v15h-10v-12.6h-12.3v12.2l20.1 19a7.1 7.1 0 0 1 2.2 5.4v16zM210.4 783.1c0 4.1-2 6.2-6.2 6.2H183c-4 0-6.1-2-6.1-6.2v-61h10v58.5h13.6V722h10v61.1zM263.6 789.3h-8.8L238.7 747c.4 2 .6 3.6.6 4.8v37.5h-9.8V722h8.8l16.1 41.5c-.4-2-.6-3.7-.6-4.9V722h9.8v67.3zM316.2 776.6c0 4-1.2 7-3.5 9.3a13.2 13.2 0 0 1-9.5 3.4h-20.5V722h20.5c4 0 7.1 1.2 9.5 3.4 2.3 2.3 3.5 5.4 3.5 9.4v41.8zm-10.1-1.7v-38.6c0-3.8-2-5.6-6-5.6h-7.4v50h7.2c4.1 0 6.2-2 6.2-5.8zM369 789.3h-10l-2-12.8h-12.5l-2 12.8h-10v-.2l13-67.1h10.6l13 67.3zm-13.4-21.4-4.9-30.4-5 30.4h10zM419.5 722.4l-9 28.1c-1 2.8-2.5 7.5-4.3 14v24.8H396v-24.7c-.5-2.3-1.2-4.6-2-7.1l-2.5-7-8.8-28v-.5H393l8 29.3 8-29.3h10.4v.4zM467.9 783.1c0 4.1-2 6.2-6.1 6.2h-20.3c-4 0-6-2-6-6.2v-16h10v13.7h12.3v-13.2l-20.2-19a7.1 7.1 0 0 1-2.1-5.4v-15c0-4.1 2-6.2 6-6.2h20.3c4 0 6 2 6 6.1v15h-10v-12.6h-12.3v12.2l20.2 19a7.1 7.1 0 0 1 2.2 5.4v16zM550 789.3h-10l-2-12.8h-12.5l-2 12.8h-10v-.2l13-67.1h10.6l13 67.3zm-13.4-21.4-4.9-30.4-4.9 30.4h9.9zM596 731h-11.2v58.3h-10v-58.4h-11V722h32.1v9zM653.3 789.3h-9.9v-47.5h-3.8v-1.3l5.2-18.5h8.5v67.3zM705.8 783.1c0 4.1-2 6.2-6 6.2h-21c-4 0-6-2-6-6.2v-54.9c0-4.1 2-6.2 6.1-6.2h20.9c4 0 6 2 6 6.2v55zm-9.8-2.5v-50h-13.3v50H696zM733.8 762h-9.7v-10.5h9.7V762zm0 27.3h-9.7v-10.4h9.7v10.4zM785.1 783.1c0 4.1-2 6.2-6 6.2h-21c-4 0-6-2-6-6.2v-54.9c0-4.1 2-6.2 6.1-6.2H779c4 0 6.1 2 6.1 6.2v55zm-9.8-2.5v-50H762v50h13.3zM837.2 783.1c0 4.1-2 6.2-6 6.2h-21c-4 0-6-2-6-6.2v-54.9c0-4.1 2-6.2 6-6.2h21c4 0 6 2 6 6.2v55zm-9.9-2.5v-50h-13.2v50h13.2zM878.9 789.3h-7l-1.4-9h-8.8l-1.4 9h-7v-.1l9.2-47h7.4l9 47zm-9.4-15-3.4-21.2-3.5 21.2h7zM919 789.3h-6.8V766c0-1.3.2-3 .4-5.1l-6 24H903l-6.1-24c.3 2.2.4 3.9.4 5v23.3h-6.8v-47h6.7l7.4 26 .1 2 .2-2 7.4-26h6.7v47zM270.3 52.5h27.9v58.2h-28c-7.9-21-21.6-31.4-41.1-31.4-16.2 0-28.4 5.5-36.7 16.5a64 64 0 0 0-12.4 39.6c0 15.3 4.4 29 13.1 39 8.8 10 20 14.9 33.5 14.9a42 42 0 0 0 29-11.3c8.4-7.5 14-18 17-31.4l32.5 15.5c-12.4 38.4-39.6 57.6-81.6 57.6-29.7 0-52.1-8-67.2-24a85 85 0 0 1-22.6-60.7c0-17.4 3.9-32.7 11.7-45.7a75.7 75.7 0 0 1 31.7-29.5 96.5 96.5 0 0 1 43.6-10c19.7 0 36.3 5.2 49.6 15.5V52.5zM354 217.7v-28h20.6V80.5h-20.7v-28h79.8v28h-17.3v36.2h45V80.4h-16.8v-28H524v28h-20.7v109.4h20.7v27.9h-79.3v-28h16.8v-45h-45v45h17.3v28H354zM571.7 80.4v-28h78.8v28h-16.2V155c0 10 .4 17.1 1.2 21.5.8 4.4 3 8 6.6 11a21 21 0 0 0 13.5 4.2c5.5 0 10.3-1.4 14-4a18 18 0 0 0 7.2-10.2c1.1-4 1.6-12.2 1.6-24.7V80.4h-16v-28h65.8v28H708V163c0 11.3-.6 19.5-1.8 24.6-1.2 5-3.9 10.2-8.2 15.2a45 45 0 0 1-18.6 12.2 77.4 77.4 0 0 1-28 4.7 83.7 83.7 0 0 1-31.1-5.2 42.8 42.8 0 0 1-27.3-30.7c-1.2-5.6-1.7-15.2-1.7-28.7V80.4h-19.6zM947.2 189.8v27.9h-50.3l-37.3-72.4h-19v44.5h20.7v27.9H775v-28h22.7V80.5H775v-28h99.6c18.8 0 32.3 4.8 40.6 14.2a47.5 47.5 0 0 1 12.4 32.2c0 18.7-9.6 32.4-28.6 41l26.8 50h21.4zM840.7 119h14.7c18.2 0 27.3-6.5 27.3-19.5 0-6.4-2-11.2-6.2-14.4a27.7 27.7 0 0 0-17.2-4.7h-18.6V119zM1125.3 52.5h28v58.2h-28c-7.9-21-21.6-31.4-41.2-31.4-16.1 0-28.4 5.5-36.6 16.5a64 64 0 0 0-12.4 39.6c0 15.3 4.3 29 13 39 8.8 10 20 14.9 33.5 14.9a42 42 0 0 0 29.1-11.3c8.3-7.5 14-18 16.9-31.4l32.5 15.5c-12.3 38.4-39.5 57.6-81.6 57.6-29.7 0-52-8-67.2-24a85 85 0 0 1-22.6-60.7c0-17.4 4-32.7 11.8-45.7a75.7 75.7 0 0 1 31.6-29.5 96.5 96.5 0 0 1 43.7-10c19.7 0 36.2 5.2 49.5 15.5V52.5zM1209 217.7v-28h20.6V80.5H1209v-28h79.8v28h-17.4v36.2h45V80.4h-16.7v-28h79.2v28h-20.7v109.4h20.7v27.9h-79.2v-28h16.7v-45h-45v45h17.4v28H1209zM127 440v-28h25V302.8h-25v-28h93.4v28H195V412h25.3V440H127zM271.7 440v-28h22.1V302.8h-22v-28H341l60.8 103v-75h-21.5v-28h74.1v28h-23.1v138.5h-36.8l-71.3-122.5v93.4h20.8V440h-72.3zM622.6 440v-28h24.9V302.8h-24.9v38.5h-28.3v-66.4H744v66.4h-28v-38.5h-25.5V412h24.8V440h-92.7zM793.3 440v-28H814V302.8h-20.7v-28H873v28h-17.3v36.2h45v-36.2H884v-28h79.2v28h-20.6V412h20.6V440H884v-28h16.8v-45h-45v45H873v28h-79.8zM1017.5 440v-28h19.8V302.8h-19.8v-28h145.6v52.4h-31.6v-24.4h-51.2v38.1h41.4v28h-41.4V412h51.2v-24.7h31.6V440h-145.6zM162.9 662.3v-28H186v-44.6L141.3 525H121v-28h82.7v28h-16.3l24.2 40.3 24.7-40.3h-17v-28H292v28h-20.3l-42.7 64.7v44.7h23v27.9h-89.2zM337.3 662.3v-28h21.4V525h-21.4v-28h83l36.2 96.9 36.4-96.8h84.5V525H556v109.4h21.4v27.9h-83.2v-28h20V525h-4l-51.1 137.3h-17.8L389.5 525h-4v109.4h21.7v27.9h-69.9zM763.4 497h27.9v58.3h-28c-7.9-21-21.6-31.4-41.2-31.4-16.1 0-28.3 5.5-36.6 16.5a64 64 0 0 0-12.4 39.6c0 15.3 4.4 29 13.1 39 8.8 10 19.9 15 33.4 15a42 42 0 0 0 29.1-11.4c8.4-7.5 14-18 17-31.3l32.5 15.5c-12.4 38.3-39.6 57.5-81.6 57.5-29.7 0-52.1-8-67.2-24a85 85 0 0 1-22.6-60.7c0-17.4 3.9-32.6 11.7-45.7a75.7 75.7 0 0 1 31.7-29.5 96.5 96.5 0 0 1 43.6-10c19.7 0 36.2 5.2 49.5 15.5v-12.8zM1007.9 634.4v27.9h-81.3v-28h21.2l-7.9-28.3H897l-8.8 28.4h22.1v27.9h-73.1v-28h20.4L889.8 525h-22v-28h107.9v28h-22.2L988 634.4h19.8zM933 581.8 919.4 532l-14.9 49.8h28.6zM144.7 898.3l-5.7 18c-.7 1.8-1.7 4.8-2.9 9v15.9h-6.5v-15.9l-1.2-4.5-1.6-4.5-5.7-18v-.3h6.6l5.2 18.8L138 898h6.7v.3zM191.2 941.2H185v-21.3l.4-4.7-5.6 22h-3.2l-5.6-22 .3 4.7v21.3h-6.2V898h6.1l6.8 23.9c0 .2.2.9.2 2 0-.5 0-1.2.2-2l6.8-23.9h6v43.2zM233.8 937.3c0 2.6-1.3 3.9-4 3.9h-13.4c-2.6 0-3.9-1.3-3.9-4V902c0-2.7 1.3-4 3.9-4h13.4c2.7 0 4 1.3 4 4v10h-6.4v-8.4H219v32h8.4v-9h6.4v10.7zM277.6 941.2h-6.4l-1.3-8.2h-8.1l-1.3 8.2H254v-.1l8.4-43.1h6.8l8.3 43.2zm-8.6-13.7-3.2-19.5-3.2 19.5h6.4zM352.9 941.2h-6.2v-21.3c0-1.1 0-2.7.3-4.7l-5.5 22h-3.3l-5.6-22 .4 4.7v21.3h-6.2V898h6l6.9 23.9.1 2c0-.5 0-1.2.2-2l6.8-23.9h6v43.2zM392 941.2h-17.8V898h17.7v5.7h-11.3v12.6h9.8v5.6h-9.8v13.6h11.5v5.7zM439.2 941.2h-6.3v-21.3l.4-4.7-5.5 22h-3.3l-5.6-22 .4 4.7v21.3H413V898h6l6.8 23.9c.1.2.2.9.2 2 0-.5 0-1.2.2-2L433 898h6v43.2zM481.7 937.3c0 2.6-1.4 3.9-4 3.9h-17.2V898h17c2.7 0 4 1.3 4 4v11c0 1.6-.5 2.7-1.4 3.5l-3.4 2.1 3.5 2.2c1 .9 1.5 2 1.5 3.6v12.8zm-6.7-23.4v-10.5h-8v12.7h4.9l3.1-2.2zm.2 21.9v-12.3l-3.2-2.1h-5v14.4h8.2zM520.8 941.2H503V898h17.8v5.7h-11.3v12.6h9.7v5.6h-9.7v13.6h11.4v5.7zM563.9 941.2h-6.7l-7.2-20v-4h6.4v-13.6h-8.1v37.6h-6.5V898h17.1c2.6 0 4 1.3 4 4v15.7c0 1.8-.7 3-2 3.5-.6.3-2 .4-4.1.4l7 19.6zM605 937.3c0 2.6-1.3 3.9-4 3.9h-13c-2.5 0-3.8-1.3-3.8-4V927h6.5v8.8h7.9v-8.5l-13-12.3c-1-.9-1.4-2-1.4-3.4V902c0-2.7 1.3-4 3.9-4h13c2.6 0 3.9 1.3 3.9 4v9.6h-6.5v-8.1h-7.8v7.8l12.9 12.2c1 .8 1.4 2 1.4 3.5v10.3zM648 941.2h-6.5v-19.4h-8.7v19.4h-6.5V898h6.5v17.8h8.7V898h6.5v43.2zM675.9 941.2h-6.5V898h6.5v43.2zM718.1 921.5c0 2.7-1.3 4-4 4h-10.4v15.7h-6.5V898h17c2.6 0 4 1.3 4 4v19.5zm-6.5-1.5v-16.4h-7.9V920h7.9zM800.1 941.2h-5.7L784.1 914c.3 1.3.4 2.3.4 3v24.2h-6.3V898h5.7l10.3 26.6a16 16 0 0 1-.4-3.1V898h6.3v43.2zM843.2 937.2c0 2.6-1.3 4-3.9 4h-14c-2.6 0-3.9-1.4-3.9-4V902c0-2.6 1.3-4 3.9-4h14c2.6 0 4 1.4 4 4v35.3zm-6.4-1.6v-32h-8.9v32h8.9zM884.3 903.7h-7.1v37.5h-6.4v-37.5h-7.1V898h20.6v5.7zM955.3 941.2h-6.7l-7.2-20.1v-4h6.4v-13.6h-8.2v37.7h-6.4V898h17.1c2.6 0 4 1.3 4 4v15.6c0 1.9-.7 3-2 3.6-.6.2-2 .4-4.1.4l7 19.5zM994 941.2h-18V898h17.8v5.7h-11.3v12.6h9.7v5.6h-9.7v13.5H994v5.7zM1039.6 941.2h-.4l-3-2.2c-.4 1.4-1.6 2.2-3.4 2.2h-14c-2.6 0-3.9-1.4-3.9-4v-35.3c0-2.6 1.3-4 4-4h13.9c2.6 0 3.9 1.4 3.9 4v31.3l3 2v6zm-9.4-5.6v-1.5l-3.7-2.9v-5.9h.4l3.3 2.6v-24.4h-8.8v32.1h8.8zM1081.6 937.2c0 2.6-1.3 4-4 4H1064c-2.6 0-4-1.4-4-4V898h6.5v37.6h8.7V898h6.5v39.2zM1109.4 941.2h-6.4V898h6.4v43.2zM1153 941.2h-6.8L1139 921v-4h6.3v-13.6h-8.1v37.7h-6.5V898h17.2c2.5 0 3.8 1.3 3.8 4v15.6c0 1.9-.6 3-1.8 3.6-.7.2-2 .4-4.2.4l7.1 19.5zM1191.6 941.2h-18V898h17.8v5.7h-11.3v12.6h9.8v5.6h-9.8v13.5h11.5v5.7zM1234 933c0 2.6-.7 4.5-2.2 6a8.4 8.4 0 0 1-6 2.2h-13.3V898h13.2c2.6 0 4.6.7 6.1 2.2a8 8 0 0 1 2.3 6V933zm-6.4-1V907c0-2.4-1.3-3.6-3.8-3.6h-4.8v32.1h4.6c2.7 0 4-1.2 4-3.7zM775.6 950v-3.3h101.7v3.3H775.6z" fill="#FFF" />
                    </svg>
                  </h1>
                  <nav className="level">
                    <div className="level-item has-text-centered">
                      <Link
                        className="button is-link is-large"
                        to="/watch">
                        <span className="icon is-medium">
                          <FontAwesomeIcon icon={["fas", "video"]} size="1x" />
                        </span>
                        <span className="has-text-white">{`Watch ${isSunday && isMorning ? "Live" : "Messages"}`}</span>
                      </Link>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="hero-foot pb-6">
            <nav className="level">
              <div className="level-item has-text-centered">
                <a
                  className="button is-link is-size-4-tablet"
                  href="https://inspiringhopechurch.churchcenter.com/registrations/events/1255291">
                  <span>Kids Camp Registration</span>
                </a>
              </div>
              <div className="level-item has-text-centered">
                <Link
                  className="button is-link is-size-4-tablet"
                  to="/watch">
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={["fas", "video"]} size="1x" />
                  </span>
                  <span>{`Watch ${isSunday && isMorning ? "Live" : "Messages"}`}</span>
                </Link>
              </div>
            </nav>
          </div> */}
        </div>
      </section>

      {bibleVerseSection && (
        <section className={`index-page verse-content section`} dangerouslySetInnerHTML={cleanHtml(bibleVerseSection.html)} />
      )}

      {whoWeAreSection && (
        <section className={`index-page about-us section`}>
          <div className={`columns container content`}>
            <div className={`column`}>
              <FancyHeading
                className="has-text-centered"
                heading={whoWeAreSection.title || ''}
              />
            </div>
          </div>
          <div className="columns container is-multiline" dangerouslySetInnerHTML={cleanHtml(whoWeAreSection.html)} />
          <div className={`columns`}>
            <div className={`column is-full`}>
              <div className={`control has-text-centered my-3`}>
                <Link className={`button is-link has-text-weight-light is-medium`} to="/about">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="index-page image-content section">
        <h1 className={`has-text-white`}>
          <svg xmlns="http://www.w3.org/2000/svg" strokeMiterlimit="10" strokeWidth=".4" viewBox="0 0 5691 1280" width="50%" height="50%">
            <title>Inspiring Hope Church</title>
            <g fill="#221f53" stroke="#221f53">
              <path id="church-logo" strokeWidth="4" d="M4116 1256c-46 0-82-38-81-87a83 83 0 01145-57l10-10c-62-63-171-24-170 69s112 131 171 65l-9-9a88 88 0 01-66 29zm333-93h-122v-89h-15v192h15v-90h122v90h15v-192h-15v89zm293 23c1 46-24 70-63 70-41 0-65-26-65-71v-111h-14v112c0 54 33 83 79 83s78-29 78-85v-109h-14zm300-57c-1-36-30-54-69-55h-80v192h14v-79h63l61 79h18l-63-82c32-4 56-23 56-55zm-135 45v-87h65c35 0 55 17 55 42 0 28-23 45-55 45zm353 82c-46 0-81-38-81-87a83 83 0 01145-57l10-10c-61-63-171-24-170 69s112 131 172 65l-10-9a88 88 0 01-66 29zm334-93h-123v-89h-14v192h14v-90h123v90h14v-192h-14v89z" />
            </g>
            <g fill="#58cadd" stroke="#58cadd">
              <path id="inspiring-hope-logo" strokeWidth="4" d="M881 307c45-58 91-117 128-181 35-59 3-125-67-124h-14l-15 2c-118 16-233 57-346 96-152 58-309 112-443 207a153 153 0 00-21 20h-1c-19 23-2 58 22 69a196 196 0 0041 14c80 16 162 18 244 17h13a284 284 0 0169 5 51 51 0 0016 1 15 15 0 015-1c10-1 0-17-5-20a66 66 0 00-27-10 443 443 0 00-95-8c-82-1-167-2-248-21a13 13 0 01-9-8 21 21 0 014-11 44 44 0 0111-9l12-9a850 850 0 01155-88q141-64 288-116a2369 2369 0 01263-80 379 379 0 01102-13 107 107 0 0119 4 5 5 0 012 1 14 14 0 018 13l-2 6a60 60 0 01-5 15 33 33 0 00-4 6l-31 53C821 320 672 487 523 653s-340 369-495 528a307 307 0 00-23 25 23 23 0 000 25 12 12 0 0015 4l36-37c273-272 585-589 825-891zm1040 138a12 12 0 006 2 56 56 0 0016-5l35-19c3-1 4-5 5-7a19 19 0 00-7-19 17 17 0 00-19-5c-20 8-59 29-36 53zm257 181a11 11 0 01-6-19c8-11 16-17 25-28l18-27a25 25 0 001-20 29 29 0 00-40-19 4 4 0 01-2 0l-23 12c-34 22-68 44-101 68-8 6-14 1-10-7l7-12 10-16 26-42a21 21 0 00-10-28 10 10 0 00-8-1 34 34 0 00-9 8l-47 66a422 422 0 01-36 35c-58 48-133 107-206 109-7 0-23-3-23-15a197 197 0 0138-62 24 24 0 003-3 1088 1088 0 0175-83c9-10 8-20-3-29a16 16 0 00-19 2l-10 8-21 19a217 217 0 01-37 27c-25 13-37 20-100 33a64 64 0 01-32-1c-4-2-10-15-12-19l-4-5c-49-50-122-6-167 26l-41 32a7 7 0 01-11-10l4-7a755 755 0 0045-99c3-9-1-18-12-26-2-3-9-4-11 0a56 56 0 00-7 10l-23 41a190 190 0 01-16 27 199 199 0 01-73 48c-49 19-91 29-137 46-16 6-22-1-18-13l1-12a553 553 0 0117-54 128 128 0 0180-79c14-5 20 2 28 1a10 10 0 009-10 19 19 0 00-10-19 65 65 0 00-39-5c-43 5-74 38-92 76a136 136 0 00-6 13 56 56 0 01-14 22c-53 44-80 50-131 75-7 3 0-19 2-25v-3a59 59 0 00-26-62c-44-23-105 31-143 52a116 116 0 01-15 7 7 7 0 01-4-2l-2-2a40 40 0 012-4 110 110 0 019-15c19-24 30-42 50-66 9-12 17-23 6-37-4-5-17-8-22-3a69 69 0 00-11 13 40 40 0 00-4 5c-46 63-97 122-138 187a31 31 0 005 39 16 16 0 0019 5 22 22 0 015-3c55-42 110-87 171-121a188 188 0 0155-25 36 36 0 018-1c2 1 6 3 6 5a26 26 0 010 13 154 154 0 01-7 18l-7 23c-8 18-17 68 8 61 12-3 37-36 62-51 38-22 80-47 98-64 4-5 4 4 3 8l-12 54c-1 7-5 22-11 25-24 12-95 44-122 63-46 31-72 56-70 84 0 20 25 26 70 24a236 236 0 0044-7c58-16 90-67 104-117l8-24c4-10 4-10 17-18 55-30 136-48 198-84 7-4 6 5-1 17l-74 129c-24 45-80 123-103 169a21 21 0 002 12 73 73 0 0012 14c3 4 12 5 15 1a1521 1521 0 01222-274 105 105 0 004 30 38 38 0 0043 27c55-7 108-24 139-64a191 191 0 0021-37 20 20 0 0113-12l42-11a368 368 0 0071-26c8-4 8 0 3 6l-25 29a139 139 0 00-25 53c-4 29 16 60 48 59 70-11 115-59 182-96 6-2 15-5-3 19l-38 53-32 50a23 23 0 005 27 16 16 0 0022 5c69-64 171-172 252-220 6-4-1 15-6 20a39 39 0 00-7 15 27 27 0 0025 35c18 1 25-13 17-16zM1074 775a147 147 0 01-44 36 162 162 0 01-60 19c-9 1-23-1-23-13 0-16 25-49 94-74 24-9 38-12 49-17 5-3 9 0 5 11a173 173 0 01-21 38zm528-167c-42 19-108 103-161 71a7 7 0 01-2-8 51 51 0 0114-19c29-23 51-42 86-56a135 135 0 0158-10c12 2 19 15 5 22zm805-137a13 13 0 006 3 57 57 0 0016-4l37-17c2 0 4-4 5-7a19 19 0 00-6-20 17 17 0 00-19-6c-20 8-60 26-39 51zm895 109a360 360 0 01-46 37 915 915 0 01-140 69c-19 9-11-6-4-18a1310 1310 0 0067-124 70 70 0 007-19 19 19 0 00-2-12 122 122 0 00-16-17 12 12 0 00-17-2 909 909 0 01-217 173 595 595 0 01-54 26 5 5 0 01-2 0c-13 6-30 6-38-2s-7-25 4-44a262 262 0 01113-101c31-15 67-20 98 0 6 3 9-1 8-5a29 29 0 00-6-12 90 90 0 00-57-28c-48-7-99 24-136 57a722 722 0 01-56 50 745 745 0 01-100 62c-11 6 0-28 2-38 4-23-4-52-25-63-44-22-105 32-143 52-10 6-19-4-10-15 19-24 30-42 50-66 9-12 17-23 6-37-4-5-17-8-22-3a69 69 0 00-11 13 32 32 0 00-4 5l-39 51a221 221 0 01-43 40c-63 46-117 63-207 94-10 3-20-1-20-13a195 195 0 0139-62 33 33 0 002-3 1088 1088 0 0175-83c9-10 8-20-3-29a14 14 0 00-19 1 109 109 0 00-11 8h0a667 667 0 00-87 95 150 150 0 00-28 58c-4 29 17 64 48 59 29-4 50-17 74-30 36-20 75-44 111-62 9-4 10 4-1 19l-29 45a31 31 0 005 39 16 16 0 0020 4 22 22 0 014-3c56-42 110-86 172-121a188 188 0 0154-25 36 36 0 018-1c2 1 6 3 6 5a26 26 0 010 13 154 154 0 01-7 18l-7 23c-12 35-8 74 17 66a114 114 0 0031-24c35-30 55-56 85-72 10-5-2 4-3 37a101 101 0 002 17 92 92 0 0020 36c21 22 56 15 82 10a279 279 0 0070-30c70-40 106-85 109-80s0 15-4 20c-16 24-30 50-45 75-7 12-12 22-25 29-95 57-207 68-288 181-16 23-33 57-28 90s33 48 70 43a178 178 0 0034-11c73-34 92-70 132-114a1258 1258 0 00112-146c10-20 31-30 50-39a1400 1400 0 00188-118c26-19 38-35 42-45 2-7-8-11-17-3zm-363 270c-66 72-65 84-128 139-23 20-67 38-83 32-11-4-10-21 7-45 46-68 153-127 203-153 6-3 38-20 34-15l-33 43zm1651-254a13 13 0 00-3-4 2 2 0 010-1c-10-15-27-12-42-13l-11-1c-8-1-13-3-10-9l29-44c97-139 235-246 361-363l25-23 1-2v-10a21 21 0 00-30-12 333 333 0 00-30 23q-120 108-232 225-93 98-178 201a33 33 0 01-30 15l-120 2-112 5a65 65 0 01-21 0c-7-3 0-10 3-14 9-12 12-14 22-24 88-93 178-184 253-287 18-30 40-62 34-99a86 86 0 00-50-68 127 127 0 00-49-15l-14-2a543 543 0 00-59-3 1454 1454 0 00-638 179c-60 35-119 77-151 140-22 39-19 94 21 120 6 5 25 12 28 1s-11-20-21-25c-24-10-11-39-5-57 89-203 639-343 846-319a129 129 0 0154 16 20 20 0 019 14c-1 32-19 60-37 85q-34 44-69 86c-80 92-165 177-249 264l-6 6a39 39 0 01-27 11 51 51 0 00-8 0c-122 10-247 19-363 60a192 192 0 00-46 24 37 37 0 00-12 30 40 40 0 0015 28 36 36 0 0016 5 7 7 0 005-5c1-2 0-4-1-6a3 3 0 010-2c-4-11-8-30 35-43 32-10 60-14 89-20h1c54-12 108-19 162-25q31-4 64-6c2 0 12-2 14 3s-6 9-7 10c-176 185-396 397-581 576h-1c-13 15-41 28-22 50a10 10 0 0014 2c214-194 470-433 670-641a40 40 0 0133-13l80-5c52-2 116-6 169-6 19 0 20 1 13 11-44 60-92 121-111 194-10 36 1 76 33 97 19 12 35 7 56-2 53-23 53-45 53-60a29 29 0 00-13-22c-2-1-8-4-9-1a190 190 0 01-10 20c-22 27-49 44-67 41-14-2-18-18-15-30 11-62 49-114 84-165q28-38 58-75a26 26 0 0118-10c27-3 53 0 79 0a11 11 0 0013-7 7 7 0 000-5zm1098-13c-2-4-7 0-10 1-6 3-21 14-46 27a586 586 0 01-152 58c-52 12-91 15-103 4s-16-17-4-36l14-17 10-10a14 14 0 0111-4 235 235 0 0068 8c34-2 57-8 77-27a49 49 0 002-64c-29-30-84-7-127 14a301 301 0 00-51 37 13 13 0 01-10 3 339 339 0 00-95 7 94 94 0 01-13 2 13 13 0 01-13-2l-10-14a84 84 0 00-13-12c-48-33-114 7-155 36l-35 28c-6 5-15 11-18 8s1-14 5-21a760 760 0 0045-99c3-9-1-18-12-26a9 9 0 00-11 0 50 50 0 00-7 10l-39 72a55 55 0 01-14 19 230 230 0 01-133 40c-9 0 7-17 10-30a109 109 0 005-26c0-25-25-48-50-39l-14 6c-5 2-11 4-14-7-6-21-18-20-30-16-50 20-89 59-120 102a193 193 0 00-19 38c-17 42 15 102 63 90 52-12 97-46 134-83a34 34 0 0122-11c48-4 84-11 125-37 6-4 10 1 6 6-23 43-51 91-75 133-25 44-98 143-122 188a21 21 0 002 12 70 70 0 0012 14c3 4 12 5 16 1 53-80 152-216 224-280a9 9 0 0110-4c7 2 6 17 14 28s38 20 54 19c50-3 94-17 126-59 21-27 17-54 26-59a150 150 0 0190-19c6 2 11 4 7 9a177 177 0 00-13 22 68 68 0 0021 79c23 19 64 15 97 9 77-16 134-46 229-114a10 10 0 003-14zm-223-28c32-14 47-16 59-12 15 4 15 22-30 39a144 144 0 01-66 6c-8-2 12-21 37-33zm-711 104a257 257 0 01-90 48 100 100 0 01-10 2 5 5 0 00-2 1 14 14 0 01-13-15c5-34 28-62 51-87a285 285 0 0158-50 9 9 0 0112 0c5 6 2 9-3 14a106 106 0 00-11 14 35 35 0 0017 50c9 5 9 9-9 23zm55-51c-15 13-17 15-24 15-20 0-33-7-26-24a52 52 0 0151-32 14 14 0 0115 13 42 42 0 01-16 28zm401-3c-50 29-78 90-147 67-3-1-16-10-10-19a118 118 0 0119-20 218 218 0 0178-46 192 192 0 0144-8c5 0 22 2 25 10 3 6-5 14-9 16z" />
            </g>
          </svg>
        </h1>
      </section>

      {weeklyGatheringSection && (
        <section className="index-page gathering-section section px-0">
          <div className="columns container content">
            <div className="column">
              <FancyHeading
                className="has-text-centered"
                heading={weeklyGatheringSection.title || ''}
              />
            </div>
          </div>
          <div className="content" dangerouslySetInnerHTML={cleanHtml(weeklyGatheringSection.html)} />
          <div className="columns container">
            <div className="column is-full">
              <div className="control has-text-centered my-3">
                <Link className="button is-link has-text-weight-light is-medium" to="/watch">
                  <span className="icon is-medium">
                    <FontAwesomeIcon icon={["fas", "video"]} size="1x" />
                  </span>
                  <span>{`Watch ${isSunday && isMorning ? "Live" : "Messages"}`}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Map longitude={-84.5785} latitude={39.4222} />

      {careSection && (
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
                  <figure className="heading is-inline-block">
                    <svg className="image is-96x96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.77 42.9">
                      <title>Mask icon</title>
                      <path fill="#fff"
                        d="M73,1.23A4.71,4.71,0,0,0,68.75.51c-4,1.26-7.19,7.52-8.63,10.79-1.78-.7-17.67-6.89-22.77-6.89s-20.93,6.23-22.59,6.9C13.38,8.13,10.1,1.53,6,.23A4.74,4.74,0,0,0,1.71,1c-3.15,2.19-2,8.39,3.65,19A166.46,166.46,0,0,0,14.2,34.44v0l0,0,.06.08h0l.09.09a22.87,22.87,0,0,0,5.87,4.16A38.27,38.27,0,0,0,38.08,42.9c8.28,0,13.93-2.24,17.21-4.11a18.53,18.53,0,0,0,5.26-4.19l.14-.18v-.05l.05,0A161.7,161.7,0,0,0,69.53,20C75,9.54,76.19,3.41,73,1.23ZM20.21,17.1v-1a.58.58,0,0,1,.58-.59H53.67a.58.58,0,0,1,.58.59v1a.58.58,0,0,1-.58.58H20.79A.58.58,0,0,1,20.21,17.1Zm33.46,5a.58.58,0,0,1,.58.58v.88a.58.58,0,0,1-.58.58H20.79a.58.58,0,0,1-.58-.58v-.88a.58.58,0,0,1,.58-.58Zm-33.46,8v-.88a.58.58,0,0,1,.58-.58H53.67a.58.58,0,0,1,.58.58v.88a.58.58,0,0,1-.58.58H20.79A.58.58,0,0,1,20.21,30.06ZM6.57,19.27C1.56,9.83.11,3.73,2.49,2.08a3.39,3.39,0,0,1,3.1-.55C10.27,3,14.12,13.37,14.16,13.47h0V32C12.51,29.44,9.33,24.47,6.57,19.27Zm61.76.05c-2.78,5.24-6,10.25-7.64,12.72V13.49c.64-1.64,4.2-10.33,8.47-11.68a3.39,3.39,0,0,1,3.1.54C74.64,4,73.24,10,68.33,19.32Z"
                      />
                    </svg>
                  </figure>
                  <p className="is-uppercase">Encouraging Masks</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <figure className="heading is-inline-block">
                    <svg className="image is-96x96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.82 52.42">
                      <title>Social distancing icon</title>
                      <g fill="#fff">
                        <path
                          d="M45.7,24.85a1.07,1.07,0,0,0-1.51,1.51l1.2,1.2H31.28l1.2-1.2A1.07,1.07,0,0,0,31,24.85l-3,3a1.08,1.08,0,0,0,0,1.51l3,3a1.07,1.07,0,0,0,1.52-1.51l-1.2-1.21H45.39l-1.2,1.21a1.07,1.07,0,0,0,1.51,1.51l3-3a1.06,1.06,0,0,0,0-1.51Z"
                        />
                        <text letterSpacing="0.01em" stroke="#fff" fontSize="9.68px" fontFamily="Roboto-Regular, Roboto, Roboto Light" strokeLinecap="round" strokeLinejoin="round" transform="translate(35.74 19.35)">6</text>
                        <circle cx="63.56" cy="8.96" r="4.82" />
                        <path
                          d="M73.86.91a2.4,2.4,0,0,0-3.78,3c2.17,2.74,2.57,6.19,1,8.68a7.21,7.21,0,0,1-3.93,2.81H60.11a2.4,2.4,0,0,0-1.6.57A14.47,14.47,0,0,0,56,18.51,18.92,18.92,0,0,0,52.24,30.8a2.4,2.4,0,0,0,2.41,2.33h.08a2.36,2.36,0,0,0,2.33-2.49,14.71,14.71,0,0,1,1.21-6.59A80.46,80.46,0,0,1,58,33l-.16,1.61V50a2.42,2.42,0,0,0,4.83,0V37.15h2V50a2.42,2.42,0,0,0,4.83,0V34.5l-.25-5.22c-.08-2.41-.08-4.91,0-7.48l.09-2.09a11.21,11.21,0,0,0,5.7-4.58A12.17,12.17,0,0,0,73.86.91Z"
                        />
                        <circle cx="13.26" cy="8.96" r="4.82" />
                        <path
                          d="M3,.91a2.4,2.4,0,1,1,3.77,3c-2.17,2.74-2.57,6.19-1,8.68a7.19,7.19,0,0,0,3.94,2.81h7.07a2.4,2.4,0,0,1,1.6.57,14.88,14.88,0,0,1,2.5,2.57A19,19,0,0,1,24.58,30.8a2.4,2.4,0,0,1-2.41,2.33h-.08a2.36,2.36,0,0,1-2.33-2.49,14.83,14.83,0,0,0-1.2-6.59A80.45,80.45,0,0,0,18.8,33L19,34.58V50a2.41,2.41,0,1,1-4.82,0V37.15h-2V50a2.41,2.41,0,1,1-4.82,0V34.5l.24-5.22c.08-2.41.08-4.91,0-7.48l-.08-2.09a11.19,11.19,0,0,1-5.71-4.58A12.16,12.16,0,0,1,3,.91Z"
                        />
                      </g>
                    </svg>
                  </figure>
                  <p className="is-uppercase">Social Distancing</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <figure className="heading is-inline-block">
                    <svg className="image is-96x96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.23 61.37">
                      <title>Hand sanitizer icon</title>
                      <g fill="#fff">
                        <path
                          d="M26.33,0H10.06a1.24,1.24,0,0,0-.64.18l-5,2.88a1.36,1.36,0,0,0-.64.81,1.37,1.37,0,0,0,1.3,1.7,1.45,1.45,0,0,0,.69-.18L10.47,2.7H26.33a1.33,1.33,0,0,0,1.34-1.35A1.33,1.33,0,0,0,26.33,0Z"
                        />
                        <rect x="18.38" y="4.04" width="5.82" height="8.03" />
                        <path
                          d="M3.7,10.23C2.13,12.62,0,15.81,0,18.34A3.27,3.27,0,0,0,1.05,21a4,4,0,0,0,2.65.84A4,4,0,0,0,6.36,21a3.24,3.24,0,0,0,1-2.64C7.41,15.8,5.3,12.67,3.7,10.23Z"
                        />
                        <path
                          d="M18,13.44A2.51,2.51,0,0,0,15.51,16v1.85H27.08V16a2.51,2.51,0,0,0-2.53-2.53Z"
                        />
                        <path
                          d="M15.31,19.19A13.54,13.54,0,0,0,9,25.31a16.8,16.8,0,0,0-2,7v.05L4.36,58.08a3.28,3.28,0,0,0,3.31,3.29H34.92a3.28,3.28,0,0,0,3.31-3.29L35.65,32.35v0a17.62,17.62,0,0,0-2-7,13.4,13.4,0,0,0-6.29-6.12Z"
                        />
                      </g>
                    </svg>
                  </figure>
                  <p className="is-uppercase">Providing Hand Sanitizer</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <figure className="heading is-inline-block">
                    <svg className="image is-96x96" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.98 75.53">
                      <title>Disinfectant icon</title>
                      <g fill="#fff">
                        <path
                          d="M47.44,50.19H3.09a.55.55,0,0,0-.55.56.57.57,0,0,0,0,.13l6,24.23a.56.56,0,0,0,.54.42H41.49a.56.56,0,0,0,.54-.42L48,50.88a.55.55,0,0,0-.41-.67Z"
                        />
                        <g letterSpacing="0.01em">
                          <text fontSize="24.55px" fontWeight="500" transform="translate(36.69 20.86)">+</text>
                          <text fontSize="15.36px" fontWeight="700" transform="translate(46.95 29.82)">+</text>
                          <text fontSize="15.36px" fontWeight="700" transform="translate(29.52 25.46)">+</text>
                        </g>
                        <path
                          d="M50,45.65H.55A.55.55,0,0,0,0,46.2v2.33a.56.56,0,0,0,.55.56h.77l.15,0a.65.65,0,0,1,.19,0H48.87a.58.58,0,0,1,.19,0l.15,0H50a.56.56,0,0,0,.55-.56V46.2A.55.55,0,0,0,50,45.65Z"
                        />
                        <path
                          d="M30.19,32.74H44.08a.55.55,0,0,0,.55-.55V28.5a.55.55,0,0,0-.55-.55H34.86a5.39,5.39,0,0,0-5.21,4.11.56.56,0,0,0,.42.67Z"
                        />
                        <rect x="33.93" y="33.85" width="6.27" height="1.84" rx="0.55" />
                        <path
                          d="M30.06,44.54h14a.55.55,0,0,0,.55-.55V41a4.24,4.24,0,0,0-4.24-4.24H33.75A4.24,4.24,0,0,0,29.51,41v3A.55.55,0,0,0,30.06,44.54Z"
                        />
                        <path
                          d="M7.93,39H22a.55.55,0,0,1,.55.55h0V44a.55.55,0,0,1-.55.55h-14A.54.54,0,0,1,7.38,44h0V39.56A.55.55,0,0,1,7.93,39Z"
                        />
                        <path
                          d="M8.89,37.9H21a.55.55,0,0,0,.55-.55.59.59,0,0,0-.09-.31L18.5,32.62a.56.56,0,0,0-.46-.25h-6.2a.54.54,0,0,0-.46.25L8.43,37a.55.55,0,0,0,.46.86Z"
                        />
                        <rect x="11.8" y="25" width="6.27" height="6.27" rx="0.55" />
                      </g>
                    </svg>
                  </figure>
                  <p className="is-uppercase">Maintaining Clean Spaces</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      <section className="index-page kids-section section">
        {kidsSection && (
          <div className="columns container" dangerouslySetInnerHTML={cleanHtml(kidsSection.html)} />
        )}
        {youthSection && (
          <div className="columns container" dangerouslySetInnerHTML={cleanHtml(youthSection.html)} />
        )}
        {serveSundaySection && (
          <div className="columns container" dangerouslySetInnerHTML={cleanHtml(serveSundaySection.html)} />
        )}
        {inspireGroupsSection && (
          <div className="columns container" dangerouslySetInnerHTML={cleanHtml(inspireGroupsSection.html)} />
        )}

        <div className="columns container">
          <div className="column is-full">
            <div className="control has-text-centered my-3">
              <Link className="button is-link has-text-weight-light is-medium" to="/get-connected">
                Get Connected
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`index-page blog-section section`}>
        <div className={`columns content`}>
          <div className={`column`}>
            <FancyHeading
              className="has-text-centered"
              heading={"Inspiring Moments"}
            />
          </div>
        </div>
        <div className={`columns is-multiline is-centered`}>
          {/** Autogenerated featureImageSharp defined childImageSharp as potentially null.
            Type should be undefined, but we ignore and assume they're interchangeable. */}
          {posts.map(({ node }) => (
            <BlogItem
              blogTitle={node.title!}
              // @ts-expect-error
              blogImageObj={getImage(node.featureImageSharp)}
              blogDate={node.published_at_pretty ?? undefined}
              blogAuthor={node.primary_author?.name ?? undefined}
              blogReadingTime={node.reading_time ?? undefined}
              blogExcerpt={node.excerpt ?? ''}
              blogLink={`${config.postPrefix}/${node.slug}`}
              key={node.id}
            />
          ))}
        </div>

        <div className="columns container">
          <div className="column is-full">
            <div className="control has-text-centered my-3">
              <Link className="button is-link has-text-weight-light is-medium" to="/blog">
                More Posts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`index-page subscriptions  is-radiusless is-clipped mb-0`}
      >
        <div
          className={`columns is-multiline is-mobile is-centered is-vcentered has-text-centered`}
        >
          <div className={`column container is-fluid is-narrow is-full`}>
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
                  <button
                    data-testid="submit-button"
                    type="submit"
                    className={`button is-link ${formSentIndicator ? "is-loading" : ""}`}
                    onClick={handleSubmit}
                  >
                    {formSentIndicator ? "Submitting ..." : "Sign Up"}
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
  query GhostPosts {
    allGhostPost(
      sort: { published_at: DESC }
      limit: 3
      skip: 0
    ) {
      edges {
        node {
          ...GhostPostFieldsForIndex
        }
      }
    }
    allGhostPage(
      filter: { tags: { elemMatch: { name: { eq: "Home Page" } } } }
    ) {
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

export const Head = () => <SEO title="Inspiring Hope Church" page="Index" />
