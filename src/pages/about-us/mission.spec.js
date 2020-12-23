import React from "react";
import { shallow } from "enzyme";
import Mission from "./mission";

describe("Mission", () => {
  const myLocation = { pathname: "/about/mission", state: { prevPath: "/" } };

  it("should render without crashing", () => {
    const wrapper = shallow(<Mission location={myLocation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
