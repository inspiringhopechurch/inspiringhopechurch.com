import React from "react";
import Layout from "./src/templates/layout";

import "./src/styles/global.sass";

// export function onRouteUpdate({ location, prevLocation }) {
//   if (location && location.state) {
//     location.referrer = prevLocation ? prevLocation.pathname : null;
//   }
// }

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
