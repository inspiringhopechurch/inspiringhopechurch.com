import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./accordion.sass";

const Accordion = ({ title, children, isExpanded }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <h2 className={`accordion is-size-4 is-uppercase${expanded ? " expanded" : ""}`}>
        <button aria-expanded={expanded ? "true" : "false"} onClick={toggleAccordion}>
          {title} <FontAwesomeIcon icon={["fas", expanded ? "minus" : "plus"]} size="sm" />
        </button>
      </h2>
      {children}
    </>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
};

Accordion.defaultProps = {
  isExpanded: false,
};

export default Accordion;
