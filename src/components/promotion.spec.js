import React from "react";
import { mount, shallow } from "enzyme";
import Promotion from "./promotion";
// Import fontawesome library files
import "./icons";

describe("Promotion", () => {
  const discount = 5,
    date_ = "October 5, 2052 23:59:59",
    passedDate_ = "February 5, 2019 23:59:59";

  it("should render without crashing", () => {
    const promoBlock = shallow(
      <Promotion promoEndDate={date_} promoDiscount={discount} />
    );
    expect(promoBlock).toMatchSnapshot();
  });

  it("should render nothing without crashing", () => {
    const promoBlock = shallow(
      <Promotion promoEndDate={passedDate_} promoDiscount={discount} />
    );
    expect(promoBlock).toMatchSnapshot();
  });

  it("has the expected props when initially rendered", () => {
    const promoBlock = mount(
      <Promotion promoEndDate={date_} promoDiscount={discount} />
    );

    //expect(promoBlock.find(".notification")).toHaveLength(1);
    expect(promoBlock.prop("promoEndDate")).toBe(date_);
    expect(promoBlock.prop("promoEndDate")).not.toBe(passedDate_);
    expect(promoBlock.prop("promoDiscount")).toBe(discount);

    expect(promoBlock.find(".column.is-one-quarter h1")).toHaveLength(1);
    expect(promoBlock.find(".column.is-half")).toHaveLength(1);
  });
});
