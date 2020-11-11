const config = require("./config");

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
    `gatsby-transformer-remark`,
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
