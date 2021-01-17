import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import * as PropTypes from "prop-types";
import "./blogItem.sass";

/**
 * Takes text input and formats it for display as a blog item card
 * @param {{
 *   blogExcerpt: string,
 *   blogImage: string,
 *   blogImageObj: {
 *     aspectRatio: number,
 *     width: number,
 *     height: number,
 *     base64: string,
 *     sizes: string,
 *     src: string,
 *     srcSet: string,
 *     originalName: string,
 *     srcWebp: string,
 *     srcSetWebp: string,
 *   },
 *   blogTitle: string,
 *   blogDate: string,
 *   blogLink: string,
 *   onBlogIndex: boolean
 * }} props -  information that will be used to create blog card
 */
const BlogItem = (props) => (
  <div
    className={`column content ${props.onBlogIndex ? "is-medium" : ""} ${
      props.blogTitle.length > 50 ? "is-full-tablet" : ""
    } ${props.onBlogIndex ? "" : "is-one-third-desktop"} ${props.onBlogIndex ? "is-6" : ""}`}
  >
    {props.onBlogIndex && props.blogImageObj && (
      <figure className="image is-marginless">
        <Img alt="" fluid={props.blogImageObj} />
      </figure>
    )}
    {props.onBlogIndex && props.blogImage && (
      <figure className="image is-marginless">
        <img alt="" src={props.blogImage} />
      </figure>
    )}
    <h2 className={`title is-5`}>
      <Link to={props.blogLink}>{props.blogTitle}</Link>
    </h2>
    {!props.onBlogIndex && props.blogImageObj && (
      <figure className="image is-marginless">
        <Img alt="" fluid={props.blogImageObj} />
      </figure>
    )}
    {!props.onBlogIndex && props.blogImage && (
      <figure className="image is-marginless">
        <img alt="" src={props.blogImage} />
      </figure>
    )}
    <h3 className={`title is-7`}>{props.blogDate}</h3>
    <p>{props.blogExcerpt}...</p>
    <Link className={`button is-link`} to={props.blogLink}>
      Read Post
    </Link>
  </div>
);

BlogItem.propTypes = {
  blogExcerpt: PropTypes.string.isRequired,
  blogImage: PropTypes.string,
  blogImageObj: PropTypes.shape({
      aspectRatio: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
      base64: PropTypes.string,
      sizes: PropTypes.string,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      originalName: PropTypes.string,
      srcSetWebp: PropTypes.string,
      srcWebp: PropTypes.string,
  }),
  blogTitle: PropTypes.string.isRequired,
  blogDate: PropTypes.string.isRequired,
  blogLink: PropTypes.string.isRequired,
  onBlogIndex: PropTypes.bool,
};

BlogItem.defaultProps = {
  onBlogIndex: false,
};

export default BlogItem;
