import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { validUrl } from "../utils";

type TStaticQuery = {
  site: {
    buildTime: string,
    siteMetadata: {
      defaultTitle: string,
      titleAlt: string,
      shortName: string,
      author: string,
      siteLanguage: string,
      logo: string,
      url: string,
      pathPrefix: string,
      defaultDescription: string,
      defaultBanner: string,
      twitter: string
    }
  }
}

const SEO = ({ children, title, desc, banner, page, pathname, article = false }: SEOProps) => {
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

  const { site } = useStaticQuery<TStaticQuery>(query);

  const {
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
  } = site;

  const seo = {
    title: title ?
      title.trim() === defaultTitle.trim() ? title : `${title} | ${defaultTitle}` :
      defaultTitle,
    description: desc || defaultDescription,
    image: `${url}${banner || pathPrefix + defaultBanner}`,
    url: `${url}${pathname || ''}`,
  };

  type TSchemaOrgJSONLD = {
    "@context": string;
    "@type": string;
    "@id": string;
    url: string;
    name: string;
    alternateName: string;
    headline?: string;
    image?: {
      "@type": string;
      url: string;
    };
    description?: string;
    datePublished?: string,
    dateModified?: string,
    author?: {
      "@type": string,
      name: string
    },
    publisher?: {
      "@type": string,
      name: string,
      logo: {
        "@type": string,
        url: string
      }
    },
    isPartOf?: string,
    mainEntityOfPage?: {
      "@type": string,
      "@id": string
    }
  }

  let schemaOrgJSONLD: TSchemaOrgJSONLD[] = [
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
        name: title || defaultTitle,
        alternateName: titleAlt || "",
        headline: title || defaultTitle,
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
            url: `${url}${pathPrefix}${logo}`
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
      {/* Using defer={false} in the helmet to make sure title is updated if browser loads page in background */}
      <title>{seo.title}</title>
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
      {children}
    </>
  );
};

type SEOProps = {
  children?: React.ReactElement
  title?: string,
  desc?: string,
  banner?: string,
  page?: string,
  pathname?: string,
  article?: boolean
};

export default SEO;
// componently primarily from: https://justinformentin.com/guide-to-building-a-gatsby-site#seo-adding-manifest-sitemap-offline-support
// with minor changes
