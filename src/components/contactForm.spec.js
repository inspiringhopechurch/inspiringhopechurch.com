import React from "react";
import { shallow, mount } from "enzyme";
import ContactForm from "./contactForm";
// Import fontawesome library files
import "./icons";

describe("ContactForm", () => {
  let myForm = undefined;
  const name = "fullName",
    email = "email",
    subject = "messageSubject",
    message = "messageBody";

  const formSubmitButton = "#form-submit",
    testName = "Test User ",
    testEmail = "test@test.com ",
    testSubject = " Test Subject ",
    testMsg = " Test message",
    nameValidationTxt = "Please enter your full name",
    emailValidationTxt = "Please enter your email",
    subjectValidationTxt = "Tell us why you're reaching out in the subject.",
    bodyValidationTxt = "Tell us how we can help you here.";

  beforeEach(() => {
    // myForm = shallow(<ContactForm />);
  });

  it("should render without crashing", () => {
    myForm = shallow(<ContactForm />);
    expect(myForm).toMatchSnapshot();
  });

  it("Form to have default validation messages", () => {
    myForm = mount(<ContactForm />);
    expect(myForm.prop("nameValidationMsg")).toBe(nameValidationTxt);
    expect(myForm.prop("emailValidationMsg")).toBe(emailValidationTxt);
    expect(myForm.prop("subjectValidationMsg")).toBe(subjectValidationTxt);
    expect(myForm.prop("bodyValidationMsg")).toBe(bodyValidationTxt);
  });

  it("disables submit button when required inputs are not filled out", () => {
    myForm = mount(<ContactForm />);
    expect(myForm.find(formSubmitButton).prop("disabled")).toBeTruthy();
  });

  it("enables submit button only when all inputs are filled in", () => {
    myForm = mount(<ContactForm />);

    expect(myForm.find(formSubmitButton).prop("disabled")).toBeTruthy();

    myForm.find(`#${name}`).simulate("change", { target: { name: name, value: testName } });
    myForm.find(`#${email}`).simulate("change", { target: { name: email, value: testEmail } });
    myForm.find(`#${subject}`).simulate("change", { target: { name: subject, value: testSubject } });
    expect(myForm.find(formSubmitButton).prop("disabled")).toBeTruthy();

    myForm.find(`#${message}`).simulate("change", { target: { name: message, value: testMsg } });
    expect(myForm.find(formSubmitButton).prop("disabled")).toBeFalsy();

    // These tests were added when I was trimming spaces from the typed in values.
    // Now, I'm not doing that anymore. Considering if I should be modifying user input,
    // Or instead, give a warning message when there are trailing spaces. For now, disable
    // myForm.find(`#${name}`).simulate("change", { target: { name: name, value: " " } });
    // expect(myForm.find(formSubmitButton).prop("disabled")).toBeTruthy();

    // myForm.find(`#${name}`).simulate("change", { target: { name: name, value: testName } });
    // expect(myForm.find(formSubmitButton).prop("disabled")).toBeFalsy();
  });

  it("changes inputs when values are filled in", () => {
    myForm = mount(<ContactForm />);

    //! We keep querying myForm.find(`selector`) and don't store this in a
    //! variable, because enzyme will not pick up changes if we do this.
    expect(myForm.find(`#${name}`).prop("value").length).toBe(0);
    myForm.find(`#${name}`).simulate("change", { target: { name: name, value: testName } });
    expect(myForm.find(`#${name}`).prop("value")).toEqual(testName);
    expect(myForm.find(`#${name}`).prop("value").length).toBe(testName.length);

    expect(myForm.find(`#${email}`).prop("value").length).toBe(0);
    myForm.find(`#${email}`).simulate("change", { target: { name: "email", value: testEmail } });
    expect(myForm.find(`#${email}`).prop("value")).toEqual(testEmail);
    expect(myForm.find(`#${email}`).prop("value").length).toBe(testEmail.length);

    expect(myForm.find(`#${subject}`).prop("value").length).toBe(0);
    myForm.find(`#${subject}`).simulate("change", {
      target: { name: "messageSubject", value: testSubject },
    });
    expect(myForm.find(`#${subject}`).prop("value")).toEqual(testSubject);
    expect(myForm.find(`#${subject}`).prop("value").length).toBe(testSubject.length);

    expect(myForm.find(`#${message}`).text().length).toBe(0);
    myForm.find(`#${message}`).simulate("change", {
      target: { name: message, value: testMsg },
    });
    myForm.find(`#${message}`).simulate("change");
    // Getting the value of *this* input a different way, just because I can
    expect(myForm.find(`#${message}`).getDOMNode().value.length).toBe(testMsg.length);
  });
});
