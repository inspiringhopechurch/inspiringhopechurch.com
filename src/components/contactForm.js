import React from "react";
//import axios from "axios";
import { withPrefix } from "gatsby";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contactForm.sass";

export default class ContactForm extends React.Component {
  state = {
    fullName: "",
    fullNameDirty: false,
    email: "",
    emailDirty: false,
    messageSubject: "",
    messageSubjectDirty: false,
    messageBody: "",
    messageBodyDirty: false,
    formSubmittedError: false,
    formSubmittedSuccess: false,
    formSubmissionAttempt: false,
    showNotification: false,
    formMessage: "",
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const nameDirty = target.name + "Dirty";

    if (value.length > 0) {
      // Set input values
      this.setState({
        [name]: value,
        [nameDirty]: true,
      });
    } else {
      this.setState({
        [name]: value,
        [nameDirty]: false,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const formSuccess = this.formSuccess,
      formError = this.formError,
      resetForm = this.resetForm,
      submitMSG = this.submitMSG;

    const {
      fullName,
      fullNameDirty,
      email,
      emailDirty,
      messageSubject,
      messageSubjectDirty,
      messageBody,
      messageBodyDirty,
    } = this.state;
    if (fullNameDirty && emailDirty && messageSubjectDirty && messageBodyDirty) {
      const formData = `fullname=${fullName}&email=${email}&subject=${messageSubject}&message=${messageBody}`;

      // send data to API endpoint
      // axios
      // .post("/contact-us", {
      //   fullname: fullName,
      //   email: email,
      //   subject: messageSubject,
      //   message: messageBody,
      // })
      fetch(withPrefix("/contact-us"), {
        method: "POST",
        headers: {
          accept: "application/json",
          "accept-language": "en_US",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: formData,
      })
        .then(function(response) {
          // Set message from server
          response.json().then((data) => {
            submitMSG(data);
          });
          return response;
        })
        .then(function(response) {
          // Reject Promise if error exists
          if (!response.ok) {
            throw Error(response);
          }
          return response;
        })
        .then(function(response) {
          // Reset form if successful
          formSuccess();
          resetForm();
        })
        .catch(function(error) {
          // Or set error states
          formError();
        });
    } else {
      this.setState({
        formSubmissionAttempt: true,
      });
    }
  };

  resetForm = () => {
    this.setState({
      fullName: "",
      fullNameDirty: false,
      email: "",
      emailDirty: false,
      messageSubject: "",
      messageSubjectDirty: false,
      messageBody: "",
      messageBodyDirty: false,
      formSubmissionAttempt: false,
    });
  };

  formSuccess = () => {
    this.setState({
      formSubmittedSuccess: true,
      formSubmittedError: false,
      showNotification: true,
    });
  };

  formError = () => {
    this.setState({
      formSubmittedError: true,
      formSubmittedSuccess: false,
      showNotification: true,
    });
  };

  submitMSG = (response) => {
    if (typeof response === "string") {
      this.setState({
        formMessage: response,
      });
    } else {
      response.json().then((data) => {
        this.setState({
          formMessage: "",
        });
      });
    }
  };

  clearNotification = () => {
    this.setState({
      formMessage: "",
      showNotification: false,
      formSubmittedSuccess: false,
      formSubmittedError: false,
    });
  };

  render() {
    const {
        fullName,
        fullNameDirty,
        email,
        emailDirty,
        messageSubject,
        messageSubjectDirty,
        messageBody,
        messageBodyDirty,
        formSubmittedError,
        formSubmittedSuccess,
        formSubmissionAttempt,
        formMessage,
      } = this.state,
      props = this.props;

    let notificationStyles = "notification";

    if (formSubmittedError) {
      notificationStyles = "notification is-link";
    }

    if (formSubmittedSuccess) {
      notificationStyles = "notification is-success";
    }

    return (
      <div className={`contact-form column is-two-thirds-tablet is-two-fifths-widescreen`}>
        <h1 className={`title is-uppercase has-text-link has-text-centered`}>Get in touch</h1>

        <div className={notificationStyles}>
          <button className={`delete`} onClick={this.clearNotification} aria-label="clear notification" />
          {formMessage}
        </div>

        <form data-testid="contact-form" id="contact-form" method="post" onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    required
                  />
                  <span className={`icon is-left is-small`}>
                    <FontAwesomeIcon icon={["fas", "user"]} size="1x" transform="down-6 right-12" />
                  </span>
                </div>
                <p id="fullNameError" className={`help`}>
                  {formSubmissionAttempt && fullNameDirty ? props.nameValidationMsg : " "}
                </p>
              </div>
              <div className={`field`}>
                <div className={`control is-expanded has-icons-left`}>
                  <input
                    data-testid="email"
                    id="email"
                    name="email"
                    className={`input`}
                    onChange={this.handleChange}
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                  />
                  <span className={`icon is-left is-small`}>
                    <FontAwesomeIcon icon={["fas", "envelope"]} size="1x" transform="down-6 right-12" />
                  </span>
                </div>
                <p id="emailError" className={`help`}>
                  {formSubmissionAttempt && emailDirty ? props.emailValidationMsg : " "}
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
                onChange={this.handleChange}
                type="text"
                placeholder="Subject"
                value={messageSubject}
                required
              />
              <span className={`icon is-left is-small`}>
                <FontAwesomeIcon icon={["fas", "comment-alt-lines"]} size="1x" transform="down-6 right-12" />
              </span>
            </div>
            <p id="messageSubjectError" className="help">
              {formSubmissionAttempt && messageSubjectDirty ? props.subjectValidationMsg : " "}
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
                onChange={this.handleChange}
                value={messageBody}
                required
              />
            </div>
            <p id="messageBodyError" className="help">
              {formSubmissionAttempt && messageBodyDirty ? props.bodyValidationMsg : " "}
            </p>
          </div>

          <div className={`field`}>
            <div className={`control`}>
              <button
                data-testid="form-submit"
                id="form-submit"
                className={`button is-link is-outlined is-fullwidth`}
                type="submit"
                disabled={!emailDirty || !fullNameDirty || !messageSubjectDirty || !messageBodyDirty}
              >
                <FontAwesomeIcon icon={["fas", "paper-plane"]} size="1x" pull="left" />
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  nameValidationMsg: PropTypes.string.isRequired,
  emailValidationMsg: PropTypes.string.isRequired,
  subjectValidationMsg: PropTypes.string.isRequired,
  bodyValidationMsg: PropTypes.string.isRequired,
};

ContactForm.defaultProps = {
  nameValidationMsg: "Please enter your full name",
  emailValidationMsg: "Please enter your email",
  subjectValidationMsg: "Need a quote? Want to meet? Let us know in the subject.",
  bodyValidationMsg: "Tell us how we can be of service to you",
};
