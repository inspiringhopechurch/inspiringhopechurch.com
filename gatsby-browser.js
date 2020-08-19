import React from "react";
import Layout from "./src/templates/layout";
// For IE 11
import "babel-polyfill";
import "./src/styles/global.sass";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
