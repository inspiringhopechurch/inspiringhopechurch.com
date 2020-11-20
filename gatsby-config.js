const config = require("./config");

let ghostConfig;

try {
  ghostConfig = require(`./.ghost`);
} catch (e) {
  ghostConfig = {
    production: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  };
} finally {
  const { apiUrl, contentApiKey } =
    process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production;

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`);
  }
}

if (process.env.NODE_ENV === `production` && config.siteUrl === `http://localhost:8000` && !process.env.SITEURL) {
  throw new Error(`siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`); // eslint-disable-line
}

/** Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/ */
module.exports = {
  siteMetadata: {
    ...config, // Will be used be SEO component
  },
  pathPrefix: config.pathPrefix,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-ghost`,
      options: process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.shortName,
        start_url: config.pathPrefix,
        theme_color: config.themeColor,
        background_color: config.backgroundColor,
        display: "standalone",
        icon: config.icon,
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: config.matomoSiteId,
        matomoUrl: config.matomoUrl,
        siteUrl: config.url,
      },
    },
    {
      resolve: `gatsby-plugin-remove-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    },
    `@wardpeet/gatsby-plugin-static-site`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`, // list after manifest plugin
    `gatsby-plugin-remove-serviceworker`, // properly remove offline service worker
    {
      resolve: "gatsby-plugin-feed-generator",
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
  ],
};
//    `gatsby-plugin-prettier-build`,
// `@wardpeet/gatsby-plugin-static-site`,
