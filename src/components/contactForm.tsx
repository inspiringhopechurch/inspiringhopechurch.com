import React, { useState } from "react";
import { withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FancyHeading } from "../components";
import "./contactForm.sass";

/**
 * Renders a contact form and with a title and submission button
 * @param {object} props - information used to render this form
 */
const ContactForm = ({
  formTitle = "Get in touch",
  submitButtonTitle = "Send Message",
  nameValidationMsg = "Please enter your full name",
  emailValidationMsg = "Please enter your email",
  subjectValidationMsg = "Tell us why you're reaching out.",
  bodyValidationMsg = "Tell us how we can help you."
}: ContactFormProps) => {
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
    formMessage: ""
  });

  type TFormData = typeof formData
  type TFormDataKeys = keyof Omit<typeof formData, `${string}Dirty` | `form${string}` | "showNotification">

  /**
   * Handles changes to the form's inputs. Should be passed to an input's
   * onChange prop.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - Provides the value for the input being changed
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    //! Changing the user's actual (typed) input here. It's possible this is undesirable.
    //! But instead of doing it silently in the background, I want to hear about
    //! any issues that may arise from doing this. So we let the users see it too.
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    const name = target.name as TFormDataKeys;
    const nameDirty = target.name + "Dirty" as Extract<keyof typeof formData, `${string}Dirty`>;

    const newData = {} as Partial<TFormData>;
    newData[name] = typeof value === 'string' ? value : String(value);

    // 'Dirty' fields are used to indicate whether the submit button should
    // be enabled or not. Since we only enable submitting when all fields are dirty,
    // check that there is content here, and set 'dirtiness' as appropriate here.
    if (value) {
      // if user only passed in a space (' ') to get around the disabled submit button,
      // we never get here.
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
   * @param {React.SyntheticEvent<HTMLFormElement>} event - Used to override the browser's default 'submit' behavior
   */
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      fullName,
      fullNameDirty,
      email,
      emailDirty,
      messageSubject,
      messageSubjectDirty,
      messageBody,
      messageBodyDirty
    } = formData;

    if (
      fullNameDirty &&
      emailDirty &&
      messageSubjectDirty &&
      messageBodyDirty
    ) {
      const formContent = `fullname=${fullName}&email=${email.trim()}&subject=${messageSubject}&message=${messageBody}`;

      const response = await fetch(withPrefix("/contact-form"), {
        method: "POST",
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/x-www-form-urlencoded"
        },
        body: formContent
      });
      const contentType = response.headers.get('content-type')
      const data = contentType?.includes('text/plain') ?
        await response.text() : await response.json();

      submitMSG(data, !response.ok);
    } else {
      const newData = {} as Partial<TFormData>;
      newData.formSubmissionAttempt = true;
      setFormData({ ...formData, ...newData });
    }
  };

  /**
   * Provides flags needed to reset form fields. Should be used after successful form submissions.
   * @returns {{
   * fullName: string, fullNameDirty: boolean,
   * email: string, emailDirty: boolean,
   * messageSubject: string, messageSubjectDirty: boolean,
   * messageBody: string, messageBodyDirty: boolean,
   * formSubmissionAttempt: boolean
   * }} An object containing flags set to their initial state
   */
  const resetForm = () => {
    const newData = {} as Partial<TFormData>;
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
    const newData = {} as Partial<TFormData>;
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
  const submitMSG = (response: Response, error: boolean) => {
    const newData = {} as Partial<TFormData>;
    newData.formSubmissionError = error;
    newData.showNotification = true;
    newData.formMessage =
      typeof response === "string" ? response : "Something unexpected occured.";

    if (error) {
      setFormData({ ...formData, ...newData });
    } else {
      setFormData({ ...formData, ...newData, ...resetForm() });
    }
  };

  return (
    <div className={`contact-form content`}>
      <FancyHeading className="has-text-centered" heading={formTitle} />

      <div
        className={`notification ${formData.showNotification ? (formData.formSubmissionError ? "is-danger" : "is-success") : ""
          }`}
      >
        <button
          className={`delete`}
          onClick={clearNotification}
          aria-label="remove notification"
        />
        {formData.formMessage}
      </div>

      <form
        data-testid="contact-form"
        id="contact-form"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className={`field`}>
          {/* <div className={`field-body`}> */}
          <div className={""}>
            <div className={`field`}>
              <label className="label" htmlFor="fullName">Name</label>
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
                  <FontAwesomeIcon
                    icon={["fas", "user"]}
                    size="1x"
                  />
                </span>
              </div>
              <p id="fullNameError" className={`help`}>
                {formData.formSubmissionAttempt && formData.fullNameDirty ? nameValidationMsg : " "}
              </p>
            </div>
            <div className={`field`}>
              <label className="label" htmlFor="email">Email</label>
              <div className={`control is-expanded has-icons-left`}>
                <input
                  data-testid="email"
                  id="email"
                  name="email"
                  className={`input`}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  required
                />
                <span className={`icon is-left is-small`}>
                  <FontAwesomeIcon
                    icon={["fas", "envelope"]}
                    size="1x"
                  />
                </span>
              </div>
              <p id="emailError" className={`help`}>
                {formData.formSubmissionAttempt && formData.emailDirty ? emailValidationMsg : " "}
              </p>
            </div>
          </div>
        </div>

        <div className={`field`}>
          <label className="label" htmlFor="messageSubject">Subject</label>
          <div className={`control has-icons-left`}>
            <input
              data-testid="messageSubject"
              id="messageSubject"
              name="messageSubject"
              className={`input`}
              onChange={handleChange}
              type="text"
              placeholder="Email Subject Line"
              value={formData.messageSubject}
              required
            />
            <span className={`icon is-left is-small`}>
              <FontAwesomeIcon
                icon={["fas", "comment-alt"]}
                size="1x"
              />
            </span>
          </div>
          <p id="messageSubjectError" className="help">
            {formData.formSubmissionAttempt && formData.messageSubjectDirty ? subjectValidationMsg : " "}
          </p>
        </div>

        <div className={`field`}>
          <label className="label" htmlFor="messageBody">Message</label>
          <div className={`control`}>
            <textarea
              data-testid="messageBody"
              id="messageBody"
              name="messageBody"
              className={`textarea`}
              placeholder="Send us your message here."
              rows={10}
              onChange={handleChange}
              value={formData.messageBody}
              required
            />
          </div>
          <p id="messageBodyError" className="help">
            {formData.formSubmissionAttempt && formData.messageBodyDirty ? bodyValidationMsg : " "}
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
              <span className="icon">
                <FontAwesomeIcon
                  icon={["fas", "paper-plane"]}
                  size="1x"
                  pull="left"
                />
              </span>
              <span>{submitButtonTitle}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

type ContactFormProps = {
  formTitle?: string,
  submitButtonTitle?: string,
  nameValidationMsg?: string,
  emailValidationMsg?: string,
  subjectValidationMsg?: string,
  bodyValidationMsg?: string
};

export default ContactForm;
