import React, { type ReactNode } from "react";
import { Header, Footer } from "../components";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }: {
  children: ReactNode;
  location: Location
}) => {
  const currentPage = location?.pathname;

  return (
    <>
      <Header location={location} />
      <main className={`${currentPage === "/" ? "main-dark" : "main-light"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
