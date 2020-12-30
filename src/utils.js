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
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["a", "iframe",   "img", "button"]),
      allowedAttributes: { 
        a: ["href"],
        img: ["src", "srcset", "alt"],
        "*": ["class", "id", "data-*"],
        iframe: ['src']
      },
      allowedIframeHostnames: ['www.youtube.com'],
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
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["a", "img", "button", "source", "track", "video"]),
      allowedAttributes: { 
        a: ["href"],
        img: ["src", "srcset", "alt"],
        "*": ["class", "id", "data-*"],
        video: ["controls", "width", "height", "poster", "preload"],
        source: ["src", "type"],
        track: ["kind", "src", "srcLang", "label"]
      },
    }),
  };
}
