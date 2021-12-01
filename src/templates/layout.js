import React from "react";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }) => {
  const currentPage = location?.pathname;

  return (
    <> {/* eslint-disable react/jsx-pascal-case */}
      <SEO />

      <Header location={location} />

      <main
        className={`${currentPage === "/" ? "main-dark" : "main-light"}`}
      >
        {children}
      </main>

      <Footer />
    </>
  );
};
export default Layout;
