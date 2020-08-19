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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // graphql function call returns a promise
  return graphql(`
    {
      allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    // if there are errors, reject promise and give error
    // msg as reason for rejection
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    // create post pages
    posts.forEach(({ node }, idx) => {
      // Setup for pagination
      const prev = idx === 0 ? null : posts[idx - 1].node;
      const next = idx === posts.length - 1 ? null : posts[idx + 1].node;

      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/post.js"),
        context: {
          // Data passed to context is available in page
          // queries in GraphQL variables
          slug: node.fields.slug,
          prev: prev,
          next: next,
        },
      });
    });
  });
};
