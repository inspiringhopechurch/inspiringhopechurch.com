import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/seo";
import Header from "../components/header";
import Footer from "../components/footer";
// Import fontawesome library files
import "../components/icons";

const Layout = ({ children, location }) => {
  const duration = 0.25;

  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
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
          // Since there is a About 'section', change animations (once you've entered that section)
          // to be in the x-axis
          variants={variants}
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
