import React from "react";
import type { WrapPageElementNodeArgs, RenderBodyArgs } from "gatsby";
import Layout from "./src/templates/layout";
import { siteLanguage } from "./config";

import "./src/styles/global.sass";

export function wrapPageElement({ element, props }: WrapPageElementNodeArgs) {
  return <Layout {...props}>{element}</Layout>;
}

export function onRenderBody({ setHtmlAttributes }: RenderBodyArgs) {
  setHtmlAttributes({ lang: siteLanguage, className: "has-navbar-fixed-top" })
}
