# Gatsby inspiringhopechurch.com website

This repository contains the source code for the inspiringhopechurch.com website. It is a gatsby site based on the hello-world starter.

## 🚀 Quick start

1.  **Start developing.**

Navigate into your new site’s directory and start it up.

```sh
cd inspiringhope.gatsby
npm install
gatsby develop
```

2.  **Open the source code and start editing!**

The site should now be running at `http://localhost:8000`!

> _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

Open the `inspiringhope.gatsby` directory in your code editor of choice and edit or add components. When you save your changes the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── __mocks__
    ├── cypress
    ├── node_modules
    ├── src
    ├── static
    ├── .gitignore
    ├── .gitattributes
    ├── config.js
    ├── cypress.json
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── jest-preprocess.js
    ├── jest.config.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── setupTests.js

1. **`__mocks__`**: This directory contains mocks that are necessary to get the jest unit tests functioning for gatsby specific modules. e.g. `graphql`, `Link`, `StaticQuery` and `useStaticQuery`.

2. **`cypress`**: This directory contains integration tests for critical site functionality.

3. **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

4. **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

5. **`static`**: This directory contains all static image assets used in the site.

6. **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

7. **`.gitattributes`**: This file tells git which files it should track and store in git-lfs (large file storage). Large (or likely to become large) binary files are defined here.

8. **`config.js`**: This is a configuration file for containing information specific to the site.

9. **`cypress.json`**: This is a configuration file for [Cypress](https://www.cypress.io). Cypress is the tool used to run integration tests on the codebase.

10. **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

11. **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

12. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

13. **`jest-preprocess.js`**: This file defines a babel transformer that will process the `js` and `jsx` files just as gatsby does.

14. **`jest.config.js`**: This file defines a default configuration for jest.

15. **`LICENSE`**: Gatsby is licensed under the MIT license.

16. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

17. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm or yarn knows which packages to install for your project.

18. **`README.md`**: A text file containing useful reference information about your project.

19. **`setupTests.js`**: This file contains global setup code that will be used throughout all unit tests.

20. **`yarn.lock`**: (See `package.json` below, first). This is an automatically generated file based on the exact versions of your yarn dependencies that were installed for your project. **(You won’t change this file directly).**.

> The font awesome pro package `@fortawesome/pro-solid-svg-icons` will need to be removed, or set up separately before this project will install properly.
