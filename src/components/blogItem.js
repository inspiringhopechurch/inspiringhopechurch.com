import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import * as PropTypes from "prop-types";
import "./blogItem.sass";

const BlogItem = (props) => (
  <div
    className={`column content ${props.onBlogIndex ? "is-medium" : ""} ${
      props.blogTitle.length > 50 ? "is-full-tablet" : ""
    } ${props.onBlogIndex ? "" : "is-one-third-desktop"} ${props.onBlogIndex ? "is-6" : ""}`}
  >
    {props.onBlogIndex && (props.blogImage || props.blogImageObj) && (
      <figure className="image is-marginless">
        <Img alt="" fluid={props.blogImage || props.blogImageObj} />
      </figure>
    )}
    <h2 className={`title is-5`}>
      <Link to={props.blogLink}>{props.blogTitle}</Link>
    </h2>
    {!props.onBlogIndex && (props.blogImage || props.blogImageObj) && (
      <figure className="image is-marginless">
        <Img alt="" fluid={props.blogImage || props.blogImageObj} />
      </figure>
    )}
    <h3 className={`title is-7`}>{props.blogDate}</h3>
    <p>{props.blogExcerpt}...</p>
    <Link className={`button is-outlined is-link`} to={props.blogLink}>
      Read Post
    </Link>
  </div>
);

BlogItem.propTypes = {
  blogExcerpt: PropTypes.string.isRequired,
  blogImage: PropTypes.string,
  blogImageObj: PropTypes.shape({
      aspectRatio: PropTypes.number,
      base64: PropTypes.string,
      sizes: PropTypes.string,
      src: PropTypes.string,
      srcSet: PropTypes.string,
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
