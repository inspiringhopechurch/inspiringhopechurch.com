import React from "react";
import { shallow } from "enzyme";
import Contact from "./contact";

describe("Contact", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Contact />);
    expect(wrapper).toMatchSnapshot();
  });
});
