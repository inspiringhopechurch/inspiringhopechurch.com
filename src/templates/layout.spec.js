import React from "react";
import { shallow } from "enzyme";
import Layout from "./layout";

describe("Layout", () => {
  let myLayout = undefined;

  beforeEach(() => {
    myLayout = shallow(<Layout />);
  });

  it("should render without crashing", () => {
    expect(myLayout).toMatchSnapshot();
  });
});
