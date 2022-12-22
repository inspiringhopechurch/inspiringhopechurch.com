import React from "react";
import { graphql, type PageProps } from "gatsby";
import { cleanHtml } from "../utils";
import { SEO } from "../components";
import "./post.sass";

// Default export is rendered when user visits page.
const Post = ({ data }: PageProps<Queries.TemplatePostQuery>) => {
  const post = data.ghostPost;

  if (!post) {
    throw new Error("Post data not retrieved")
  };

  const {
    featureImageSharp,
    html,
    reading_time,
    title
  } = post;
  const { name } = post.primary_author ?? { name: "Inspiring Hope Church" };

  // TODO: Fix SEO generation here
  return (
    <>
      <section className={"post-page fade-in hero is-halfheight"}>
        {/* TODO: Put Img tag here */}
        <div
          className={"hero-body"}
          style={{
            background: `url('${featureImageSharp?.publicURL}') center top`,
            backgroundSize: "cover"
          }}
        >
          <div className={"post-title container"}>
            <h1 className={"title"}>{title}</h1>
            <p className={"subtitle post-creation-info"}>{name} {reading_time ? `﹒ ${reading_time}` : ""} min read</p>
          </div>
        </div>
      </section>
      <section className={"section post-content"}>
        <div className={"columns is-centered"}>
          <div
            className={"column content is-two-thirds"}
            dangerouslySetInnerHTML={cleanHtml(html)}
          />
        </div>
      </section>
    </>
  );
};

export default Post;

export const Head = ({ data, location }: PageProps<Queries.TemplatePostQuery>) => {
  const post = data.ghostPost;

  if (!post) {
    throw new Error("Post data not retrieved")
  };

  const {
    excerpt,
    featureImageSharp,
    meta_description,
    meta_title,
    title
  } = post;

  return (
    <SEO
      title={meta_title ?? title ?? undefined}
      desc={meta_description ?? excerpt ?? undefined}
      banner={featureImageSharp?.publicURL ?? undefined}
      pathname={location.pathname}
      article
    />
  )
}

export const query = graphql`
  query TemplatePost($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`;
