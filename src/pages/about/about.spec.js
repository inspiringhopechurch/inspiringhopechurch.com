import React from "react";
import { shallow } from "enzyme";
import About from "./index";

describe("About", () => {
  const myLocation = { pathname: "/about/", state: { prevPath: "/" } };

  it("should render without crashing", () => {
    const wrapper = shallow(<About location={myLocation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
