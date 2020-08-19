import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./header";

describe("Header", () => {
  const handleMenu = jest.fn();
  let menuActive;

  beforeEach(() => {
    menuActive = false;
  });

  it("should render without crashing", () => {
    const myHeader = shallow(<Header mobileMenuHandler={handleMenu} mobileMenuActive={menuActive} />);
    expect(myHeader).toMatchSnapshot();
  });

  it("should change mobile menu icon and show menu on click", () => {
    const myHeader = mount(<Header mobileMenuHandler={handleMenu} mobileMenuActive={menuActive} />);

    expect(myHeader.find("button.is-active")).toHaveLength(0);
    expect(myHeader.find("#nav-menu.is-active")).toHaveLength(0);
    expect(handleMenu).toHaveBeenCalledTimes(0);
    myHeader.find("button").simulate("click");
    expect(handleMenu).toHaveBeenCalledTimes(1);
    expect(myHeader.prop("mobileMenuActive")).toBe(menuActive);
    myHeader.setProps({ mobileMenuActive: !menuActive });
    expect(myHeader.prop("mobileMenuActive")).toBe(!menuActive);
    expect(myHeader.find("button.is-active")).toHaveLength(1); // icon change
    expect(myHeader.find("#nav-menu.is-active")).toHaveLength(1); // show hidden menu
  });
});
