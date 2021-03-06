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
    development: {
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
  flags: {
      FAST_REFRESH: true,
      PARALLEL_SOURCING: true,
  },
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
      resolve: `gatsby-plugin-ghost-images`,
      options: {
        // An array of node types and image fields per node
        // Image fields must contain a valid absolute path to the image to be downloaded
        lookup: [
          {
            type: `GhostPost`,
            imgTags: [`feature_image`],
          },
          {
            type: `GhostPage`,
            imgTags: [`feature_image`],
          },
          {
            type: `GhostSettings`,
            imgTags: [`cover_image`],
          },
        ],
        // Additional condition to exclude nodes
        // Takes precedence over lookup
        exclude: (node) => node.ghostId === undefined,
        // Additional information messages useful for debugging
        verbose: false,
        // Option to disable the module
        disable: false,
      },
    },
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`, // list after manifest plugin
    `gatsby-plugin-remove-serviceworker`, // properly remove offline service worker
    {
      resolve: "gatsby-plugin-feed-generator",
      options: {
        generator: `GatsbyJS`,
        rss: true,
        json: true,
        siteQuery: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              author
              postPrefix
            }
          }
        }
      `,
        feeds: [
        {
          name: `feed`, // name of feed file. e.g. feed.json or feed.xml
          query: `
          {
            allGhostPost(sort: { order: DESC, fields: published_at }, limit: 100) {
              edges {
                node {
                  title
                  published_at
                  slug
                  tags {
                    name
                  }
                  html
                }
              }
            }
          }
          `,
          normalize: ({ query: { site, allGhostPost } }) => {
              return allGhostPost.edges.map(edge => {
                return {
                    title: edge.node.title,
                    date: edge.node.published_at,
                    html: edge.node.html,
                    url: `${site.siteMetadata.siteUrl}${site.siteMetadata.postPrefix}/${edge.node.slug}`
                }
              })
          },
        }
        ]
      }
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
  ],
};
//    `gatsby-plugin-prettier-build`,
// `@wardpeet/gatsby-plugin-static-site`,
