// following GatsbyJS tutorial
const path = require("path");
const config = require("./config");

// Webpack config
exports.onCreateWebpackConfig = ({ actions }) => {
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
exports.createSchemaCustomization = require(`./ghost-schema-customization`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // GraphQL function call returns a promise
  const nonProdFilterString = "WIP"
  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
          }
        }
      }
      allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(
        sort: { order: ASC, fields: published_at }
        filter: { tags: { elemMatch: { name: { ne: "Sunday Message" } } } }
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
        sort: { order: DESC, fields: [published_at] }
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
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;

  /** @type {Array<object>} watchPages - Array of graphql objects */
  const watchPages = result.data.watchPages.edges;
  const videosPerWatchPage = 6;
  const numWatchPages = Math.ceil(watchPages.length / videosPerWatchPage)
  // Create watch pages
  Array.from({ length: numWatchPages }).forEach((_, i) => {
    // Split into two variables (pages and filteredPages) for debugging purposes.
    const pages = watchPages.map((item, j) => {
      if (i === 0 && j < videosPerWatchPage) {
        return item;
      } else if (i > 0 && j >= (i * videosPerWatchPage) && j < (i * videosPerWatchPage) + videosPerWatchPage) {
        return item;
      }
    })
    const filteredPages = pages.filter(item => item !== undefined);

    createPage({
      path: i === 0 ? `/watch` : `/watch/${i + 1}`,
      component: path.resolve("./src/templates/watch.js"),
      context: {
        limit: videosPerWatchPage,
        skip: i * videosPerWatchPage,
        numPages: numWatchPages,
        currentPage: i + 1,
        watchPages: filteredPages
      },
    })
  })

  // Create pages
  pages.forEach(({ node }) => {
    // This part here defines our pages' permalink
    // pattern. e.g `/:category/:slug`. 
    // If the 1st part of the slug before the '-' matches
    // the tag's slug, we'll set this as the url prefix.
    // this is a way to automatically build urls
    // TESTME! This bit is testable. Prime unit test fodder.
    const pageSlug = node.primary_tag?.slug;
    const slugUrl = node.slug.split(`${pageSlug}-`)[1];
    const slugCategory = node.slug.split(`-${slugUrl}`)[0];

    if (pageSlug && pageSlug === slugCategory) {
      node.url = slugUrl ? `${slugCategory}/${slugUrl}` : slugCategory;
    } else {
      node.url = node.slug;
    }

    if (pageSlug === "home-page" || node.slug === "authors" || node.slug === "newsletter") {
      return;
    }

    createPage({
      path: node.url,
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
    node.url = `${config.postPrefix}/${node.slug}`;
    // Setup for pagination
    const prev = idx === 0 ? null : posts[idx - 1].node;
    const next = idx === posts.length - 1 ? null : posts[idx + 1].node;

    createPage({
      path: node.url,
      component: path.resolve("./src/templates/post.js"),
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
