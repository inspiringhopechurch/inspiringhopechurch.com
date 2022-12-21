import { CreatePagesArgs, CreateWebpackConfigArgs } from "gatsby";
import createSchemaCustomization from "./ghost-schema-customization";

// following GatsbyJS tutorial
const path = require("path");
import siteConfig from "./config";

// Webpack config
export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        // don't add polyfill for path for older browsers
        path: false
      },
      fallback: {
        fs: false,
      }
    }
  })
}

// Explicitly typed schema
export { createSchemaCustomization }

type TGraphNodeQuery = {
  allGhostPage: Queries.GhostPageConnection;
  allGhostPost: Queries.GhostPostConnection;
  watchPages: Queries.GhostPageConnection;
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;
  // GraphQL function call returns a promise
  const nonProdFilterString = "WIP"
  const result = await graphql<TGraphNodeQuery>(`
    query GatsbyNode {
      allGhostPost(sort: { published_at: ASC }) {
        edges {
          node {
            slug
          }
        }
      }
      allGhostTag(sort: { name: ASC }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: { name: ASC }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(
        sort: { published_at: ASC }
        filter: { primary_tag: { name: { ne: "Sunday Message" } } }
      ) {
        edges {
          node {
            slug
            url
            primary_tag {
              slug
              name
            }
          }
        }
      }
      watchPages: allGhostPage(
        sort: { published_at: DESC },
        filter: { tags: { elemMatch: { name: { eq: "Sunday Message", ne: "${nonProdFilterString}" } } } }
      ) {
        edges {
          node {
            id
            html
            title
            excerpt
            feature_image
            primary_tag {
              name
            }
            published_at
          }
        }
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  // const tags = result.data.allGhostTag.edges;
  // const authors = result.data.allGhostAuthor.edges;
  const pages = result.data?.allGhostPage.edges;
  const posts = result.data?.allGhostPost.edges;
  const watchPages = result.data?.watchPages.edges;

  if (!posts || !pages || !watchPages) {
    throw new Error("Data not found for graphql query")
  }

  const VIDEOS_PER_PAGE = 6;
  const numWatchPages = Math.ceil(watchPages.length / VIDEOS_PER_PAGE)
  // Create watch pages
  Array.from({ length: numWatchPages }).forEach((_, i) => {
    const watchPagelist = watchPages.map((item, j) => {
      if (i === 0 && j < VIDEOS_PER_PAGE) {
        return item;
      } else if (i > 0 && j >= (i * VIDEOS_PER_PAGE) && j < (i * VIDEOS_PER_PAGE) + VIDEOS_PER_PAGE) {
        return item;
      }
    }).filter(item => item !== undefined);

    createPage({
      path: i === 0 ? `/watch` : `/watch/${i + 1}`,
      component: path.resolve("./src/templates/watch.tsx"),
      context: {
        limit: VIDEOS_PER_PAGE,
        skip: i * VIDEOS_PER_PAGE,
        numPages: numWatchPages,
        currentPage: i + 1,
        watchPages: watchPagelist
      },
    })
  })

  // Create pages
  pages.forEach(({ node }) => {
    // This part here defines our pages' permalink pattern. e.g `/:category/:slug`.
    // If the 1st part of the slug before the '-' matches the tag's slug,
    // we'll set this as the url prefix. This is a way to automatically build urls
    // TESTME! This bit is testable. Prime unit test fodder.
    const pageSlug = node.primary_tag?.slug;
    if (!node.slug || !pageSlug || !node.url) {
      throw new Error('Node info not found.');
    }
    const slugUrl = node.slug.split(`${pageSlug}-`)[1];
    const slugCategory = node.slug.split(`-${slugUrl}`)[0];
    let newUrl = "";

    if (pageSlug && pageSlug === slugCategory) {
      newUrl = slugUrl ? `${slugCategory}/${slugUrl}` : slugCategory;
    } else {
      newUrl = node.slug;
    }

    if (pageSlug === "home-page" || node.slug === "authors" || node.slug === "newsletter") {
      return;
    }

    createPage({
      path: newUrl,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });
  });

  // Create post pages
  posts.forEach(({ node }, idx) => {
    // This part here defines, that our posts will use
    // a `/blog/:slug` permalink.
    const url = `${siteConfig.postPrefix}/${node.slug}`;
    // Setup for pagination
    const prev = idx === 0 ? null : posts[idx - 1].node;
    const next = idx === posts.length - 1 ? null : posts[idx + 1].node;

    createPage({
      path: url,
      component: path.resolve("./src/templates/post.tsx"),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        prev: prev,
        next: next,
      },
    });
  });
};
