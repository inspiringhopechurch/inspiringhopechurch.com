import React from "react";
import "./fancyHeading.sass";

/**
 * Component which takes text and renders it as a fancy heading.
 * @param {object} props - information used to render this heading
 */
const FancyHeading = ({ className, heading, splitHeading }: FancyHeadingProps) => {
  const [firstWord, ...remainingWords] = heading.split(" ");
  const headingId = heading.trim().toLowerCase().replace(/ /g, '-')

  // TODO - check in unit test that id gets slugified properly.
  const formattedHeading = splitHeading ? (
    <h2 id={headingId} className={`two-line-heading${className ? " " + className : ""}`}>
      <span className="first-word">{firstWord}</span> {remainingWords.join(" ")}
    </h2>
  ) : (
    <h1 id={headingId} className={`fancy-heading${className ? ` ${className}` : ""}`}>
      <span className="first-word">{firstWord}</span>{" "}
      <span className="decorated">{remainingWords.join(" ")}</span>
    </h1>
  );

  return formattedHeading;
};

type FancyHeadingProps = {
  /** Text to use for the heading */
  heading: string,
  /** css class name to use for the heading element */
  className?: string,
  /** If true, generates alternate heading style */
  splitHeading?: boolean
};

export default FancyHeading;
