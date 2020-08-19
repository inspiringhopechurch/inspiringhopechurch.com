import React from "react";
import { shallow } from "enzyme";
import NotFound from "./404";

describe("NotFound", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
