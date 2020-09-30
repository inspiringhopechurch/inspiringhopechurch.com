import React from "react";
import Accordion from "../../components/accordion";
import { RefTagger } from "../../components/reftagger";

const Beliefs = () => {
  return (
    <>
      <section className={`about-page hero is-halfheight`}>
        <div className={`hero-body`}>
          <div className={`container`}>
            <h1 className={`title is-size-2-mobile is-size-tablet`}>Our Beliefs</h1>
          </div>
        </div>
      </section>

      <section className={`box container is-shadowless`}>
        <div className={`columns content is-centered is-medium`}>
          <div className={`column is-two-thirds`}>
            <h1 className={`title is-size-1 is-uppercase has-text-centered`}>What We Believe</h1>

            <Accordion title="The Bible" isExpanded={true}>
              <div>
                <p className={`content`}>
                  The Bible was written by men divinely inspired and is the record of God’s revelation of Himself to
                  man. It is a perfect treasure of divine instruction. It has God for its author, and therefore it is
                  wholly without error. It reveals the depths of God’s love and the principles by which God judges us;
                  and therefore is, and will remain to the end of the world, the true center of Christian union, and the
                  supreme standard by which all human conduct, creeds, and religious opinions should be tried. It is
                  sufficient as our only infallible rule of faith and practice.
                </p>
                <div className="tags">
                  <span className="tag">1 Corinthians 2:7-14</span>
                  <span className="tag">2 Peter 1:20-21</span>
                  <span className="tag">1 Corinthians 2:13</span>
                  <span className="tag">1 Thessalonians 2:13</span>
                  <span className="tag">2 Timothy 3:16-17</span>
                  <span className="tag">Matthew 5:18, 24:35</span>
                  <span className="tag">John 10:35</span>
                  <span className="tag">Hebrews 4:12</span>
                  <span className="tag">Psalm 119:89</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="God">
              <div>
                <p className={`content`}>
                  There is one and only one living and true God. He is an intelligent, spiritual, and personal Being,
                  the Creator, Redeemer, Preserver, and Ruler of the universe. God is infinite in holiness and all other
                  perfections. To Him we owe the highest love, reverence, and obedience. The eternal God reveals Himself
                  to us as Father, Son, and Holy Spirit, with distinct personal attributes, but without division of
                  nature, essence, or being.
                </p>
                <div className="tags">
                  <span className="tag">Deuteronomy 6:4</span>
                  <span className="tag">Isaiah 45:5-7</span>
                  <span className="tag">1 Corinthians 8:4</span>
                  <span className="tag">Matthew 28:19</span>
                  <span className="tag">2 Corinthians 13:14</span>
                  <span className="tag">1 Timothy 2:4</span>
                </div>

                <div className="pl-5">
                  <h3 className={`subtitle is-size-5`}>
                    A. <span className={`has-text-weight-light`}>The</span> <span className={`decorated`}>Father</span>
                  </h3>
                  <p className={`content`}>
                    God as Father reigns with providential care over His universe, His creatures, and the flow of the
                    stream of human history according to the purposes of His grace. He is all-powerful, all loving, and
                    all wise. God is Father in truth to those who become His children through faith in Jesus Christ. He
                    is fatherly in His attitude toward all men.
                  </p>
                  <div className="tags">
                    <span className="tag">Psalm 145:8-9</span>
                    <span className="tag">1 Corinthians 8:6</span>
                    <span className="tag">Genesis 1:1-31</span>
                    <span className="tag">Ephesians 4:6</span>
                    <span className="tag">John 1:12</span>
                    <span className="tag">Romans 8:15</span>
                    <span className="tag">Galatians 4:5</span>
                    <span className="tag">Hebrews 12:5-9</span>
                  </div>

                  <h3 className={`subtitle is-size-5`}>
                    B. <span className={`has-text-weight-light`}>The</span> <span className={`decorated`}>Son</span>
                  </h3>
                  <p className={`content`}>
                    God is the eternal Son of God. In His incarnation as Jesus Christ, He was conceived of the Holy
                    Spirit and born of the Virgin Mary, hence the God-Man. Jesus perfectly revealed and did the will of
                    God, taking upon Himself the demands and necessities of human nature and identifying Himself
                    completely with mankind, yet without sin. He honored the divine law by His personal obedience, and
                    in His death on the cross He made provision for the redemption of men from sin. He was raised from
                    the dead with a glorified body and appeared to His disciples as the person who was with them before
                    His crucifixion. He ascended into heaven and is now exalted at the right hand of God where He is the
                    One Mediator, partaking of the nature of God and of man, and in whose person is effected the
                    reconciliation between God and man. He will return in power and glory to judge the world and to
                    consummate His redemptive mission. He now dwells in all believers as the living and ever present
                    Lord.
                  </p>
                  <div className="tags">
                    <span className="tag">John 10:30, 14:9</span>
                    <span className="tag">1 John 1:3</span>
                    <span className="tag">Colossians 1:15-17</span>
                    <span className="tag">Hebrews 1:2</span>
                    <span className="tag">Philippians 2:5-8</span>
                    <span className="tag">1 Timothy 2:5</span>
                  </div>

                  <h3 className={`subtitle is-size-5`}>
                    C. <span className={`has-text-weight-light`}>The</span>{" "}
                    <span className={`decorated`}>Holy Spirit</span>
                  </h3>
                  <p className={`content`}>
                    The Holy Spirit is the Spirit of God. He inspired holy men of old to write the Scriptures. Through
                    illumination He enables men to understand truth. He exalts Christ. He convicts of sin, of
                    righteousness, and of judgment. He calls men to the Savior and effects regeneration. He cultivates
                    Christian character, comforts believers, and bestows spiritual gifts by which they serve God through
                    His church. He seals the believer unto the day of final redemption. His presence in the Christian is
                    the assurance of God to bring the believer into the fullness of the stature of Christ. He enlightens
                    and empowers the believer and the church in worship, evangelism, and service.
                  </p>
                  <div className="tags">
                    <span className="tag">1 Corinthians 2:10-13</span>
                    <span className="tag">Ephesians 4:30</span>
                    <span className="tag">Matthew 28:19</span>
                    <span className="tag">Acts 5:3-4, 28:25-26</span>
                    <span className="tag">1 Corinthians 12:1-6</span>
                    <span className="tag">Hebrews 10:14-15</span>
                    <span className="tag">John 16:7-14</span>
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="Man">
              <div>
                <p className={`content`}>
                  Man was created by the special act of God, in His own image, and is the crowning work of His creation.
                  In the beginning, man was innocent of sin and was endowed by his Creator with freedom of choice. By
                  his free choice, man sinned against God and brought sin into the human race. Through the temptation of
                  Satan, man transgressed the command of God, and fell from his original innocence; whereby all men
                  inherited a sin nature and an environment inclined toward sin, and as soon as they are capable of
                  moral action become transgressors and are under condemnation. Only the grace of God can bring a man
                  into His holy fellowship and enable man to fulfill the creative purpose of God. The sacredness of
                  human personality is evident in that God created man in His own image, and in that Christ died for
                  man; therefore every man possesses dignity and is worthy of respect and Christian love.
                </p>
                <div className="tags">
                  <span className="tag">Genesis 2:7,15-25</span>
                  <span className="tag">James 3:9</span>
                  <span className="tag">John 3:36</span>
                  <span className="tag">Romans 3:23, 6:23</span>
                  <span className="tag">1 Corinthians 2:14</span>
                  <span className="tag">Ephesians 2:1-3</span>
                  <span className="tag">1 John 1:8</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="Salvation">
              <div>
                <p className={`content`}>
                  Salvation involves the redemption of the whole man, and is offered freely to all who accept Jesus
                  Christ as Lord and Savior, who by His own blood obtained eternal redemption for the believer. In its
                  broadest sense, salvation includes regeneration, repentance and faith, sanctification, and
                  glorification.
                </p>
                <p className={`content`}>
                  Regeneration, or the new birth, is a work of God’s grace whereby believers become new creatures in
                  Christ Jesus. It is a change of heart wrought by the Holy Spirit through conviction of sin, to which
                  the sinner responds in repentance toward God and faith in the Lord Jesus Christ.
                </p>
                <div className="tags">
                  <span className="tag">John 3:3-8</span>
                  <span className="tag">Titus 3:5</span>
                </div>
                <p className={`content`}>
                  Repentance and faith are inseparable experiences of grace. Repentance is a genuine turning from sin
                  toward God. Faith is the acceptance of Jesus Christ and surrender of one’s entire person to Him as
                  Lord and Savior. Justification is the declarative act of God by which, on the basis of the sufficiency
                  of Christ’s atoning death, He pronounces every believer to be righteous, that is, to have fulfilled
                  all of the requirements of the law. Justification brings the believer into a personal relationship of
                  peace and favor with God.
                </p>
                <div className="tags">
                  <span className="tag">Acts 20:20-21</span>
                  <span className="tag">Romans 5:1</span>
                </div>
                <p className={`content`}>
                  Sanctification is the experience, beginning at the new birth, by which the believer is set apart to
                  God’s purposes, and is enabled to progress toward Christ-likeness through the presence and power of
                  the Holy Spirit indwelling in him. Growth in grace should continue throughout the believer’s life.
                </p>
                <div className="tags">
                  <span className="tag">Acts 20:32</span>
                  <span className="tag">1 Corinthians 1:2,30, 6:11</span>
                  <span className="tag">2 Thessalonians 2:13</span>
                  <span className="tag">Hebrews 2:11</span>
                  <span className="tag">1 Peter 1:2</span>
                </div>
                <p className={`content`}>
                  Glorification is the culmination of salvation and is the final blessed and abiding state of the
                  redeemed.
                </p>
                <div className="tags">
                  <span className="tag">Romans 8:16-17</span>
                  <span className="tag">2 Peter 1:4</span>
                  <span className="tag">1 John 3:2-3</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="Resurrection">
              <div>
                <p className={`content`}>
                  There will be a final resurrection for all men, the just and unjust. Those who surrendered their lives
                  to Jesus Christ during this life will be raised to everlasting life in Heaven, but those who did not
                  surrender their lives to Jesus Christ in this life will be raised to everlasting condemnation in Hell.
                </p>
                <div className="tags">
                  <span className="tag">Acts 24:15</span>
                  <span className="tag">Hebrews 9:27</span>
                  <span className="tag">1 Thessalonians 4:13-17</span>
                  <span className="tag">Revelation 20:15, 21:8</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="The Church">
              <div>
                <p className={`content`}>
                  A New Testament church of the Lord Jesus Christ is a local body of baptized believers who are
                  associated by covenant in the faith and fellowship of the gospel, observing the two ordinances of
                  Christ, committed to His teachings, exercising gifts, rights, and privileges invested in them by His
                  Word, and seeking to extend this message of the gospel to the ends of the earth.
                </p>
                <p className={`content`}>
                  The church is an autonomous body with each member equally responsible. It operates under the Lordship
                  of Christ following Scriptural teachings. Two offices serve the church. It is led and overseen by men
                  in the office of pastor/elder and served by men and women in the office of deacon.
                </p>
                <p className={`content`}>
                  The New Testament speaks also of the church body as the body of Christ, which includes all of the
                  redeemed of all the ages.
                </p>
                <div className="tags">
                  <span className="tag">1 Corinthians 12:12-13</span>
                  <span className="tag">2 Corinthians 11:2</span>
                  <span className="tag">Ephesians 5:23-32</span>
                  <span className="tag">Revelation 19:7-8</span>
                  <span className="tag">Ephesians 1:22, 4:15</span>
                  <span className="tag">Colossians 1:18</span>
                  <span className="tag">1 Timothy 3:1-15</span>
                </div>
              </div>
            </Accordion>

            <Accordion title="Baptism and the Lord’s Supper">
              <div>
                <p className={`content`}>
                  Christian baptism is the immersion of a believer in water in the name of the Father, the Son, and the
                  Holy Spirit. It is an act of obedience symbolizing the believer’s faith in a crucified, buried, and
                  risen Savior; the believer’s death to sin, the burial of the old life, and the resurrection to walk in
                  newness of life in Christ Jesus. It is a public testimony to his faith in the final resurrection of
                  the dead. Being a church ordinance, it is a prerequisite to the privileges of church membership and to
                  the Lord’s Supper. The Lord’s Supper is a symbolic act of obedience whereby followers of Christ,
                  through partaking of the bread and the fruit of the vine, remember the death of the Redeemer and
                  anticipate His second coming.
                </p>
                <div className="tags">
                  <span className="tag">Acts 2:38-42, 8:36-39</span>
                  <span className="tag">Romans 6:1-11</span>
                  <span className="tag">Acts 2:41-42</span>
                  <span className="tag">1 Corinthians 10:16, 11:23</span>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </section>
      <RefTagger bibleVersion="HCSB" />
    </>
  );
};

// Default export is rendered when user visits page.
export default Beliefs;
