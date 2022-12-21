import React from "react";
import type { WrapPageElementNodeArgs } from "gatsby";
import Layout from "./src/templates/layout";

import "./src/styles/global.sass";

export function wrapPageElement({ element, props }: WrapPageElementNodeArgs) {
  return <Layout {...props}>{element}</Layout>;
}
