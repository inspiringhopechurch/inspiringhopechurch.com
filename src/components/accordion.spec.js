import React from "react";
import { mount } from "enzyme";
import Accordion, { invalidChars } from "./accordion";
// Import fontawesome library files
import "./icons";

describe("Accordion", () => {
  const title = "My Title",
    expanded = false;

  beforeEach(() => {
    //myAccordion = shallow(<Accordion />);
  });

  it("should render without crashing", () => {
    const myAccordion = mount(<Accordion title={title}>Test content</Accordion>);
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(0);
    expect(myAccordion.prop("title")).toBe(title);
    expect(myAccordion.prop("isExpanded")).toBe(expanded);
    expect(myAccordion.find(".accordion svg.fa-plus")).toHaveLength(1);
    expect(myAccordion.find(".accordion svg.fa-minus")).toHaveLength(0);
    expect(myAccordion).toMatchSnapshot();
  });

  it("should have expanded class when isExpanded is true", () => {
    const myAccordion = mount(
      <Accordion title={title} isExpanded={!expanded}>
        Test content
      </Accordion>
    );
    expect(myAccordion.prop("title")).toBe(title);
    expect(myAccordion.prop("isExpanded")).toBe(!expanded);
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(1);
    expect(myAccordion.find(".accordion svg.fa-plus")).toHaveLength(0);
    expect(myAccordion.find(".accordion svg.fa-minus")).toHaveLength(1);
  });
});
