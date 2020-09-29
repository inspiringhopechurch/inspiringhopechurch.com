import React from "react";
import "./about.sass";
import logo from "../../assets/logo.svg";
import familyPic from "../../assets/mangrum_family.jpg";

const About = () => {
  return (
    <>
      <section className={`about-page hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container has-text-centered`}>
            <h1 className={`title is-size-1-mobile`}>About Us</h1>
          </div>
        </div>
      </section>

      <section className={`box container is-shadowless`}>
        <div className={`columns content is-medium is-centered`}>
          <div className={`column is-two-thirds`}>
            <h1 className={`title is-size-1 is-uppercase has-text-centered`}>Who We Are</h1>

            <h2 className={`is-size-4 is-uppercase`}>
              <span className={`has-text-weight-light`}>The</span> <span className={`decorated`}>Mangrums</span>
            </h2>

            <div className="columns is-vcentered">
              <div className={`column is-half`}>
                <img className="image" alt="Inspiring Hope Church logo" src={logo} />
              </div>
              <div className={`column`}>
                <p className={`content`}>
                  Ben and Brittany Mangrum moved to Hamilton, Ohio in January of 2020. They are both originally from
                  northeast Oklahoma. They met in high school and have been married 14 years. God has blessed them with
                  four children:
                </p>
                <ul className="circle">
                  <li>Peyton - 11</li>
                  <li>Channing - 9</li>
                  <li>Teagan - 6</li>
                  <li>Sterling - 2</li>
                </ul>
                <p className={`content`}>
                  Their family enjoys spending time together, playing games and having weekly movie nights.
                </p>
              </div>
            </div>

            <div className={`columns`}>
              <div className={`column is-half`}>
                <p className={`content`}>
                  Ben is currently serving on staff at Grace Point Fellowship as a church plant resident while preparing
                  to plant Inspiring Hope Church in Hamilton. Ben previously served in ministry at Crescent Valley
                  Baptist Church in Tahlequah, Oklahoma for 7 years and the last 4 of those years as Executive Pastor.
                </p>
                <p className={`content`}>
                  Brittany is a stay-at-home mother who works part time as an ESL teacher online. She homeschools the
                  kids as well as serves alongside Ben in preparing to plant Inspiring Hope Church.
                </p>
              </div>
              <div className={`column`}>
                <img className={`image`} alt="The Mangrum family" src={familyPic} />
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
