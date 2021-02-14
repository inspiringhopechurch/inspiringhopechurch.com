import React from "react";
import { shallow } from "enzyme";
import Post from "./post";
import data from "../fixtures/data";

describe("Post", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Post data={data.data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
