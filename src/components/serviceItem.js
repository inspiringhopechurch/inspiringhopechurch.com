import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./serviceItem.sass";

/// ServiceItem shows icon conditionally
const ServiceItem = ({ children, ...props }) => (
  <div className={`column is-half-tablet is-one-third-desktop is-one-third-fullhd`}>
    <article className={`media px-5`}>
      {props.icon && (
        <figure className={`media-left`}>
          <p className={`image is-48x48`}>
            <FontAwesomeIcon icon={props.icon} size={props.iconSize} />
          </p>
        </figure>
      )}
      <div className={`media-content`}>
        <h2 className={`title is-size-3 is-uppercase`}>
          <span className={`has-text-weight-light`}>Our</span> <span className={`decorated`}>{props.serviceName}</span>
        </h2>
        <p className={`content is-medium`}>{children}</p>
      </div>
    </article>
  </div>
);

ServiceItem.propTypes = {
  icon: PropTypes.object,
  iconSize: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
};

ServiceItem.defaultProps = {
  iconSize: "2x",
};
export default ServiceItem;
