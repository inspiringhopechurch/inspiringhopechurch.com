import React from "react";
import { GatsbyImage, type IGatsbyImageData } from "gatsby-plugin-image"
import { Link } from "gatsby";
import "./blogItem.sass";

/**
 * Takes text input and formats it for display as a blog item card
 * @param {object} props - Information that will be used to create blog card
 */
const BlogItem = ({ onBlogIndex = false, ...props }: BlogItemProps) => (
  <div
    className={`blog-info-container column content ${onBlogIndex ? "is-medium" : ""} ${props.blogTitle.length > 50 ? "is-full-tablet" : ""
      } ${onBlogIndex ? "" : "is-one-third-desktop"} ${onBlogIndex ? props.isFirstItem ? "is-full" : "is-6" : ""}`}
  >
    {onBlogIndex && props.blogImageObj && (
      <figure className="image blog-image">
        <GatsbyImage alt="" image={(props.blogImageObj)} />
      </figure>
    )}
    {onBlogIndex && props.blogImage && (
      <figure className="image blog-image">
        <img alt="" src={props.blogImage} />
      </figure>
    )}

    {!onBlogIndex && props.blogImageObj && (
      <figure className="image blog-image">
        <GatsbyImage alt="" image={(props.blogImageObj)} />
      </figure>
    )}
    {!onBlogIndex && props.blogImage && (
      <figure className="image blog-image">
        <img alt="" src={props.blogImage} />
      </figure>
    )}

    <div className="blog-info">
      <h2 className={`title is-5`}>
        <Link to={props.blogLink}>{props.blogTitle}</Link>
      </h2>
      <h3 className={`subtitle is-7`}>{props.blogAuthor && props.blogAuthor} {props.blogReadingTime ? `﹒ ${props.blogReadingTime} min read` : ""}</h3>
    </div>
    <p className="blog-excerpt">{props.blogExcerpt}...</p>
    <Link className={`button is-link`} to={props.blogLink}>
      Read Post
    </Link>
  </div>
);

type BlogItemProps = {
  blogExcerpt: string,
  blogTitle: string,
  blogDate: string,
  blogLink: string,
  blogImage?: string,
  blogImageObj?: IGatsbyImageData,
  blogAuthor?: string,
  blogReadingTime?: number,
  isFirstItem?: boolean,
  onBlogIndex?: boolean,
};

export default BlogItem;
