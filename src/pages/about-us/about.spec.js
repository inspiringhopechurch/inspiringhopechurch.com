import React from "react";
import { shallow } from "enzyme";
import About from "./index";
import data from "../../fixtures/data";

describe("About", () => {
  const myLocation = { pathname: "/about/", state: { prevPath: "/" } };

  it("should render without crashing", () => {
    const wrapper = shallow(<About location={myLocation} data={data.data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
