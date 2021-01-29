import React from "react";
import * as PropTypes from "prop-types";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import { Link } from "gatsby";
import "./blogItem.sass";

/**
 * Takes text input and formats it for display as a blog item card
 * @param {object} props - Information that will be used to create blog card
 * @param {string} props.blogExcerpt
 * @param {string=} props.blogImage
 * @param {object} [props.blogImageObj]
 * @param {number=} props.blogImageObj.aspectRatio
 * @param {number=} props.blogImageObj.width
 * @param {number=} props.blogImageObj.height
 * @param {string=} props.blogImageObj.base64
 * @param {string=} props.blogImageObj.originalName
 * @param {string=} props.blogImageObj.sizes
 * @param {string} props.blogImageObj.src
 * @param {string} props.blogImageObj.srcSet
 * @param {string=} props.blogImageObj.srcWebp
 * @param {string=} props.blogImageObj.srcSetWebp
 * @param {string} props.blogTitle
 * @param {string} props.blogDate
 * @param {string} props.blogLink
 * @param {boolean=} props.onBlogIndex
 */
const BlogItem = (props) => (
  <div
    className={`column content ${props.onBlogIndex ? "is-medium" : ""} ${
      props.blogTitle.length > 50 ? "is-full-tablet" : ""
    } ${props.onBlogIndex ? "" : "is-one-third-desktop"} ${props.onBlogIndex ? "is-6" : ""}`}
  >
    {props.onBlogIndex && props.blogImageObj && (
      <figure className="image is-marginless">
        <Img alt="" fluid={/** @type {FluidObject} */ (props.blogImageObj)} />
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
        <Img alt="" fluid={/** @type {FluidObject} */ (props.blogImageObj)} />
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
  blogImageObj: PropTypes.oneOfType([
    PropTypes.shape({
      base64: PropTypes.string,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      originalName: PropTypes.string,
      srcSetWebp: PropTypes.string,
      srcWebp: PropTypes.string,
      media: PropTypes.string
    }),
    PropTypes.shape({
      base64: PropTypes.string,
      aspectRatio: PropTypes.number.isRequired,
      sizes: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.string.isRequired,
      originalName: PropTypes.string,
      srcSetWebp: PropTypes.string,
      srcWebp: PropTypes.string,
      media: PropTypes.string
    })
  ]),
  blogTitle: PropTypes.string.isRequired,
  blogDate: PropTypes.string.isRequired,
  blogLink: PropTypes.string.isRequired,
  onBlogIndex: PropTypes.bool
};

BlogItem.defaultProps = {
  onBlogIndex: false
};

export default BlogItem;
