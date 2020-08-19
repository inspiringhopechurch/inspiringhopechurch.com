import React from "react";
import { mount } from "enzyme";
import Footer from "./footer";
// Import fontawesome library files
import "./icons";

describe("Footer", () => {
  const owner = "Copyright Owner",
    defaultOwner = "Inspiring Hope Church";

  beforeEach(() => {
    //myFooter = shallow(<Footer />);
  });

  it("should render without crashing", () => {
    const myFooter = mount(<Footer />);
    expect(myFooter.prop("copyrightOwner")).toBe(defaultOwner);
    expect(myFooter.find(".navbar-end.is-flex a")).toHaveLength(5);
    expect(myFooter).toMatchSnapshot();
  });

  it("should update the copyright owner when given one", () => {
    const myFooter = mount(<Footer copyrightOwner={owner} />);
    expect(myFooter.prop("copyrightOwner")).toBe(owner);
    expect(myFooter.find(".copyright .column p")).toHaveLength(1);
    expect(myFooter.find(".copyright .column p").text()).toContain(owner);
  });
});
