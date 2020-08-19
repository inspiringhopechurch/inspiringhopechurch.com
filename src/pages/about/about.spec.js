import React from "react";
import { shallow } from "enzyme";
import About from "./index";

describe("About", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });
});
