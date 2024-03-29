import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./promotion.sass";

const Promotion = ({ promoEndDate, promoDiscount }: PromotionProps) => {
  const discountSection = (discount: PromotionProps["promoDiscount"], month: PromotionProps["promoEndDate"]) => (
    <div className={`notification is-link`}>
      <div className={`columns is-vcentered is-centered`}>
        <div className={`column is-one-quarter`}>
          <h1 className={`title has-text-centered is-1`}>
            {discount} <FontAwesomeIcon icon={["fas", "percentage"]} /> Off!
          </h1>
        </div>
        <div className={`column is-half`}>
          Sample promo goes on until end of {month}! Register now for a {discount}%!
        </div>
      </div>
    </div>
  );

  const currentDate = Date.now(),
    promoDate = new Date(promoEndDate),
    promoMonth = promoDate.toLocaleString("en-us", { month: "long" }),
    showDiscount = promoDate.getDate() > currentDate;

  return showDiscount ? discountSection(promoDiscount, promoMonth) : null;
};

type PromotionProps = {
  promoEndDate: string,
  promoDiscount: number,
};

export default Promotion;
