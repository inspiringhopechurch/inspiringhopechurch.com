import React from "react";
import { shallow } from "enzyme";
import Page from "./page";
import data from "../fixtures/data";

describe("Page", () => {
  
  it("should render without crashing", () => {
    const myLocation = { pathname: "/", state: { prevPath: "/about" } };
    const wrapper = shallow(<Page data={data.data} location={myLocation} />);
    expect(wrapper).toMatchSnapshot();
  });
});
