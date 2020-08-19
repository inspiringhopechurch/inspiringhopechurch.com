import React from "react";
import { shallow, mount } from "enzyme";
import ContactForm from "./contactForm";
// Import fontawesome library files
import "./icons";

describe("ContactForm", () => {
  let myForm = undefined;
  const form = "#form-submit",
    testName = "Test User",
    testEmail = "test@test.com",
    testSubject = "Test Subject",
    testMsg = "Test message",
    nameSelector = "#fullName",
    emailSelector = "#email",
    subjectSelector = "#messageSubject",
    messageSelector = "#messageBody",
    nameValidationTxt = "Please enter your full name",
    emailValidationTxt = "Please enter your email",
    subjectValidationTxt = "Need a quote? Want to meet? Let us know in the subject.",
    bodyValidationTxt = "Tell us how we can be of service to you";

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
    expect(myForm.find(form).prop("disabled")).toBeTruthy();
  });

  it("enables submit button when all inputs are filled in", () => {
    myForm = mount(<ContactForm />);
    expect(myForm.find(form).prop("disabled")).toBeTruthy();
    myForm.setState({ fullNameDirty: true });
    myForm.setState({ emailDirty: true });
    myForm.setState({ messageSubjectDirty: true });
    myForm.setState({ messageBodyDirty: true });
    expect(myForm.find(form).prop("disabled")).toBeFalsy();
  });

  it("changes inputs when values are filled in", () => {
    myForm = mount(<ContactForm />);
    expect(myForm.find(form).prop("disabled")).toBeTruthy();

    expect(myForm.find(nameSelector).prop("value").length).toBe(0);
    myForm.find(nameSelector).simulate("change", { target: { value: testName, name: "fullName" } });
    expect(myForm.find(nameSelector).prop("value")).toEqual(testName);
    expect(myForm.find(nameSelector).prop("value").length).toBe(testName.length);

    expect(myForm.find(emailSelector).prop("value").length).toBe(0);
    myForm.find(emailSelector).simulate("change", { target: { value: testEmail, name: "email" } });
    expect(myForm.find(emailSelector).prop("value")).toEqual(testEmail);
    expect(myForm.find(emailSelector).prop("value").length).toBe(testEmail.length);

    expect(myForm.find(subjectSelector).prop("value").length).toBe(0);
    myForm.find(subjectSelector).simulate("change", {
      target: { value: testSubject, name: "messageSubject" },
    });
    expect(myForm.find(subjectSelector).prop("value")).toEqual(testSubject);
    expect(myForm.find(subjectSelector).prop("value").length).toBe(testSubject.length);

    expect(myForm.find(messageSelector).text().length).toBe(0);
    myForm.find(messageSelector).instance().value = testMsg;
    myForm.find(messageSelector).simulate("change");
    expect(myForm.state("messageBody").length).toBe(testMsg.length);
    expect(myForm.find(form).prop("disabled")).toBeFalsy();
  });
});
