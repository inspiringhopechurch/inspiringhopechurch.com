import React, { useState, useEffect } from "react";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./accordion.sass";

export const invalidChars = /^[^a-zA-Z]+|[^\w:.-]+/g;

const Accordion = ({ title, children, isExpanded }) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [accordionHeight, setAccordionHeight] = useState(0);

  const toggleAccordion = () => {
    expanded && accordionContent && accordionContent.removeAttribute("style");
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Instead of resetting state when we resize, just remove styles, because this is simpler.
    function handleWindowResize() {
      // TODO: debounce removing style attribute. 1 operation/sec should be sufficient
      accordionContent.removeAttribute("style");
    }

    //! NOTE: DOM Event listeners set 'this' to be the target element,
    //! and if you rely on 'this' in an event handler, a regular function is necessary
    window.addEventListener("resize", handleWindowResize);

    return function cleanup() {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const accordionId = title.replace(invalidChars, "-");

  // Check for document being available first to prevent error during
  // gatsby ssr build step: https://www.gatsbyjs.com/docs/debugging-html-builds/
  const accordionContent = typeof document !== `undefined` && document.querySelector(`[data-id='${accordionId}']`);

  // We make sure to not reset accordionHeight to a value that's less than its initial value.
  // It will be on static pages whose data will not change, so there should never be 'less'
  // content that what we start with.
  // The exception to this is when we move from smaller viewports to wider ones (height will be smaller).
  // FOr that scenario we have the useEffect above dealing with window resizing.
  if (accordionContent?.clientHeight && accordionContent?.clientHeight > accordionHeight) {
    setAccordionHeight(accordionContent.clientHeight);
  }

  return (
    <>
      <h2 className={`accordion is-size-4 is-uppercase${expanded ? " expanded" : ""}`}>
        <button aria-expanded={expanded ? "true" : "false"} onClick={toggleAccordion}>
          {title} <FontAwesomeIcon icon={["fas", expanded ? "minus" : "plus"]} size="sm" />
        </button>
      </h2>
      <div
        className="accordion-content"
        data-id={accordionId} // @ts-ignore custom css property "--accordion-max-height"
        style={expanded && accordionHeight > 1 ? { "--accordion-max-height": `${accordionHeight}px` } : {}}
      >
        {children}
      </div>
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
