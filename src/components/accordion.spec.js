import React from "react";
import { mount } from "enzyme";
import Accordion, { invalidChars } from "./accordion";
// Import fontawesome library files
import "./icons";

describe("Accordion", () => {
  const title = "My Title",
    dataTitle = title.replace(invalidChars, "-"),
    emptyObject = {},
    expanded = false;

  beforeEach(() => {
    //myAccordion = shallow(<Accordion />);
  });

  // - Initially
  //    - accordionHeight should be 0
  //    - accordionContent should not have any custom styles set
  it("should render without crashing", () => {
    const myAccordion = mount(<Accordion title={title}>Test content</Accordion>);
    const expandableContainer = myAccordion.find(`[data-id="${dataTitle}"]`);

    expect(myAccordion.find(".accordion.expanded")).toHaveLength(0);
    expect(myAccordion.prop("title")).toBe(title);
    expect(myAccordion.prop("isExpanded")).toBe(expanded);
    expect(myAccordion.find(`[data-id="${dataTitle}"]`)).toHaveLength(1);
    expect(expandableContainer.find(`[style]`)).toEqual(emptyObject);
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
    myAccordion.find("button").simulate("click");
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(0);
  });

  // - when any header is clicked/touched
  //    - expanded state variable must toggle value
  //    - accordionContent must also have expanded class set/unset based on expanded state
  //    - accordionHeight must be set
  it("should have 'expanded' class toggled when the heading button is clicked", () => {
    const myAccordion = mount(<Accordion title={title}>Test content</Accordion>);

    expect(myAccordion.find(".accordion")).toHaveLength(1);
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(0);
    myAccordion.find("button").simulate("click");

    expect(myAccordion.find(".accordion")).toHaveLength(1);
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(1);
    myAccordion.find("button").simulate("click");
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(0);
    myAccordion.find("button").simulate("click");
    expect(myAccordion.find(".accordion.expanded")).toHaveLength(1);
    // const expandableContainer = myAccordion.find(`[data-id="${dataTitle}"]`);
    // expect(expandableContainer.find(`[style]`)).toEqual(
    //   expect.objectContaining({
    //     "--accordion-max-height": expect.any(String),
    //   })
    // );
  });

  // TODO: unit/integration test the heck outta me
  // - when not expanded or accordionHeight < 1
  //    - there should be no custom style set

  // - when the window resizes/rotates
  //    - any custom style for accordionContent should be unset

  // - when expanded and accordionHeight > 1
  //    - there should be custom style set that sets css variable
});
