import React from "react";
import { graphql } from "gatsby";
import { cleanHtml } from "../utils";
import SEO from "../components/seo";
import "./post.sass";

// Default export is rendered when user visits page.
const Post = ({ data }) => {
  const post = data.ghostPost,
    {
      excerpt,
      html,
      primary_author: { name },
      reading_time,
      slug,
      featureImageSharp,
      meta_description,
      meta_title,
      subtitle,
      title
    } = post;

  // TODO: Fix SEO generation here
  return (
    <> {/* eslint-disable react/jsx-pascal-case */}
      <SEO
        title={meta_title || title}
        desc={meta_description || excerpt}
        banner={featureImageSharp.publicURL}
        pathname={slug}
        article
      />
      <section className={`post-page fade-in hero is-halfheight`}>
        {/* // TODO: Put Img tag here */}
        <div
          className={`hero-body`}
          style={{
            background: `url('${featureImageSharp.publicURL}') center top`,
            backgroundSize: "cover"
          }}
        >
          <div className={`post-title container`}>
            <h1 className={`title`}>{title}</h1>
            {subtitle && (
              <h2 className={`subtitle`}>{subtitle}</h2>
            )}
            <p className={`subtitle post-creation-info`}>{name} {reading_time ? `﹒ ${reading_time}` : ""} min read</p>
          </div>
        </div>
      </section>
      <section className={`section post-content`}>
        <div className={`columns is-centered`}>
          <div
            className={`column content is-two-thirds`}
            dangerouslySetInnerHTML={cleanHtml(html)}
          />
        </div>
      </section>
    </>
  );
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
