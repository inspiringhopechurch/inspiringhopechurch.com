import React from "react";
import { RefTagger } from "../../components/reftagger";
import SEO from "../../components/seo";

const Mission = ({ location }) => {
  const pageName = "Our Mission";

  return (
    <>
      <SEO title={pageName} pathname={location.pathname} />
      <section className="about-page hero is-halfheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-2-mobile is-size-tablet">{pageName}</h1>
          </div>
        </div>
      </section>

      <section className="box container is-shadowless">
        <div className="columns content is-centered is-medium">
          <div className="column is-two-thirds">
            <h1 className="has-text-centered is-size-1 is-uppercase">What We're About</h1>

            <h2 className="is-size-2 is-uppercase">
              <span className="has-text-weight-light">Our</span> <span className="decorated">Mission</span>
            </h2>
            <p className="subtitle is-size-3">
              We exist to <em>inspire</em> hope by helping people discover God’s purpose for their lives through a
              relationship with Jesus!
            </p>

            <p>
              We believe that a relationship with Jesus begins when we respond to God’s call to repent, and ask
              forgiveness for our sins. By having faith in Jesus and who he is, this awakens us to God’s grace and in
              turn we want to live for Christ and follow Him.
            </p>

            <p>We believe four words define how we will inspire people to discover God’s purpose for their lives:</p>

            <dl>
              <dt>
                <h3>Follow</h3>
              </dt>
              <dd>
                We believe following Jesus through a personal daily relationship is the starting point to discovering
                God’s purpose for one’s life and encouraging others to follow Jesus as well.
              </dd>

              <dt>
                <h3>Live</h3>
              </dt>
              <dd>
                We want to encourage everyone to live in community with other people weekly in their Inspire Groups to
                encourage one another in their relationship with Jesus.
              </dd>

              <dt>
                <h3>Serve</h3>
              </dt>
              <dd>
                We believe all of us should inspire others by serving those around us in our neighborhoods, community
                and church just as Jesus served those around Him.
              </dd>

              <dt>
                <h3>Expand</h3>
              </dt>
              <dd>
                We believe Jesus has ultimately called all of us to the purpose of expanding God’s kingdom by
                multiplying disciples, inspire groups and churches around the world.
              </dd>
            </dl>

            <hr />

            <h2 className="is-size-2 is-uppercase">
              <span className="has-text-weight-light">Our</span> <span className="decorated">Values</span>
            </h2>
            <p className="subtitle is-size-3">
              Our values drive our decisions and our decisions will inspire hope in the lives of those in our church,
              community and around the world.
            </p>

            <dl>
              <dt>
                <h3>Christ-Centered Identity</h3>
              </dt>
              <dd>
                We believe all of us should inspire others by serving those around us in our neighborhoods, community
                and church just as Jesus served those around Him.
                <div className="tags">
                  <span className="tag">Galatians 2:20</span>
                  <span className="tag">Philippians 1:21</span>
                </div>
              </dd>

              <dt>
                <h3>Kingdom Focus</h3>
              </dt>
              <dd>
                We value a mindset that sees God’s local activity as a part of His global mission. We will always be
                about God’s Kingdom above ours.
                <div className="tags">
                  <span className="tag">Matthew 28:19-20</span>
                  <span className="tag">Acts 1:8</span>
                </div>
              </dd>

              <dt>
                <h3>Wise Generosity</h3>
              </dt>
              <dd>
                We value generosity as an expression of worship and seek to be wise stewards of the resources God has
                entrusted to us.
                <div className="tags">
                  <span className="tag">Matthew 25:14-30</span>
                  <span className="tag">Acts 20:35</span>
                  <span className="tag">Mark 12:41-44</span>
                </div>
              </dd>

              <dt>
                <h3>Local Life</h3>
              </dt>
              <dd>
                We believe that God has placed us where we are for a reason and value a life lived locally, inspiring
                those around us with the hope of Jesus.
                <div className="tags">
                  <span className="tag">John 4:1-42</span>
                  <span className="tag">Matthew 14:13-21</span>
                </div>
              </dd>

              <dt>
                <h3>Intentional Multiplication</h3>
              </dt>
              <dd>
                We value an intentional lifestyle of multiplication because inspiring others doesn’t happen by accident.
              </dd>
              <div className="tags">
                <span className="tag">Matthew 28:19-20</span>
                <span className="tag">Isaiah 54:2-3</span>
                <span className="tag">2 Timothy 2:2</span>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <RefTagger bibleVersion="HCSB" />
    </>
  );
};

// Default export is rendered when user visits page.
export default Mission;
