import React from "react";
import { shallow } from "enzyme";
import Mission from "./mission";

describe("Mission", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Mission />);
    expect(wrapper).toMatchSnapshot();
  });
});
