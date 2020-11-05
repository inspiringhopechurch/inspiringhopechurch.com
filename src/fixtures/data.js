export default {
  data: {
    site: {
      buildTime: "2019-05-09",
      siteMetadata: {
        defaultTitle: "Test Company Site",
        titleAlt: "Test Company Site",
        shortName: "TestCompany",
        author: "Test User",
        siteLanguage: "en",
        logo: "src/assets/logo.svg",
        url: "https://inspiringhopechurch.com",
        pathPrefix: "/",
        defaultDescription:
          "We exist to inspire hope by helping people discover God’s purpose for their lives through a relationship with Jesus.",
        defaultBanner: "src/assets/logo.svg",
      },
    },
    allMarkdownRemark: {
      totalCount: 2,
      edges: [
        {
          node: {
            frontmatter: {
              title: "Getting ansible working with doas on FreeBSD 11",
              date: "23 January, 2019",
              path: "getting-ansible-working-with-doas-on-freebsd-11",
            },
            excerpt:
              "Getting ansible working with doas on FreeBSD 11 Problem: I was unable to get ansible working with my privelege escalation tool of choice…",
            id: "7b63ce9c-cced-5ba0-a373-67bb9b2cd53f",
            fields: {
              slug: "getting-ansible-working-with-doas-on-freebsd-11",
            },
          },
        },
        {
          node: {
            frontmatter: {
              title: "Solution to ansible can't find inventory defined in ansible.cfg",
              date: "04 April, 2019",
              path: "ansible-ignores-inventory-defined-in-config-file",
            },
            excerpt:
              "When you run ansible you may get this : Though the docs mention hostfile and host_file is mentioned in old online tutorials, they are…",
            id: "787b4534-0bdc-59fd-b448-dd9cd6912e96",
            fields: {
              slug: "ansible-ignores-inventory-defined-in-config-file",
            },
          },
        },
      ],
    },
  },
};
