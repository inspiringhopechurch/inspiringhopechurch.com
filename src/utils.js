import sanitizeHtml from "sanitize-html";

/** Validates that an URL is of the correct type
 * @param {string} url string representation of URL
 * @returns {boolean} True if `url` is one of valid types, false otherwise
 */
export function validUrl(url) {
  const myUrl = new URL(url);
  return ["https:", "http:", "mailto:"].includes(myUrl.protocol);
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
        iframe: ['src']
      },
      allowedIframeHostnames: ['www.youtube.com'],
      transformTags: {
        'table': sanitizeHtml.simpleTransform('table', { class: 'table is-size-6 is-striped is-narrow' }),
        'figure': sanitizeHtml.simpleTransform('figure', { class: 'image is-16by9' }, true),
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
 * @param {string} posterName name of file used as image poster.
 * @returns {string} HTML snippet for video playback.
 */
export function generateVideoSnippet(videoName, posterName) {
  return `<div class="container" data-id="${videoName}">
    <figure className="image is-16by9">
      <video
        class="has-ratio"
        controls="${true}"
        id="${videoName}-video"
        width="100%"
        height="100%"
        preload="metadata"
        poster="${posterName}"
      >
        <source src="/assets/${videoName}.webm" type="video/webm" />
        <source src="/assets/${videoName}.mp4" type="video/mp4" />
        <track kind="captions" srcLang="en" label="English" src="${videoName}.en.vtt" />
        <track kind="captions" srcLang="es" label="Español" src="${videoName}.es.vtt" />
        Unfortunately your browser is old and does not support embedded videos. Please consider upgrading.
      </video>
    </figure></div>`;
}
