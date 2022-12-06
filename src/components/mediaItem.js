import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import VideoPlayer from "../components/videoPlayer";
import { cleanHtml, cleanHtmlForVideo } from "../utils";

/**
 * Component that shows a block of media, such as audio or video, that can be played by the user.
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.link
 * @param {string=} props.category
 * @param {string=} props.imgSrc
 * @param {string=} props.vidSrc
 * @param {string=} props.timestamp
 */
const MediaItem = ({
  title,
  description,
  link,
  category = "Sunday Message",
  imgSrc = "https://cdn.emk.dev/templates/featured-image.png",
  vidSrc,
  timestamp
}) => {
  const [renderVideo, setRenderVideo] = useState({ nativeMarkup: true, videoId: '' })
  const videoEl = useRef(null)
  const ifIsVideo = !!vidSrc; // should check if file ext is mp4, webm or av1 (or heic?)
  const ifIsAudio = false; // check if file ext is mp3
  const isLive = vidSrc.includes('inspiringhopechurch.com');

  useEffect(() => {
    const videoId = videoEl.current.children[0].children[0].id
    videoId !== '' &&
      setRenderVideo({
        nativeMarkup: false,
        videoId
      })
  }, [])

  return (
    <div className="column is-12 post">
      <article ref={videoEl} className="columns featured">
        {ifIsVideo
          ? (
            renderVideo.nativeMarkup
              ? <div className="column is-7 post-img" dangerouslySetInnerHTML={vidSrc && isLive ? cleanHtml(vidSrc) : cleanHtmlForVideo(vidSrc)} />
              : <div className="column is-7 post-img">
                <VideoPlayer
                  enCaption={{ src: `/assets/${renderVideo.videoId}.en.vtt` }}
                  mp4Src={`//ihc-video-storage.us-east-1.linodeobjects.com/assets/${renderVideo.videoId}.mp4`}
                  // posterImg={`/assets/${renderVideo.videoId}.jpg`}
                  id={renderVideo.videoId}
                  preload
                />
              </div>
          )
          : <div className="column is-7 post-img">
            <img src={imgSrc} alt="" />
          </div>
        }
        <div className="column is-5 featured-content is-vcentered">
          <div>
            <h2 className="heading post-category">{!timestamp ? category : `${category} | ${timestamp.split('T')[0]}`}</h2>
            <h1 className="title post-title">{title}</h1>
            <p className="post-excerpt">{description}</p>
            <br />
            {/* {!vidSrc.includes('youtube.com') && !isLive && <Link to={link} className="button is-link">
              {ifIsVideo ? "Watch Video" : ifIsAudio ? "Listen Audio" : `Go to ${category}`}
            </Link>} */}
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
  vidSrc: PropTypes.string,
  timestamp: PropTypes.string,
};

export default MediaItem;
