import React from "react";
import { shallow } from "enzyme";
import Index from "./index";
import data from "../fixtures/data";

describe("Index", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Index data={data.data} />);
    expect(wrapper).toMatchSnapshot();
  });
});
