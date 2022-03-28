import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { validUrl } from "../utils";

const SEO = ({ title, desc, banner, page, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        buildTime,
        siteMetadata: {
          defaultTitle,
          titleAlt,
          shortName,
          author,
          siteLanguage,
          logo,
          url,
          pathPrefix,
          defaultDescription,
          defaultBanner,
          twitter
        }
      }
    }) => {
      const seo = {
        title: title ? `${title} | ${defaultTitle}` : defaultTitle,
        description: desc || defaultDescription,
        image: `${url}${pathPrefix}${banner || defaultBanner}`,
        url: `${url}${article ? '/blog/' : pathPrefix}${pathname || ''}`,
      };
      let schemaOrgJSONLD = [
        {
          "@context": "http://schema.org",
          "@type": "WebSite",
          "@id": url,
          url: url,
          name: defaultTitle,
          alternateName: titleAlt || ""
        }
      ];
      if (article) {
        schemaOrgJSONLD = [
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "@id": validUrl(seo.url) ? seo.url : "",
            url: validUrl(seo.url) ? seo.url : "",
            name: title,
            alternateName: titleAlt || "",
            headline: title,
            image: {
              "@type": "ImageObject",
              url: seo.image
            },
            description: seo.description,
            datePublished: buildTime,
            dateModified: buildTime,
            author: {
              "@type": "Person",
              name: author
            },
            publisher: {
              "@type": "Organization",
              name: author,
              logo: {
                "@type": "ImageObject",
                url: url + pathPrefix + logo
              }
            },
            isPartOf: url,
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": url
            }
          }
        ];
      }
      return (
        <>
          {/* Using defer={false} in the helmet to make sure title is updated
            if browser loads page in background */}
          <Helmet title={seo.title} defer={false}>
            <html lang={siteLanguage} className="has-navbar-fixed-top" />
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="apple-mobile-web-app-title" content={shortName} />
            <meta name="application-name" content={shortName} />
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph  */}
            <meta property="og:site_name" content={seo.title} />
            <meta
              property="og:url"
              content={validUrl(seo.url) ? seo.url : ""}
            />
            <meta
              property="og:type"
              content={article ? "article" : "website"}
            />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <meta
              name="twitter:url"
              content={validUrl(seo.url) ? seo.url : ""}
            />
            {twitter && <meta name="twitter:creator" content={twitter} />}
            {twitter && (
              <meta
                name="twitter:site"
                content={`https://twitter.com/${twitter.replace(/^@/, ``)}/`}
              />
            )}

            {page === "Index" && <link rel="stylesheet" href="/assets/mapbox-gl.css" />}
            <link rel="canonical" href={validUrl(seo.url) ? seo.url : ""} />
          </Helmet>
        </>
      );
    }}
  />
);

SEO.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  banner: PropTypes.string,
  page: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool
};

SEO.defaultProps = {
  title: null,
  desc: null,
  banner: null,
  pathname: null,
  article: false
};

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        siteLanguage
        logo
        url
        pathPrefix
        defaultDescription: description
        defaultBanner: banner
        twitter
      }
    }
  }
`;

export default SEO;
// componently primarily from: https://justinformentin.com/guide-to-building-a-gatsby-site#seo-adding-manifest-sitemap-offline-support
// with minor changes
