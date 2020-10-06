import React from "react";
import { shallow, mount } from "enzyme";
import Header from "./header";

describe("Header", () => {
  let testLocation;

  beforeEach(() => {
    testLocation = {
      hash: "",
      host: "localhost:8000",
      hostname: "localhost",
      href: "http://localhost:8000/",
      key: "initial",
      origin: "http://localhost:8000",
      pathname: "/",
      port: "8000",
      protocol: "http:",
      search: "",
      state: null,
    };
  });

  it("should render without crashing", () => {
    const myHeader = shallow(<Header location={testLocation} />);
    expect(myHeader).toMatchSnapshot();
  });

  it("should change mobile menu icon and show menu on click", () => {
    const myHeader = mount(<Header location={testLocation} />);

    expect(myHeader.find("button.is-active")).toHaveLength(0);
    expect(myHeader.find("#nav-menu.is-active")).toHaveLength(0);
    myHeader.find("button").simulate("click");
    expect(myHeader.find("button.is-active")).toHaveLength(1); // icon change
    expect(myHeader.find("#nav-menu.is-active")).toHaveLength(1); // show hidden menu
  });

  it("should make home page's menu item active", () => {
    const myHeader = mount(<Header location={testLocation} />);

    expect(myHeader.find("a.navbar-item.is-active-page")).toHaveLength(1);
  });

  it("should make about section's menu item active", () => {
    const testLocation = {
      hash: "",
      host: "localhost:8000",
      hostname: "localhost",
      href: "http://localhost:8000/about/",
      key: "initial",
      origin: "http://localhost:8000/about/",
      pathname: "/about/",
      port: "8000",
      protocol: "http:",
      search: "",
      state: null,
    };
    const myHeader = mount(<Header location={testLocation} />);

    expect(myHeader.find("div.navbar-item.is-active-page")).toHaveLength(1);
  });

  it("should make contact page's menu item active", () => {
    const testLocation = {
      hash: "",
      host: "localhost:8000",
      hostname: "localhost",
      href: "http://localhost:8000/contact/",
      key: "initial",
      origin: "http://localhost:8000/contact/",
      pathname: "/contact/",
      port: "8000",
      protocol: "http:",
      search: "",
      state: null,
    };
    const myHeader = mount(<Header location={testLocation} />);

    expect(myHeader.find("a.navbar-item.is-active-page")).toHaveLength(1);
  });
});
