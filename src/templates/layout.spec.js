import React from "react";
import { shallow } from "enzyme";
import Layout from "./layout";

describe("Layout", () => {
  let myLayout = undefined;

  beforeEach(() => {
    myLayout = shallow(<Layout location={{ pathname: "/", state: { prevPath: "/about" } }} />);
  });

  it("should render without crashing", () => {
    expect(myLayout).toMatchSnapshot();
  });
});
