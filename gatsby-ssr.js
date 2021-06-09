import React from "react";
import Layout from "./src/templates/layout";

import "./src/styles/global.sass";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
