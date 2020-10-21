import React, { useState } from "react";
import { withPrefix } from "gatsby";
import * as PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contactForm.sass";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fullNameDirty: false,
    email: "",
    emailDirty: false,
    messageSubject: "",
    messageSubjectDirty: false,
    messageBody: "",
    messageBodyDirty: false,
    formSubmissionError: false,
    formSubmissionAttempt: false,
    showNotification: false,
    formMessage: "",
  });

  /**
   * Handles changes to the form's inputs. Should be passed to an input's
   * onChange prop.
   * @param {SyntheticEvent} event - Provides the value for the input being changed
   */
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const nameDirty = target.name + "Dirty";

    const newData = {};
    newData[name] = value;

    // 'Dirty' fields are used to indicate whether the submit button should
    // be enabled or not. Since we only enable it when all fields are dirty,
    // check that there is content here, and set 'dirtiness' as appropriate here.
    if (value.length > 0) {
      newData[nameDirty] = true;
    } else {
      newData[nameDirty] = false;
    }

    // Spread 'em! Update state by overwriting changed values
    setFormData({ ...formData, ...newData });
  };

  /**
   * Async function. Sends form data to server and waits for a response.
   * Once the response is obtained, should update page with the server's response.
   * @param {SyntheticEvent} event - Used to override the browser's default 'submit' behavior
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      fullName,
      fullNameDirty,
      email,
      emailDirty,
      messageSubject,
      messageSubjectDirty,
      messageBody,
      messageBodyDirty,
    } = formData;

    if (fullNameDirty && emailDirty && messageSubjectDirty && messageBodyDirty) {
      const formContent = `fullname=${fullName}&email=${email}&subject=${messageSubject}&message=${messageBody}`;

      const response = await fetch(withPrefix("/contact-form"), {
        method: "POST",
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: formContent,
      });
      const data = await response.json();

      submitMSG(data, !response.ok);
    } else {
      const newData = {};
      newData.formSubmissionAttempt = true;
      setFormData({ ...formData, ...newData });
    }
  };

  /**
   * Provides flags needed to reset form fields. Should be used after successful form submissions.
   * @returns {Object} An object containing flags set to their initial state
   */
  const resetForm = () => {
    const newData = {};
    newData.fullName = "";
    newData.fullNameDirty = false;
    newData.email = "";
    newData.emailDirty = false;
    newData.messageSubject = "";
    newData.messageSubjectDirty = false;
    newData.messageBody = "";
    newData.messageBodyDirty = false;
    newData.formSubmissionAttempt = false;
    // Reset only some properties. e.g. showNotification is intentionally skipped.
    // Only clearNotification() should reset that (user action only).
    return newData;
  };

  /**
   * Clears message set by server and resets formSubmissionError
   * and showNotification flags
   */
  const clearNotification = () => {
    const newData = {};
    newData.formMessage = "";
    newData.formSubmissionError = false;
    // The only spot where we should clear this flag, except for initialization
    newData.showNotification = false;
    setFormData({ ...formData, ...newData });
  };

  /**
   * Sets server reply after form submission. Can contain
   * either success or failure message.
   * @param {Response} response - Reply received from server after form submission
   * @param {boolean} error - Indicates if server response was caused by an error
   */
  const submitMSG = (response, error) => {
    const newData = {};
    newData.formSubmissionError = error;
    newData.showNotification = true;
    newData.formMessage = typeof response === "string" ? response : "Something unexpected occured.";

    if (error) {
      setFormData({ ...formData, ...newData });
    } else {
      setFormData({ ...formData, ...newData, ...resetForm() });
    }
  };

  return (
    <div className={`contact-form column is-two-thirds-tablet is-two-fifths-widescreen`}>
      <h1 className={`title is-uppercase has-text-link has-text-centered`}>Get in touch</h1>

      <div
        className={`notification ${
          formData.showNotification ? (formData.formSubmissionError ? "is-danger" : "is-success") : ""
        }`}
      >
        <button className={`delete`} onClick={clearNotification} aria-label="remove notification" />
        {formData.formMessage}
      </div>

      <form data-testid="contact-form" id="contact-form" method="post" onSubmit={handleSubmit}>
        <div className={`field`}>
          {/* <div className={`field-body`}> */}
          <div className={""}>
            <div className={`field`}>
              <div className={`control is-expanded has-icons-left`}>
                <input
                  data-testid="fullName"
                  id="fullName"
                  name="fullName"
                  className={`input`}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  required
                />
                <span className={`icon is-left is-small`}>
                  <FontAwesomeIcon icon={["fas", "user"]} size="1x" transform="down-6 right-12" />
                </span>
              </div>
              <p id="fullNameError" className={`help`}>
                {formData.formSubmissionAttempt && formData.fullNameDirty ? this.props.nameValidationMsg : " "}
              </p>
            </div>
            <div className={`field`}>
              <div className={`control is-expanded has-icons-left`}>
                <input
                  data-testid="email"
                  id="email"
                  name="email"
                  className={`input`}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                />
                <span className={`icon is-left is-small`}>
                  <FontAwesomeIcon icon={["fas", "envelope"]} size="1x" transform="down-6 right-12" />
                </span>
              </div>
              <p id="emailError" className={`help`}>
                {formData.formSubmissionAttempt && formData.emailDirty ? this.props.emailValidationMsg : " "}
              </p>
            </div>
          </div>
        </div>

        <div className={`field`}>
          <div className={`control has-icons-left`}>
            <input
              data-testid="messageSubject"
              id="messageSubject"
              name="messageSubject"
              className={`input`}
              onChange={handleChange}
              type="text"
              placeholder="Subject"
              value={formData.messageSubject}
              required
            />
            <span className={`icon is-left is-small`}>
              <FontAwesomeIcon icon={["fas", "comment-alt-lines"]} size="1x" transform="down-6 right-12" />
            </span>
          </div>
          <p id="messageSubjectError" className="help">
            {formData.formSubmissionAttempt && formData.messageSubjectDirty ? this.props.subjectValidationMsg : " "}
          </p>
        </div>

        <div className={`field`}>
          <div className={`control`}>
            <textarea
              data-testid="messageBody"
              id="messageBody"
              name="messageBody"
              className={`textarea`}
              placeholder="Message"
              rows="10"
              onChange={handleChange}
              value={formData.messageBody}
              required
            />
          </div>
          <p id="messageBodyError" className="help">
            {formData.formSubmissionAttempt && formData.messageBodyDirty ? this.props.bodyValidationMsg : " "}
          </p>
        </div>

        <div className={`field`}>
          <div className={`control`}>
            <button
              data-testid="form-submit"
              id="form-submit"
              className={`button is-link is-outlined is-fullwidth`}
              type="submit"
              disabled={
                !formData.emailDirty ||
                !formData.fullNameDirty ||
                !formData.messageSubjectDirty ||
                !formData.messageBodyDirty
              }
            >
              <FontAwesomeIcon icon={["fas", "paper-plane"]} size="1x" pull="left" />
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  nameValidationMsg: PropTypes.string.isRequired,
  emailValidationMsg: PropTypes.string.isRequired,
  subjectValidationMsg: PropTypes.string.isRequired,
  bodyValidationMsg: PropTypes.string.isRequired,
};

ContactForm.defaultProps = {
  nameValidationMsg: "Please enter your full name",
  emailValidationMsg: "Please enter your email",
  subjectValidationMsg: "Tell us why you're reaching out in the subject.",
  bodyValidationMsg: "Tell us how we can help you here.",
};

export default ContactForm;
