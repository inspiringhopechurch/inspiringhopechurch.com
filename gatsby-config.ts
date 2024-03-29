import type { GatsbyConfig } from "gatsby";
import config from "./config";

type TGhostConfig = {
  [x in "production" | "development"]: {
    apiUrl?: string;
    contentApiKey?: string;
  }
}

type TFeedQuery = {
  query: {
    site: Queries.Site,
    allGhostPost: Queries.GhostPostConnection
  }
}

let ghostConfig: TGhostConfig;

try {
  ghostConfig = require(`./.ghost.secret.json`);
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
  const { apiUrl, contentApiKey } = // @ts-expect-error - Variable is assigned before use
    process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production;

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`);
  }
}

if (process.env.NODE_ENV === `production` && config.siteUrl === `http://localhost:8000` && !process.env.SITEURL) {
  throw new Error(`siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`);
}

/** Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/ */
const gatsbyConfig: GatsbyConfig = {
  trailingSlash: "never",
  siteMetadata: {
    ...config,
  },
  graphqlTypegen: false,
  pathPrefix: config.pathPrefix,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `src/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
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
        // Additional condition to exclude nodes, takes precedence over lookup
        exclude: (node: { ghostId?: string }) => node.ghostId === undefined,
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
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-offline`, // list after manifest plugin
    // `gatsby-plugin-remove-serviceworker`, properly remove offline service worker
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
                allGhostPost(sort: { published_at: DESC }, limit: 100) {
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
            normalize: ({ query: { site, allGhostPost } }: TFeedQuery) => {
              return allGhostPost.edges.map((edge) => (
                {
                  title: edge.node.title,
                  date: edge.node.published_at,
                  html: edge.node.html,
                  url: `${site.siteMetadata?.siteUrl}${site.siteMetadata?.postPrefix}/${edge.node.slug}`
                }
              ))
            },
          }
        ]
      }
    },
    `gatsby-plugin-robots-txt`,
  ],
  //    `gatsby-plugin-prettier-build`,
};

module.exports = gatsbyConfig
