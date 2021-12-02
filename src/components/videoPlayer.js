import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Video Player component
 * @param {object} props - component props
 * @param {string} props.id - File identifier
 * @param {object} [props.enCaption] - English language captions
 * @param {string} props.enCaption.src - Spanish language captions
 * @param {object} [props.esCaption] - Spanish language captions
 * @param {string} props.esCaption.src - Spanish language captions
 * @param {string} props.mp4Src - mp4 file source path
 * @param {string=} props.posterImg - poster image source path
 * @param {string=} props.webmSrc - webm file source path
 * @param {boolean=} props.preload - Whether to preload metadata or not
 */
const VideoPlayer = ({ id, enCaption, esCaption, mp4Src, preload, posterImg, webmSrc }) => {
  const vidRef = useRef(null)

  useEffect(() => {
    /* eslint-disable no-unused-vars */
    let player;
    /* eslint-enable no-unused-vars */
    import("plyr").then(component => {
      player = new component.default(`[id="${id}-video"]`, {
        resetOnEnd: true,
        disableContextMenu: false,
        enabled: true
      });
    })

    return () => player = null; // hopefully cleanup when gc happens;
  })

  return (
    <video
      ref={vidRef}
      className="has-ratio"
      controls
      id={`${id}-video`}
      width="100%"
      height="100%"
      poster={posterImg ? posterImg : `/assets/video-logo.svg`}
      preload={preload ? "metadata" : "none"}
      playsInline
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={mp4Src} type="video/mp4"
      />
      {enCaption &&
        <track
          kind="subtitles"
          label="English"
          srcLang="en"
          src={enCaption.src}
        />}
      {esCaption &&
        <track
          kind="subtitles"
          label="Español"
          srcLang="es"
          src={esCaption.src}
        />}
      Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
    </video>
  )
};

VideoPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  enCaption: PropTypes.shape({
    src: PropTypes.string.isRequired
  }),
  esCaption: PropTypes.shape({
    src: PropTypes.string.isRequired
  }),
  mp4Src: PropTypes.string.isRequired,
  posterImg: PropTypes.string,
  webm: PropTypes.string,
  preload: PropTypes.bool,
};

export default VideoPlayer;
