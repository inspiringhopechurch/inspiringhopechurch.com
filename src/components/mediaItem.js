import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { cleanHtml } from "../utils";

/**
 * Component that shows a block of media, such as audio or video, that can be played by the user.
 * @param {object} props
 * @param {string} props.title
 * @param {string=} props.category
 * @param {string} props.description
 * @param {string} props.link
 * @param {string=} props.imgSrc
 * @param {string=} props.vidSrc
 */
const MediaItem = ({
  title,
  category = "Sunday Message",
  description,
  link,
  imgSrc = "https://cdn.emk.dev/templates/featured-image.png",
  vidSrc
}) => {
  const ifIsVideo = !!vidSrc; // should check if file ext is mp4, webm or av1 (or heic?)
  const ifIsAudio = false; // check if file ext is mp3

  return (
    <div className="column is-12 post">
      <article className="columns featured">
        {ifIsVideo
          ? <div className="column is-7 post-img"
            dangerouslySetInnerHTML={vidSrc && cleanHtml(vidSrc)} />
          : <div className="column is-7 post-img ">
            <img src={imgSrc} alt="" />
          </div>
        }
        <div className="column is-5 featured-content is-vcentered">
          <div>
            <h3 className="heading post-category">{category}</h3>
            <h1 className="title post-title">{title}</h1>
            <p className="post-excerpt">{description}</p>
            <br />
            {!vidSrc.includes('youtube.com') && !vidSrc.includes('inspiringhopechurch.com') && <Link to={link} className="button is-link">
              {ifIsVideo ? "Watch Video" : ifIsAudio ? "Listen Audio" : `Go to ${category}`}
            </Link>}
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
