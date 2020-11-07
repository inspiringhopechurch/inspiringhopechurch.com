import React from "react";
import { shallow } from "enzyme";
import Layout from "./layout";

describe("Layout", () => {
  let myLayout = undefined;
  const myLocation = { pathname: "/", state: { prevPath: "/about" } };

  beforeEach(() => {
    myLayout = shallow(<Layout location={myLocation} />);
  });

  it("should render without crashing", () => {
    expect(myLayout).toMatchSnapshot();
  });
});
