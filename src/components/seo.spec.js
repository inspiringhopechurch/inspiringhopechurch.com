import React from "react";
import { mount } from "enzyme";
import { SEO } from "../components";
import { useStaticQuery } from "gatsby";
import data from "../fixtures/data";

describe("SEO", () => {
  beforeEach(() => {
    const buildTime_ = data.data.site.buildTime,
      siteMetaD = data.data.site.siteMetadata;
    // mock StaticQuery for tests
    useStaticQuery.mockImplementationOnce(({ render }) =>
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
            twitter: siteMetaD.twitter
          }
        }
      })
    );
  });

  it("should render without crashing", () => {
    const mySEO = mount(<SEO />);
    expect(mySEO).toMatchSnapshot();
  });

  it("should render without crashing as an article", () => {
    const mySEO = mount(<SEO article />);
    expect(mySEO).toMatchSnapshot();
  });

  it("should render without crashing with custom props", () => {
    const mySEO = mount(
      <SEO
        title="Test Page"
        desc={"This website is an awesome website and you should visit it."}
        pathname={"/path/to/page"}
        banner={"/path/to/image.jpg"}
      />
    );
    expect(mySEO).toMatchSnapshot();
  });

  it("should render without crashing as an article with custom props", () => {
    const mySEO = mount(
      <SEO
        article
        title="Test Page"
        desc={"This website is an awesome website and you should visit it."}
        pathname={"/path/to/page"}
        banner={"/path/to/image.jpg"}
      />
    );
    expect(mySEO).toMatchSnapshot();
  });
});
