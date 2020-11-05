/** Validates that an URL is of the correct type
 * @param {string} url string representation of URL
 * @returns {boolean} True if `url` is one of valid types, false otherwise
 */
export function validUrl(url) {
  const myUrl = new URL(url);
  return ["https:", "http:", "mailto:"].includes(myUrl.protocol);
}
