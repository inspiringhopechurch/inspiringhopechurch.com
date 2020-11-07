import React from "react";
import { shallow } from "enzyme";
import Beliefs from "./beliefs";

describe("Beliefs", () => {
  const myLocation = { pathname: "/about/beliefs", state: { prevPath: "/" } };

  it("should render without crashing", () => {
    const wrapper = shallow(<Beliefs location={myLocation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
