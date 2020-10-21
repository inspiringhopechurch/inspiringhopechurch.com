import React from "react";
import { Link } from "gatsby";
import * as PropTypes from "prop-types";
import "./blogItem.sass";

const BlogItem = (props) => (
  <div
    className={`column content ${props.blogTitle.length > 50 ? "is-full-tablet" : ""} ${
      props.onBlogIndex ? "" : "is-one-third-desktop"
    } ${props.onBlogIndex ? "is-three-fifths" : ""}`}
  >
    <h2 className={`title is-5`}>
      <Link to={props.blogSlug}>{props.blogTitle}</Link>
    </h2>
    <h3 className={`title is-7`}>{props.blogDate}</h3>
    <p>{props.blogExcerpt}</p>
    <Link className={`button is-outlined is-link`} to={props.blogSlug}>
      Read Post
    </Link>
  </div>
);

BlogItem.propTypes = {
  blogExcerpt: PropTypes.string.isRequired,
  blogTitle: PropTypes.string.isRequired,
  blogDate: PropTypes.string.isRequired,
  blogSlug: PropTypes.string.isRequired,
  onBlogIndex: PropTypes.bool,
};

BlogItem.defaultProps = {
  onBlogIndex: false,
};

export default BlogItem;
