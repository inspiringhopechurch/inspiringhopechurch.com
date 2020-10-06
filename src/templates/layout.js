import React from "react";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }) => {
  return (
    <>
      <SEO />

      <Header location={location} />

      {children}

      <Footer />
    </>
  );
};
export default Layout;
