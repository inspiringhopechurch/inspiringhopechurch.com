import React, { useEffect, useRef, useState } from "react";
// import { Link } from "gatsby";
import { VideoPlayer } from "./";
import { cleanHtml, cleanHtmlForVideo } from "../utils";

/**
 * Component that shows a block of media, such as audio or video, that can be played by the user.
 */
const MediaItem = ({
  title,
  description = "",
  // link,
  category = "Sunday Message",
  imgSrc = "/assets/ghost-featured-image.png",
  vidSrc,
  timestamp
}: MediaItemProps) => {
  const [renderVideo, setRenderVideo] = useState({ nativeMarkup: true, videoId: '' });
  const videoEl = useRef<HTMLElement | null>(null);
  const ifIsVideo = !!vidSrc; // should check if file ext is mp4, webm or av1 (or heic?)
  // const ifIsAudio = false; // check if file ext is mp3

  // Fix potential vulnerability found by CodeQL: inspiringhopechurch.com/security/code-scanning/5
  const allowedHosts = ['inspiringhopechurch.com', 'dev.inspiringhopechurch.com', 'stream.inspiringhopechurch.com'];
  const urlRegexp = /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g
  const vidSrcUrls = vidSrc?.match(urlRegexp) ?? []
  const isLive = vidSrcUrls.length ? vidSrcUrls.some(url => allowedHosts.includes(new URL(url).host)) : false

  useEffect(() => {
    const videoId = videoEl?.current?.children[0].children[0].id
    videoId && videoId !== '' &&
      setRenderVideo({
        nativeMarkup: false,
        videoId
      })
  }, [])

  return (
    <div className="column is-12 post">
      <article ref={videoEl} className="columns featured">
        {ifIsVideo ?
          (renderVideo.nativeMarkup ?
            <div className="column is-7 post-img" dangerouslySetInnerHTML={vidSrc && isLive ? cleanHtml(vidSrc) : cleanHtmlForVideo(vidSrc)} /> :
            <div className="column is-7 post-img">
              <VideoPlayer
                caption={{ en: `/assets/${renderVideo.videoId}.en.vtt` }}
                src={{ mp4: `//ihc-video-storage.us-east-1.linodeobjects.com/assets/${renderVideo.videoId}.mp4` }}
                // posterImg={`/assets/${renderVideo.videoId}.jpg`}
                id={renderVideo.videoId}
                preload
              />
            </div>) :
          <div className="column is-7 post-img">
            <img src={imgSrc} alt="" />
          </div>
        }
        <div className="column is-5 featured-content is-vcentered">
          <div>
            <h2 className="heading post-category">{!timestamp ? category : `${category} | ${timestamp.split('T')[0]}`}</h2>
            <h1 className="title post-title">{title}</h1>
            <p className="post-excerpt">{description}</p>
            <br />
            {/* {!vidSrc?.includes('youtube.com') && !isLive && <Link to={link} className="button is-link">
              {ifIsVideo ? "Watch Video" : ifIsAudio ? "Listen Audio" : `Go to ${category}`}
            </Link>} */}
          </div>
        </div>
      </article>
    </div>
  );
};

type MediaItemProps = {
  title: string,
  category?: string,
  description?: string,
  link?: string,
  imgSrc?: string,
  vidSrc?: string,
  timestamp?: string,
};

export default MediaItem;
