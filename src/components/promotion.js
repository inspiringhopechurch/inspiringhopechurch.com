import React from "react";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./promotion.sass";

class Promotion extends React.Component {
  discountSection = (discount, month) => (
    <div className={`notification is-link`}>
      <div className={`columns is-vcentered is-centered`}>
        <div className={`column is-one-quarter`}>
          <h1 className={`title has-text-centered is-1`}>
            {discount} <FontAwesomeIcon icon={["fas", "badge-percent"]} /> Off!
          </h1>
        </div>
        <div className={`column is-half`}>
          Sample promo goes on until end of {month}! Register now for a {discount}%!
        </div>
      </div>
    </div>
  );

  render() {
    const { promoEndDate, promoDiscount } = this.props,
      currentDate = Date.now(),
      promoDate = new Date(promoEndDate),
      promoMonth = promoDate.toLocaleString("en-us", { month: "long" }),
      showDiscount = promoDate > currentDate;

    return showDiscount ? this.discountSection(promoDiscount, promoMonth) : null;
  }
}

Promotion.propTypes = {
  promoEndDate: PropTypes.string.isRequired,
  promoDiscount: PropTypes.number.isRequired,
};

export default Promotion;
