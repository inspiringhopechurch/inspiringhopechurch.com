import sanitizeHtml from "sanitize-html";
import fs from 'fs';
import { objectStoreHost } from '../config';
/**
 * Finds the item in an array that contains a given slug. This slug
 * corresponds to a particular slice of content in Ghost will will be
 * used on this page.
 * @param {Object} page - Object that represents a Gatsby page content.
 * @param {string} query - string that corresponds to a Ghost slug.
 */
export function findGhostSection(page, query) {
  return (page.node.slug === query) ? page.node : undefined;
}

/** Validates that an URL is of the correct type
 * @param {string} url string representation of URL
 * @returns {boolean} True if `url` is one of valid types, false otherwise
 */
export function validUrl(url) {
  const myUrl = new URL(url);
  return ["https:", "http:", "mailto:"].includes(myUrl.protocol);
}

/**
 * Check if the file exists on the filesystem. Used to
 * determine whether to include subtitles or not.
 *
 * @param {String} pathToFile Path of the file
 */
export function doesFileExist(pathToFile) {
  try {
    return fs.statSync(pathToFile).isFile()
  } catch (e) {
    if (e.code === `ENOENT`) {
      return false
    } else {
      throw e
    }
  }
}

/** Sanitizes html markup that is passed in. This should be used on any
 * content that is user modifiable.
 * @param {string} markup string representation of html from untrusted source
 */
export function cleanHtml(markup) {
  return {
    __html: sanitizeHtml(markup, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["a", "button", "iframe", "img", "svg", "circle", "path", "g", "defs", "title"]),
      allowedAttributes: {
        a: ["href"],
        img: ["src", "srcset", "alt"],
        svg: ["xmlns", "viewBox"],
        circle: ["cx", "cy", "r", "fill"],
        path: ["d", "fill"],
        g: ["fill"],
        "*": ["class", "id", "data-*"],
        iframe: ['src', 'title', 'referrerpolicy', 'scrolling', 'allow', 'allowfullscreen']
      },
      allowedIframeHostnames: ['www.youtube.com', 'stream.inspiringhopechurch.com'],
      transformTags: {
        'table': sanitizeHtml.simpleTransform('table', { class: 'table is-size-6 is-striped is-narrow' }),
        'iframe': sanitizeHtml.simpleTransform('iframe', { class: 'has-ratio' }),
      },
      parser: {
        lowerCaseAttributeNames: false // prevents xml attributes, e.g. viewBox, from being lowercased
      }
    }),
  };
}

/** Sanitizes html markup that is passed in and retains video specific tags.
 * This should be used on any content that is user modifiable.
 * @param {string} markup string representation of html from untrusted source
 */
export function cleanHtmlForVideo(markup) {
  return {
    __html: sanitizeHtml(markup, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["a", "button", "img", "source", "track", "video"]),
      allowedAttributes: {
        a: ["href"],
        img: ["src", "srcset", "alt"],
        "*": ["class", "id", "data-*"],
        video: ["controls", "width", "height", "poster", "preload"],
        source: ["src", "type"],
        track: ["kind", "src", "srclang", "label"]
      }
    }),
  };
}

/** Generates an html snippet for a video file.
 * @param {string} videoName name used for video file. Also used as prefix
 * for the caption file.
 * @param {string} posterName name of file used as image poster, including file extension.
 * @param {boolean=} inObjectStore indicates that files are in object storage
 * @returns {string} HTML snippet for video playback. Assumes 16x9 video content.
 */
export function generateVideoSnippet(videoName, posterName, inObjectStore) {
  return `<div id="${videoName}" class="container" data-id="${videoName}">
      <video
        class="has-ratio"
        controls
        id="${videoName}-video"
        width="100%"
        height="100%"
        preload="metadata"
        poster="${posterName ? "/assets/" + posterName : ""}"
      >
        <source src="${inObjectStore ? objectStoreHost : ""}/assets/${videoName}.webm" type="video/webm" />
        <source src="${inObjectStore ? objectStoreHost : ""}/assets/${videoName}.mp4" type="video/mp4" />
        <track kind="captions"  srcLang="en" label="English" src="/assets/${videoName}.en.vtt" />
        <track kind="subtitles" srcLang="es" label="Español" src="/assets/${videoName}.es.vtt" />
        Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
      </video>
    </div>`;
}
