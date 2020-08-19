import React from "react";
import { mount } from "enzyme";
import SEO from "./seo";
import { StaticQuery } from "gatsby";
import data from "../fixtures/data";

describe("SEO", () => {
  beforeEach(() => {
    const buildTime_ = data.data.site.buildTime,
      siteMetaD = data.data.site.siteMetadata;
    // mock StaticQuery for tests
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        site: {
          buildTime: buildTime_,
          siteMetadata: {
            defaultTitle: siteMetaD.defaultTitle,
            titleAlt: siteMetaD.titleAlt,
            shortName: siteMetaD.shortName,
            author: siteMetaD.author,
            siteLanguage: siteMetaD.siteLanguage,
            logo: siteMetaD.logo,
            siteUrl: siteMetaD.siteUrl,
            url: siteMetaD.url,
            pathPrefix: siteMetaD.pathPrefix,
            defaultDescription: siteMetaD.defaultDescription,
            defaultBanner: siteMetaD.defaultBanner,
            twitter: siteMetaD.twitter,
          },
        },
      })
    );
  });

  it("should render without crashing", () => {
    const mySEO = mount(<SEO />);
    expect(mySEO).toMatchSnapshot();
  });
});
