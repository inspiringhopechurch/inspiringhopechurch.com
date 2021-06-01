import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

/**
 * Component that shows a block of media, such as audio or video, that can be played by the user.
 * @param {object} props
 * @param {string} props.title
 * @param {string=} props.category
 * @param {string} props.description
 * @param {string} props.link
 * @param {string=} props.imgSrc
 */
const MediaItem = ({
  title,
  category = "Sunday Message",
  description,
  link,
  imgSrc = "https://cdn.emk.dev/templates/featured-image.png",
}) => {
  return (
    <div className="column is-12 post">
      <article className="columns featured">
        <div className="column is-7 post-img ">
          <img src={imgSrc} alt="" />
        </div>
        <div className="column is-5 featured-content is-vcentered">
          <div>
            <h3 className="heading post-category">{category}</h3>
            <h1 className="title post-title">{title}</h1>
            <p className="post-excerpt">{description}</p>
            <br />
            <Link to={link} className="button is-primary">
              Watch
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

MediaItem.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  description: PropTypes.string.isRequired,
  link: PropTypes.string,
  imgSrc: PropTypes.string,
};

export default MediaItem;
