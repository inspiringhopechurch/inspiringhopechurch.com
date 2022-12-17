import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }) => {
  const currentPage = location?.pathname;

  return (
    <> {/* eslint-disable react/jsx-pascal-case */}

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
