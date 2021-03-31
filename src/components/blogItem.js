import React from "react";
import * as PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby";
import "./blogItem.sass";

/**
 * Takes text input and formats it for display as a blog item card
 * @param {object} props - Information that will be used to create blog card
 * @param {string} props.blogExcerpt
 * @param {string=} props.blogImage
 * @param {object} props.blogImageObj
 * @param {string=} props.blogAuthor
 * @param {number=} props.blogReadingTime
 * @param {string} props.blogTitle
 * @param {string} props.blogDate
 * @param {string} props.blogLink
 * @param {boolean=} props.onBlogIndex
 * @param {boolean=} props.isFirstItem
 */
const BlogItem = (props) => (
  <div
    className={`blog-info-container column content ${props.onBlogIndex ? "is-medium" : ""} ${
      props.blogTitle.length > 50 ? "is-full-tablet" : ""
    } ${props.onBlogIndex ? "" : "is-one-third-desktop"} ${props.onBlogIndex ? props.isFirstItem ? "is-full" : "is-6" : ""}`}
  >
    {props.onBlogIndex && props.blogImageObj && (
      <figure className="image blog-image">
        <GatsbyImage alt="" image={(props.blogImageObj)} />
      </figure>
    )}
    {props.onBlogIndex && props.blogImage && (
      <figure className="image blog-image">
        <img alt="" src={props.blogImage} />
      </figure>
    )}
    
    {!props.onBlogIndex && props.blogImageObj && (
      <figure className="image blog-image">
        <GatsbyImage alt="" image={(props.blogImageObj)} />
      </figure>
    )}
    {!props.onBlogIndex && props.blogImage && (
      <figure className="image blog-image">
        <img alt="" src={props.blogImage} />
      </figure>
    )}
    
    <div className="blog-info">
      <h2 className={`title is-5`}>
        <Link to={props.blogLink}>{props.blogTitle}</Link>
      </h2>
      <h3 className={`subtitle is-7`}>{props.blogAuthor && props.blogAuthor} { props.blogReadingTime ? `﹒ ${props.blogReadingTime} min read` : ""}</h3>
    </div>
    <p className="blog-excerpt">{props.blogExcerpt}...</p>
    <Link className={`button is-link`} to={props.blogLink}>
      Read Post
    </Link>
  </div>
);

BlogItem.propTypes = {
  blogExcerpt: PropTypes.string.isRequired,
  blogImage: PropTypes.string,
  blogImageObj: PropTypes.object,
  blogAuthor: PropTypes.string,
  blogReadingTime: PropTypes.number,
  blogTitle: PropTypes.string.isRequired,
  blogDate: PropTypes.string.isRequired,
  blogLink: PropTypes.string.isRequired,
  isFirstItem: PropTypes.bool,
  onBlogIndex: PropTypes.bool
};

BlogItem.defaultProps = {
  onBlogIndex: false
};

export default BlogItem;
