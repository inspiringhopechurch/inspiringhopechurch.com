import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }) => {
  const duration = 0.25;

  const variantsY = {
    initial: {
      opacity: 0,
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: duration },
    },
  };

  // Fade out only on exit. Otherwise movement in x direction
  // looks odd when combined with movement in Y
  const variantsX = {
    initial: {
      opacity: 0,
      x: 10,
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        duration: duration,
        delay: duration,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: duration },
    },
  };

  const currentPage = location?.pathname;
  const previousPage = location?.state?.prevPath;

  return (
    <>
      <SEO />

      <Header location={location} />

      <AnimatePresence initial={false}>
        <motion.main
          className={currentPage === "/" ? "main-dark" : "main-light"}
          key={location.pathname}
          variants={currentPage.includes("/about") && previousPage?.includes("/about") ? variantsX : variantsY}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
};
export default Layout;
