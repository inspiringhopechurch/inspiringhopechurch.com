// following gatsbyjs tutorial
const path = require("path");
const config = require("./config");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `posts` });
    // get date and title from filename if present
    // https://www.gatsbyjs.org/blog/2017-11-08-migrate-from-jekyll-to-gatsby/
    const [, date, title] = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/);

    createNodeField({
      node,
      name: `slug`,
      value: "/blog/" + title,
    });
  }
};

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // graphql function call returns a promise
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
      allGhostPage(sort: { order: ASC, fields: published_at }) {
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
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  const tags = result.data.allGhostTag.edges;
  const authors = result.data.allGhostAuthor.edges;
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;

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
