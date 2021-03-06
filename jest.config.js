module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|vtt)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`cypress`, `src/fixtures`, `node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: ["raf/polyfill", "<rootDir>/setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
