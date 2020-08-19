import React from "react";
import { shallow } from "enzyme";
import Beliefs from "./beliefs";

describe("Beliefs", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Beliefs />);
    expect(wrapper).toMatchSnapshot();
  });
});
