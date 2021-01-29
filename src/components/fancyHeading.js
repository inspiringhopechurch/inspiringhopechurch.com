import React from "react";
import * as PropTypes from "prop-types";
import "./fancyHeading.sass";

/**
 * Component which takes text and renders it as a fancy heading.
 * @param {object} props - information used to render this heading
 * @param {string=} props.className - class name to use for the heading element
 * @param {string} props.heading - Text to use for the heading
 * @param {boolean=} props.splitHeading - If true, generates alternate heading style
 */
const FancyHeading = ({ className, heading, splitHeading }) => {
  const [firstWord, ...remainingWords] = heading.split(" ");

  const formattedHeading = splitHeading ? (
    <h2 className={`two-line-heading${className ? " " + className : ""}`}>
      <span className="first-word">{firstWord}</span> {remainingWords.join(" ")}
    </h2>
  ) : (
    <h1 className={`${className ? className : ""}`}>
      <span className="first-word">{firstWord}</span>{" "}
      <span className="decorated">{remainingWords.join(" ")}</span>
    </h1>
  );

  return formattedHeading;
};

FancyHeading.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  splitHeading: PropTypes.bool
};

export default FancyHeading;
