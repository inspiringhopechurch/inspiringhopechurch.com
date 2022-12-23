import React, { useEffect, useRef } from "react";

/**
 * Video Player component
 */
const VideoPlayer = ({ id, caption, src, preload, posterImg }: VPProps) => {
  const vidRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let player;
    import("plyr").then(component => {
      player = new component.default(`[id="${id}-video"]`, {
        resetOnEnd: true,
        disableContextMenu: false,
        enabled: true,
        fullscreen: { enabled: true, fallback: true, }
      });
    })

    return () => { player = null }; // hopefully cleanup when gc happens;
  }, [])

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
      {src.webm && <source src={src.webm} type="video/webm" />}
      <source src={src.mp4} type="video/mp4"
      />
      {caption &&
        <track
          kind="subtitles"
          label="English"
          srcLang="en"
          src={caption.en}
        />}
      {caption?.es &&
        <track
          kind="subtitles"
          label="Español"
          srcLang="es"
          src={caption.es}
        />}
      Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
    </video>
  )
};

type VPProps = {
  /** File identifier */
  id: string,
  /** Captions object */
  caption?: {
    /** English language captions path */
    en: string,
    /** Spanish language captions path */
    es?: string
  },
  src: {
    /** mp4 file source path */
    mp4: string,
    /** webm file source path */
    webm?: string,
  }
  /** Poster image source path */
  posterImg?: string,
  /** Whether to preload metadata or not */
  preload?: boolean,
};

export default VideoPlayer;
