// following gatsbyjs tutorial
const path = require("path");
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
    // This part here defines, that our pages will use
    // a `/pages/:slug` permalink.
    node.url = `/pages/${node.slug}`;

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
    node.url = `/blog/${node.slug}`;
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
