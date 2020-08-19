import React from "react";
import { shallow } from "enzyme";
import Blog from "./blog";
import data from "../fixtures/data";

describe("Blog", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Blog data={data.data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
