import React from "react";
import PropTypes from "prop-types";
import { Controls, DefaultUi, LiveIndicator, Player, Video } from "@vime/react";

/**
 * Video Player component
 * @param {object} props - component props
 * @param {object} props.enCaption - English language captions
 * @param {string} props.enCaption.src - Spanish language captions
 * @param {object} [props.esCaption] - Spanish language captions
 * @param {string} props.esCaption.src - Spanish language captions
 * @param {string} props.mp4Src - mp4 file source path
 * @param {string=} props.posterImg - poster image source path
 * @param {string=} props.webmSrc - webm file source path
 * @param {boolean=} props.preload - Whether to preload metadata or not
 */
const VideoPlayer = ({ enCaption, esCaption, mp4Src, preload, posterImg, webmSrc }) => (
  <Player
    theme="dark"
    class="has-ratio"
  >
    <Video
      crossOrigin="anonymous"
      poster={posterImg}
      preload={preload ? "metadata" : "none"}
    >
      {webmSrc &&
        <source
          src={webmSrc}
          type="video/webm"
        />}
      <source
        src={mp4Src}
        type="video/mp4"
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
    </Video>
    <Controls>
      <LiveIndicator />
    </Controls>
    <DefaultUi />
  </Player>
);

VideoPlayer.propTypes = {
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
