import React, { useState, useEffect, type MouseEvent, type PropsWithChildren } from "react";
import "./accordion.sass";

export const invalidChars = /^[^a-zA-Z]+|[^\w:.-]+/g;

const Accordion = ({ title, children, isExpanded = false }: AccordionProps) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [accordionHeight, setAccordionHeight] = useState(0);
  const isBrowser = typeof document !== "undefined";

  const toggleAccordion = (ev: MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();

    expanded && accordionContent && accordionContent.removeAttribute("style");
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Instead of resetting state when we resize, just remove styles, because this is simpler.
    function handleWindowResize() {
      // TODO: debounce removing style attribute. 1 operation/sec should be sufficient
      accordionContent && accordionContent.removeAttribute("style");
    }

    //! NOTE: DOM Event listeners set 'this' to be the target element,
    //! and if you rely on 'this' in an event handler, a regular function is necessary
    window.addEventListener("resize", handleWindowResize);

    return function cleanup() {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const accordionId = title.toLowerCase().replace(invalidChars, "");

  // Check for document being available first to prevent error during
  // Gatsby SSR build step: https://www.gatsbyjs.com/docs/debugging-html-builds/
  const accordionContent = isBrowser ?
    document.querySelector<HTMLHeadingElement>(`[data-id='${accordionId}']`) :
    null

  // We make sure to not reset accordionHeight to a value that's less than its initial value.
  // It will be on static pages whose data will not change, so there should never be 'less'
  // content that what we start with.
  // The exception to this is when we move from smaller viewports to wider ones (height will be smaller).
  // For that scenario we have the useEffect above dealing with window resizing.
  if (accordionContent?.clientHeight && accordionContent?.clientHeight > accordionHeight) {
    setAccordionHeight(accordionContent.clientHeight);
  }

  return (
    <>
      {isBrowser ? /* This is set up this way to allow the accordion to toggle with css only, or js */
        <h2 id={accordionId} aria-expanded={expanded ? "true" : "false"} className={`accordion is-size-4 is-uppercase${expanded ? " expanded" : ""}`}>
          <a href={`#`} onClick={toggleAccordion}>{title}</a>
        </h2> :
        <h2 id={accordionId} className={`accordion is-size-4 is-uppercase${expanded ? " expanded" : ""}`}>
          <a href={`#${accordionId}`}>{title}</a>
        </h2>
      }
      <div
        className="accordion-content"
        data-id={accordionId}
        style={expanded && accordionHeight > 1 ? // @ts-ignore custom css property "--accordion-max-height"
          { "--accordion-max-height": `${accordionHeight}px` } :
          { "--accordion-max-height": `` }}
      >
        {children}
      </div>
    </>
  );
};

type AccordionProps = {
  title: string;
  isExpanded?: boolean;
} & PropsWithChildren;

export default Accordion;
