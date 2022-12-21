import React from "react";
import type { WrapPageElementBrowserArgs } from "gatsby";
import Layout from "./src/templates/layout";

import "./src/styles/global.sass";

export function wrapPageElement({ element, props }: WrapPageElementBrowserArgs) {
  return <Layout {...props}>{element}</Layout>;
}
