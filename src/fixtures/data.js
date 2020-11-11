export default {
  data: {
    file: {
      childImageSharp: {
        fixed: {
          // The shape of this is very specific. Prop will not be valid otherwise
          src: "/static/2d816ba796e3a2f678b37125218f0b03/f9913/mangrum_family.jpg",
          aspectRatio: 1.3321492007104796,
          originalName: "mangrum_family.jpg",
          width: 750,
          height: 563,
          srcSet:
            "/static/2d816ba796e3a2f678b37125218f0b03/f9913/mangrum_family.jpg 1x,\n/static/2d816ba796e3a2f678b37125218f0b03/7811e/mangrum_family.jpg 1.5x,\n/static/2d816ba796e3a2f678b37125218f0b03/37d86/mangrum_family.jpg 2x",
        },
        fluid: {
          // The shape of this is very specific. Prop will not be valid otherwise
          aspectRatio: 1.3345195729537367,
          sizes: "(max-width: 1500px) 100vw, 1500px",
          src: "/static/2d816ba796e3a2f678b37125218f0b03/37d86/mangrum_family.jpg",
          srcSet:
            "/static/2d816ba796e3a2f678b37125218f0b03/01f8d/mangrum_family.jpg 375w,\n/static/2d816ba796e3a2f678b37125218f0b03/f9913/mangrum_family.jpg 750w,\n/static/2d816ba796e3a2f678b37125218f0b03/37d86/mangrum_family.jpg 1500w,\n/static/2d816ba796e3a2f678b37125218f0b03/c2bdc/mangrum_family.jpg 1506w",
        },
      },
    },
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
        twitter: "@inspiringhope",
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
