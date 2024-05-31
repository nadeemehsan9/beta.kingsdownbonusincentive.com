import React, { useState } from "react";
import { useFormik } from "formik";
import "./Contact.css";
import Footer from "../User/Include/Footer";
import Header from "../User/Include/Header";
// import SeeAttachment from "../User/Include/SeeAttachment";
import secureLocalStorage from "react-secure-storage";
import InputField from "../InputField";
import { toast, ToastContainer } from "react-toastify";
import { contactSchema } from "../schema/index";
import UserService from "../../services/user.service";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";
// TODO display errors from api against every field via state object like SYC
function Contact() {
  const TITLE = "Kings Down | Contact Us";
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorsCapMsg, setErrorsCapMsg] = useState("");
  const [errorsCap, setErrorsCap] = useState(null);

  function onChange(value) {
    setErrorsCap(value);
    if (value === null) {
      setErrorsCapMsg("Captcha is not verified");
    } else {
      setErrorsCapMsg("");
    }

    // console.log("Captcha value:", value);
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        subject: subject,
        name: name,
        phone: phone,
        email: email,
        contactback: contact,
        question: question,
        // subject: "test",
        // name: "test",
        // phone: "123456789",
        // email: "altonalvin9@gmail.com",
        // contactback: "By phone, ASAP!",
        // question: "test",
      },
      validationSchema: contactSchema,
      onSubmit: (values, action) => {
        // console.log(values);
        if (errorsCap !== null) {
          submitContact(values, action);
          action.resetForm();
          setErrorsCapMsg("");
        } else {
          setErrorsCapMsg("Captcha is not verified");
        }
      },
    });

  // FIXME
  const submitContact = async (values, action) => {
    setLoading(true);
    try {
      const result = await UserService.contact(values);
      const { response } = result.data;
      action.resetForm();
      toast.success(response, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // action.resetForm();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);

      toast.error("Something went wrong, try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const verifyCallback = (response) => {
    let errorsCap = {};
    if (response) {
    } else {
      return false;
    }
  };

  const onLoadRecaptcha = () => {};
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="user-panel">
        <ToastContainer />

        <section className="main-ban page-heading">
          <div className="container">
            <Header />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <div className="traning-awards">
                  <h1 className="mban-head w-100">CONTACT US</h1>
                </div> */}
                <h2 className="gen-hed">
                  CONTACT <span className="slide-heading">US</span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="Whitebg-box" id="profileBox"></div>

              <div className="col-md-12">
                {/* <h2 className="gen-hed">
                  CONTACT <span>US</span>
                </h2> */}
                <div className="content-area">
                  <div className="container">
                    <div className="bluebg-box" id="CotactBox">
                      <p className="marg-btm">
                        Questions, comments, concerns, suggestions ... if it's
                        on your mind, we want to hear from you!
                      </p>
                      <h2>Award Headquarters</h2>
                    </div>
                    <div className="row">
                      <form action="" onSubmit={handleSubmit} noValidate>
                        <ul className="timelinee" id="contactDesign">
                          <li>
                            <div className="store-area">
                              <div className="form-box">
                                <div className="row">
                                  <div className="ContactWhitebg-box">
                                    <div className="col-lg-12">
                                      {/* <h2>What we can do for you?</h2> */}
                                    </div>
                                  </div>
                                  <div className="form-filds">
                                    <div className="row">
                                      <h4 className="prf-hed">
                                        What we can do for you?
                                      </h4>
                                      <div className="col-lg-4">
                                        <div
                                          className={`form-floating ${
                                            errors.subject && touched.subject
                                              ? "is-danger"
                                              : ""
                                          }`}
                                        >
                                          <InputField
                                            errors={errors.subject}
                                            touched={touched.subject}
                                            values={values.subject}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            placeholder="SUBJECT"
                                            spanText="SUBJECT"
                                            fieldName="subject"
                                            fieldType="text"
                                            required={true}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <InputField
                                          errors={errors.name}
                                          touched={touched.name}
                                          values={values.name}
                                          handleChange={handleChange}
                                          handleBlur={handleBlur}
                                          placeholder="NAME"
                                          spanText="NAME"
                                          fieldName="name"
                                          fieldType="text"
                                          required={true}
                                        />
                                      </div>

                                      <div className="col-lg-4">
                                        <InputField
                                          errors={errors.phone}
                                          touched={touched.phone}
                                          values={values.phone}
                                          handleChange={handleChange}
                                          handleBlur={handleBlur}
                                          placeholder="PHONE NUMBER"
                                          spanText="PHONE NUMBER"
                                          fieldName="phone"
                                          fieldType="text"
                                          required={true}
                                        />
                                      </div>

                                      <div className="col-lg-4">
                                        <InputField
                                          errors={errors.email}
                                          touched={touched.email}
                                          // checkEmail={checkemail}
                                          values={values.email}
                                          handleChange={handleChange}
                                          handleBlur={handleBlur}
                                          placeholder="EMAIL"
                                          spanText="EMAIL"
                                          fieldName="email"
                                          fieldType="text"
                                          required={true}
                                        />
                                      </div>

                                      <div className="col-lg-4">
                                        <div className="select-leading">
                                          <div
                                            className={`form-floating ${
                                              errors.contactback &&
                                              touched.contactback
                                                ? "is-danger"
                                                : ""
                                            }`}
                                          >
                                            <select
                                              className="form-select"
                                              onChange={(e) => {
                                                handleChange(e);
                                              }}
                                              onBlur={handleBlur}
                                              name="contactback"
                                              value={values.contactback || ""}
                                              required
                                            >
                                              {/* {userState.map((res) => {
                                              return (
                                                <option key={res.value} value={res.value}>
                                                  {res.key}
                                                </option>
                                              );
                                            })} */}
                                              <option value="">
                                                {" "}
                                                SELECT CONTACT ME{" "}
                                              </option>
                                              <option value="By phone, ASAP!">
                                                By phone, ASAP!
                                              </option>
                                              <option value="By phone, morning EST">
                                                By phone, morning EST
                                              </option>
                                              <option value="By phone, afternoon EST">
                                                By phone, afternoon EST
                                              </option>
                                              <option value="By phone, evening EST">
                                                By phone, evening EST
                                              </option>
                                              <option value="By email only!">
                                                By email only!
                                              </option>
                                            </select>
                                            <label>
                                              <span>*</span> CONTACT ME
                                            </label>
                                            {errors.contactback &&
                                            touched.contactback ? (
                                              <p className="help is-danger">
                                                {errors.contactback}
                                              </p>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-12">
                                        <InputField
                                          errors={errors.question}
                                          touched={touched.question}
                                          values={values.question}
                                          handleChange={handleChange}
                                          handleBlur={handleBlur}
                                          placeholder="QUESTION"
                                          spanText="QUESTION"
                                          fieldName="question"
                                          fieldType="text"
                                          required={true}
                                        />
                                      </div>
                                      <div className="col-12">
                                        <ReCAPTCHA
                                          sitekey={
                                            process.env
                                              .REACT_APP_API_GOOGLESITEKEY
                                          }
                                          onloadCallback={onLoadRecaptcha}
                                          verifyCallback={verifyCallback}
                                          name="captcha"
                                          onChange={onChange}
                                        />
                                        {errorsCapMsg !== "" ? (
                                          <p className="help is-danger">
                                            {errorsCapMsg}
                                          </p>
                                        ) : null}
                                      </div>
                                      <div className="col-md-4 col-md-offset-8">
                                        <input
                                          type="submit"
                                          name="submit"
                                          value="SUBMIT REQUEST"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li></li>
                        </ul>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
        {/* <SeeAttachment /> */}
      </div>
    </>
  );
}

export default Contact;
