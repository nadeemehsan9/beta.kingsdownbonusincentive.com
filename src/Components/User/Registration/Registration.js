import React, { useEffect, useState } from "react";
import axios from "axios";
import FootRegister from "./FootRegister";
import HeadRegister from "./HeadRegister";
import { useFormik } from "formik";
import InputField from "../../InputField";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

import { signUpSchema } from "../../../schema/index";

import secureLocalStorage from "react-secure-storage";
import StoreService from "../../../services/store.service";
import UserService from "../../../services/user.service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import ToTop from "../Include/ToTop";
import { Helmet } from "react-helmet";
import ReCAPTCHA from "react-google-recaptcha";
import Select from "react-select";

function Registration() {
  const TITLE = "Kings Down| Register";
  const [retailer, setRetailer] = useState([]);

  const [userState, setUserState] = useState([]);
  const [userCity, setUserCity] = useState([]);

  const [userCityLoader, setUserCityLoader] = useState(false);
  const [errorsCap, setErrorsCap] = useState(null);

  const [errorsCapMsg, setErrorsCapMsg] = useState("");

  const navigate = useNavigate();
  //creating function to load ip address from the API
  const getIp = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");

    const weIp = res.data.ip;
    secureLocalStorage.setItem("ip", weIp);
  };

  useEffect(() => {
    const getRetailerList = async () => {
      const { data } = await StoreService.getRetailers();
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          label: value.name,
          value: value.id,
        });
      });
      setRetailer([...results]);
    };

    getRetailerList();

    const getUserState = async () => {
      const { data } = await UserService.getUserState();
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          label: value.name,
          value: value.id,
        });
      });
      setUserState([...results]);
    };

    getUserState();
  }, []);

  const changeUserCity = (state) => {
    setUserCity([]);

    const getUserCity = async () => {
      setUserCityLoader(true);
      const { data } = await UserService.getCityByStateId(state);
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          label: value.city,
          value: value.id,
        });
      });
      await setUserCity([...results]);
      setUserCityLoader(false);
    };

    if (state !== "") {
      getUserCity();
    }
  };
  function onChange(value) {
    setErrorsCap(value);
    if (value === null) {
      setErrorsCapMsg("Captcha is not verified");
    } else {
      setErrorsCapMsg("");
    }

    // console.log("Captcha value:", value);
  }

  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsModel, setTermsModel] = useState(false);
  const [usererror, setUsererror] = useState("");
  const [emailerror, setEmailerror] = useState("");
  const [ssnerror, setSSNerror] = useState("");

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setErrors,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm_password: "",
      fname: "",
      lname: "",
      email: "",
      zipcode: "",
      signature: "",

      retailer: "",
      stateprov2: "",
      city2: "",
      iAgree: false,
      ssn: "",
      address1: "",
      address2: "",
      phone: "",
      fax: "",
      termsAndConditions: false,
    },
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      if (usererror === "" && emailerror === "" && ssnerror === "") {
        if (errorsCap !== null) {
          setTermsModel(true);
          setErrorsCapMsg("");
        } else {
          setErrorsCapMsg("Captcha is not varified");
        }
      }
    },
  });

  const checkuser = async () => {
    if (values.username !== "") {
      setDisable(true);
      try {
        const response = await UserService.validateUser(values);

        if (response.status === 200) {
          setDisable(false);

          setUsererror("");
        }
      } catch (err) {
        if (err?.response?.status === 409) {
          setDisable(false);
          setUsererror(err.response.data.response);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Some thing went wrong!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    } else {
      setDisable(false);

      setUsererror("");
    }
  };
  const checkemail = async (action) => {
    if (values.email !== "") {
      setDisable(true);
      try {
        const response = await UserService.validateEmail(values);

        if (response.status === 200) {
          setDisable(false);

          setEmailerror("");
        }
      } catch (err) {
        if (err?.response?.status === 409) {
          setDisable(false);
          setEmailerror(err.response.data.response);
        } else {
          setDisable(false);
          Swal.fire({
            title: "Error!",
            text: "Some thing went wrong!",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    } else {
      setDisable(false);

      setEmailerror("");
    }
  };

  const checkSSN = async (e) => {
    // console.log(values.ssn.length);
    if (values.ssn !== "" && values.ssn.length >= 11) {
      setDisable(true);
      try {
        const response = await UserService.validateSSN(values);

        if (response.status === 200) {
          setDisable(false);

          setSSNerror("");
          // register(action);
        }
      } catch (err) {
        if (err?.response?.status === 409) {
          setDisable(false);
          setSSNerror(err.response.data.response);
          // Swal.fire({
          //     title: 'Error!',
          //     text: err.response.data.response,
          //     icon: 'error',
          //     confirmButtonText: 'Change Email'
          //     })
        } else {
          // FIXME
          console.log(err.message);
          setDisable(false);
          // Swal.fire({
          //   title: "Error!",
          //   text: "Some thing went wrong",
          //   icon: "error",
          //   confirmButtonText: "Try Again",
          // });
        }
      }
    } else {
      setDisable(false);

      setSSNerror("");
    }
  };
  const register = async () => {
    setDisable(true);
    setLoading(true);
    try {
      const response = await UserService.validateRegister(values);

      if (response.status === 201) {
        setDisable(false);
        setLoading(false);
        setTermsModel(false);

        toast.success("Registered, Login Now!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
        // action.resetForm();
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.status === 401) {
        setDisable(false);
        setLoading(false);
        setTermsModel(false);

        toast.error("Error, Try Again Later!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.status === 403) {
        setDisable(false);
        setLoading(false);
        setTermsModel(false);
        toast.error("Sorry, you are not allowed to register", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.status === 422) {
        setDisable(false);
        setLoading(false);
        setTermsModel(false);
        let errorData = {};

        errorData["username"] =
          err.response?.data &&
          err.response?.data?.username &&
          err.response?.data?.username[0];
        errorData["password"] =
          err.response?.data &&
          err.response?.data?.password &&
          err.response?.data?.password[0];
        errorData["fname"] =
          err.response?.data &&
          err.response?.data?.first_name &&
          err.response?.data?.first_name[0];
        errorData["lname"] =
          err.response?.data &&
          err.response?.data?.last_name &&
          err.response?.data?.last_name[0];
        errorData["email"] =
          err.response?.data &&
          err.response?.data?.email &&
          err.response?.data?.email[0];
        errorData["stateprov2"] =
          err.response?.data &&
          err.response?.data?.state_id &&
          err.response?.data?.state_id[0];
        errorData["city2"] =
          err.response?.data &&
          err.response?.data?.city_id &&
          err.response?.data?.city_id[0];
        errorData["zipcode"] =
          err.response?.data &&
          err.response?.data?.zip &&
          err.response?.data?.zip[0];
        errorData["signature"] =
          err.response?.data &&
          err.response?.data?.signature &&
          err.response?.data?.signature[0];

        errorData["address1"] =
          err.response?.data &&
          err.response?.data?.address1 &&
          err.response?.data?.address1[0];
        errorData["ssn"] =
          err.response?.data &&
          err.response?.data?.ssn &&
          err.response?.data?.ssn[0];
        errorData["phone"] =
          err.response?.data &&
          err.response?.data?.phone &&
          err.response?.data?.phone[0];

        errorData["retailer"] =
          err.response?.data &&
          err.response?.data?.retailer_id &&
          err.response?.data?.retailer_id[0];

        setErrors(errorData);
        setTimeout(() => {
          const firstError = document.querySelector(".help.is-danger");
          if (firstError) {
            // firstError.scrollIntoView({ behavior: "smooth" });
            const rect = firstError.getBoundingClientRect();
            const offsetTop = rect.top - 200 + window.scrollY;

            window.scrollTo({
              top: offsetTop,
              behavior: "smooth",
            });
          }
        }, 500);

        toast.error("Error, Unprocessable Content!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setDisable(false);
        setLoading(false);
        setTermsModel(false);

        toast.error("Error, Some thing went wrong!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const hideMod = () => {
    setTermsModel(false);
  };

  useEffect(() => {
    getIp();
  }, [handleSubmit]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <ToastContainer />

      {/* <div className="user-panel"> */}
      <div className="pad-bot">
        <ToTop />
        <HeadRegister />
        <section className="slide-up registerSide">
          <div className="container">
            <div className="slides-here">
              <h2 className="slide-heading1">
                <span>REGISTER </span>YOUR ACCOUNT
              </h2>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="Whitebg-box" id="RegisterBox">
                {/* <h2 className="gen-hed">
                  PRIVACY <span>POLICY</span>
                </h2> */}
                {/* <RegisterDetailUp /> */}
                <form onSubmit={handleSubmit} noValidate>
                  <ul className="timeline claim_detail">
                    <li>
                      <div className="prfil-set overflow-visible">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="alert alert-danger" role="alert">
                                <h6 className="astric-req">
                                  Field(s) marked with <span>Asterisk (*)</span>{" "}
                                  are mandatory.
                                </h6>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <h4 className="prf-hed">SELECT RETAILER</h4>
                            </div>
                          </div>

                          <div className="form-filds ">
                            <div className="row">
                              <div className="col-lg-4">
                                <div
                                  className={`form-floating ${
                                    errors.retailer && touched.retailer
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <Select
                                    className={
                                      errors.retailer && touched.retailer
                                        ? "error-select-search"
                                        : ""
                                    }
                                    placeholder={"SELECT RETAILER"}
                                    // placeholder={"* SELECT STATE/PROVINCE"}
                                    options={retailer}
                                    isSearchable={true}
                                    name="retailer"
                                    onChange={(selectedOption) => {
                                      if (selectedOption) {
                                        setFieldValue(
                                          "retailer",
                                          selectedOption.value
                                        );
                                      } else {
                                        setFieldValue("retailer", "");
                                      }
                                    }}
                                    onBlur={() =>
                                      setFieldTouched("retailer", true)
                                    }
                                  />
                                  <label
                                    htmlFor="floatingSelect"
                                    className="with-select"
                                  >
                                    <span>*</span> RETAILER
                                  </label>
                                  {errors.retailer && touched.retailer ? (
                                    <p className="help is-danger">
                                      {errors.retailer}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="prfil-set">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <h4 className="prf-hed">
                                SELECT A USERNAME AND PASSWORD
                              </h4>{" "}
                              <ul className="circle-list">
                                <li className="circle">
                                  Your password must be at least 6 characters
                                  long. For example a uppercase letter, a
                                  lowercase and digits.
                                </li>
                              </ul>
                              <br />
                            </div>
                          </div>

                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.username}
                                  checkUser={checkuser}
                                  touched={touched.username}
                                  values={values.username}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="USERNAME"
                                  spanText="USERNAME"
                                  fieldName="username"
                                  fieldType="text"
                                  required={true}
                                />
                                {usererror ? (
                                  <p className="help is-danger">{usererror}</p>
                                ) : null}
                              </div>
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.password}
                                  touched={touched.password}
                                  values={values.password}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="PASSWORD"
                                  spanText="PASSWORD"
                                  fieldName="password"
                                  fieldType="password"
                                  required={true}
                                />
                              </div>
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.confirm_password}
                                  touched={touched.confirm_password}
                                  values={values.confirm_password}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="RE-TYPE PASSWORD"
                                  spanText="RE-TYPE PASSWORD"
                                  fieldName="confirm_password"
                                  fieldType="password"
                                  required={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="prfil-set overflow-visible">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <h4 className="prf-hed">
                                ENTER PERSONAL INFORMATION
                              </h4>{" "}
                              <ul className="circle-list">
                                <li className="circle">
                                  {" "}
                                  Please note this information will be used for
                                  your 1099 form as well therefore make sure you
                                  enter the right information. You are not
                                  eligible for a card until you enter SSN.
                                </li>

                                {/* <li className="circle">
                                  {" "}
                                  Please note this information will be used for
                                  your 1099 form as well therefore make sure you
                                  enter the right information. You are not
                                  eligibal for a card untill you enter SSN.
                                </li> */}
                                <br />
                                <li className="circle">
                                  {" "}
                                  We only accept residential address, please do
                                  not enter P.O Box Number or commercial
                                  addresses.
                                </li>
                              </ul>
                              <br />
                            </div>
                          </div>

                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.fname}
                                  touched={touched.fname}
                                  values={values.fname}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="FIRST NAME"
                                  spanText="FIRST NAME"
                                  fieldName="fname"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>

                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.lname}
                                  touched={touched.lname}
                                  values={values.lname}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="LAST NAME"
                                  spanText="LAST NAME"
                                  fieldName="lname"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>

                              <div className="col-lg-4">
                                <InputField
                                  mask={"999-99-9999"}
                                  errors={errors.ssn}
                                  touched={touched.ssn}
                                  checkSSN={checkSSN}
                                  values={values.ssn}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="XXX-XX-XXXX"
                                  spanText="SSN"
                                  fieldName="ssn"
                                  fieldType="text"
                                  required={true}
                                  style={{
                                    border: "1px solid black",
                                  }}
                                />
                                {ssnerror ? (
                                  <p className="help is-danger">{ssnerror}</p>
                                ) : null}
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.address1}
                                  touched={touched.address1}
                                  values={values.address1}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="ADDRESS 1"
                                  spanText="ADDRESS 1"
                                  fieldName="address1"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>
                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.address2}
                                  touched={touched.address2}
                                  values={values.address2}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="ADDRESS 2"
                                  spanText="ADDRESS 2"
                                  fieldName="address2"
                                  fieldType="text"
                                  required={false}
                                />
                              </div>
                              <div className="col-lg-4">
                                <div
                                  className={`form-floating ${
                                    errors.stateprov2 && touched.stateprov2
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <Select
                                    className={
                                      errors.stateprov2 && touched.stateprov2
                                        ? "error-select-search"
                                        : ""
                                    }
                                    placeholder={"SELECT STATE"}
                                    options={userState}
                                    isSearchable={true}
                                    name="stateprov2"
                                    onChange={(selectedOption) => {
                                      setFieldValue("city2", "");

                                      if (selectedOption) {
                                        setFieldValue(
                                          "stateprov2",
                                          selectedOption.value
                                        );
                                        changeUserCity(selectedOption.value);
                                      } else {
                                        setFieldValue("stateprov2", "");
                                      }
                                    }}
                                    onBlur={() =>
                                      setFieldTouched("stateprov2", true)
                                    }
                                  />
                                  <label className="with-select">
                                    <span>*</span> STATE
                                  </label>
                                  {errors.stateprov2 && touched.stateprov2 ? (
                                    <p className="help is-danger">
                                      {errors.stateprov2}
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-4">
                                {userCityLoader ? (
                                  <h5 class="card-title placeholder-glow">
                                    <span
                                      class="placeholder col-12"
                                      style={{
                                        height: "58px",
                                        marginTop: "4px",
                                      }}
                                    ></span>
                                  </h5>
                                ) : (
                                  <div
                                    className={`form-floating ${
                                      errors.city2 && touched.city2
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <Select
                                      className={
                                        errors.city2 && touched.city2
                                          ? "error-select-search"
                                          : ""
                                      }
                                      placeholder={"SELECT CITY"}
                                      options={userCity}
                                      isSearchable={true}
                                      name="city2"
                                      onChange={(selectedOption) => {
                                        if (selectedOption) {
                                          setFieldValue(
                                            "city2",
                                            selectedOption.value
                                          );
                                        } else {
                                          setFieldValue("city2", "");
                                        }
                                      }}
                                      onBlur={() =>
                                        setFieldTouched("city2", true)
                                      }
                                    />
                                    <label className="with-select">
                                      <span>*</span> CITY
                                    </label>
                                    {errors.city2 && touched.city2 ? (
                                      <p className="help is-danger">
                                        {errors.city2}
                                      </p>
                                    ) : null}
                                  </div>
                                )}
                              </div>

                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.zipcode}
                                  touched={touched.zipcode}
                                  values={values.zipcode}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="ZIP CODE"
                                  spanText="ZIP CODE"
                                  fieldName="zipcode"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.email}
                                  checkEmail={checkemail}
                                  touched={touched.email}
                                  values={values.email}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="EMAIL"
                                  spanText="EMAIL"
                                  fieldName="email"
                                  fieldType="email"
                                  required={true}
                                />
                                {emailerror ? (
                                  <p className="help is-danger">{emailerror}</p>
                                ) : null}
                              </div>
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.phone}
                                  touched={touched.phone}
                                  values={values.phone}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  // onKeyUp={onlyNumbers}
                                  // onPaste={pasted}
                                  placeholder="PHONE NUMBER"
                                  spanText="PHONE NUMBER"
                                  fieldName="phone"
                                  fieldType="phone"
                                  required={true}
                                />
                              </div>
                              <div className="col-lg-4">
                                <InputField
                                  errors={errors.fax}
                                  touched={touched.fax}
                                  values={values.fax}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="FAX NUMBER"
                                  spanText="FAX NUMBER"
                                  fieldName="fax"
                                  fieldType="text"
                                  // required={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="prfil-set">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <h4 className="prf-hed">
                                DIGITAL SIGNATURE AND AGREEMENT
                              </h4>
                            </div>
                          </div>
                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.signature}
                                  touched={touched.signature}
                                  values={values.signature}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="ELECTRONIC SIGNATURE"
                                  spanText="ELECTRONIC SIGNATURE"
                                  fieldName="signature"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>
                              <div className="col-12">
                                <div className="chek-term">
                                  <input
                                    id="radio-1"
                                    className="radio-custom"
                                    name="iAgree"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="checkbox"
                                  />
                                  <label
                                    htmlFor="radio-1"
                                    className={`radio-custom-label ${
                                      errors.iAgree && touched.iAgree
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    I hereby confirm that the information
                                    provided above is correct and I authorize
                                    Kings Down to use my information.
                                  </label>

                                  {errors.iAgree && touched.iAgree ? (
                                    <p className="help is-danger">
                                      {errors.iAgree}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="chek-term">
                                  <input
                                    id="radio-4"
                                    className="radio-custom"
                                    name="termsAndConditions"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    type="checkbox"
                                  />
                                  <label
                                    htmlFor="radio-4"
                                    className={`radio-custom-label ${
                                      errors.termsAndConditions &&
                                      touched.termsAndConditions
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    By registering for this promotion, I
                                    understand that promotion headquarters will
                                    send me periodic emails related to my
                                    status, participation, and general program
                                    announcements.
                                    <br /> Please see our{" "}
                                    <Link
                                      to="/term-and-conditions"
                                      target="_blank"
                                    >
                                      terms and conditions
                                    </Link>{" "}
                                    and our
                                    <Link
                                      to="/register-statement"
                                      target="_blank"
                                    >
                                      {" "}
                                      privacy policy.
                                    </Link>
                                  </label>

                                  {errors.termsAndConditions &&
                                  touched.termsAndConditions ? (
                                    <p className="help is-danger">
                                      {errors.termsAndConditions}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-12">
                                <ReCAPTCHA
                                  sitekey={
                                    process.env.REACT_APP_API_GOOGLESITEKEY
                                  }
                                  name="captcha"
                                  onChange={onChange}
                                />
                                {errorsCapMsg !== "" ? (
                                  <p className="help is-danger">
                                    {errorsCapMsg}
                                  </p>
                                ) : null}
                              </div>
                              <div className="col-lg-6">
                                <button
                                  type="submit"
                                  className="round-red-btn w-100 mt-3 "
                                  value="REGISTER"
                                  disabled={disable}
                                >
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  REGISTER
                                </button>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="reset"
                                  className="round-red-btn w-100 mt-3 reset-reg"
                                  value="RESET FORM"
                                  onClick={() => window.location.reload(false)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </section>

        <FootRegister />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
      {termsModel ? (
        <>
          <div className="modal fade show d-block" id="exampleModal">
            <div className="modal-dialog  modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    TERMS AND CONDITIONS
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      hideMod();
                    }}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="form-box terms-box ">
                    <h4>Agreement between user and Elite Marketing</h4>
                    <p>
                      Welcome to Elite Marketing. The
                      kingsdownbonusincentive.com website (the "Site") is
                      comprised of various web pages operated by Elite Marketing
                      and is offered to you conditioned on your acceptance
                      without modification of the terms, conditions, and notices
                      contained herein (the "Terms"). Your use of a
                      kingsdownbonusincentive.com constitutes your agreement to
                      all such Terms. Please read these terms carefully, and
                      keep a copy of them for your reference.
                    </p>
                    <p>
                      <a href="/">www.kingsdownbonusincentive.com</a> is a
                      submission site.
                    </p>
                    <h4>Privacy</h4>
                    <p>
                      Your use of kingsdownbonusincentive.com is subject to
                      Elite Marketing's Privacy Policy. Please review our
                      Privacy Policy, which also governs the Site and informs
                      users of our data collection practices.
                    </p>
                    <h4>Electronic Communications</h4>
                    <p>
                      Visiting kingsdownbonusincentive.com or sending emails to
                      Elite Marketing constitutes electronic communications. You
                      consent to receive electronic communications and you agree
                      that all agreements, notices, disclosures and other
                      communications that we provide to you electronically, via
                      email and on the Site, satisfy any legal requirement that
                      such communications be in writing.
                    </p>
                    <h4>Your account</h4>
                    <p>
                      If you use this site, you are responsible for maintaining
                      the confidentiality of your account and password and for
                      restricting access to your computer, and you agree to
                      accept responsibility for all activities that occur under
                      your account or password. You may not assign or otherwise
                      transfer your account to any other person or entity. You
                      acknowledge that Kings Down or Elite Marketing are not
                      responsible for third party access to your account that
                      results from theft or misappropriation of your account.
                      Kings Down or Elite Marketing and its associates reserve
                      the right to refuse or cancel service, terminate accounts,
                      or remove or edit content in our sole discretion.
                    </p>
                    <p>
                      Elite Marketing does not knowingly collect, either online
                      or offline, personal information from persons under the
                      age of thirteen. If you are under 18, you may use
                      kingsdownbonusincentive.com only with permission of a
                      parent or guardian.
                    </p>
                    <h4>No unlawful or prohibited use/Intellectual Property</h4>
                    <p>
                      You are granted a non-exclusive, non-transferable,
                      revocable license to access and use{" "}
                      <a href="/">www.kingsdownbonusincentive.com</a> strictly
                      in accordance with these terms of use. As a condition of
                      your use of the Site, you warrant to Elite Marketing that
                      you will not use the Site for any purpose that is unlawful
                      or prohibited by these Terms. You may not use the Site in
                      any manner which could damage, disable, overburden, or
                      impair the Site or interfere with any other party's use
                      and enjoyment of the Site. You may not obtain or attempt
                      to obtain any materials or information through any means
                      not intentionally made available or provided for through
                      the Site.
                    </p>
                    <p>
                      All content included as part of the Service, such as text,
                      graphics, logos, images, as well as the compilation
                      thereof, and any software used on the Site, is the
                      property of Elite Marketing or its suppliers and protected
                      by copyright and other laws that protect intellectual
                      property and proprietary rights. You agree to observe and
                      abide by all copyright and other proprietary notices,
                      legends or other restrictions contained in any such
                      content and will not make any changes thereto. You will
                      not modify, publish, transmit, reverse engineer,
                      participate in the transfer or sale, create derivative
                      works, or in any way exploit any of the content, in whole
                      or in part, found on the Site.
                      www.kingsdownbonusincentive.com content is not for resale.
                      Your use of the Site does not entitle you to make any
                      unauthorized use of any protected content, and in
                      particular you will not delete or alter any proprietary
                      rights or attribution notices in any content. You will use
                      protected content solely for your personal use, and will
                      make no other use of the content without the express
                      written permission of Elite Marketing and the copyright
                      owner. You agree that you do not acquire any ownership
                      rights in any protected content. We do not grant you any
                      licenses, express or implied, to the intellectual property
                      of Elite Marketing or our licensors except as expressly
                      authorized by these Terms.
                    </p>
                    <h4>International Users</h4>
                    <p>
                      The Service is controlled, operated and administered by
                      Elite Marketing from our offices within the USA. If you
                      access the Service from a location outside the USA, you
                      are responsible for compliance with all local laws. You
                      agree that you will not use the Elite Marketing content
                      accessed through{" "}
                      <Link to="/term-and-conditions">
                        www.kingsdownbonusincentive.com
                      </Link>{" "}
                      in any country or in any manner prohibited by any
                      applicable laws, restrictions or regulations.
                    </p>
                    <h4>Indemnification</h4>
                    <p>
                      You agree to indemnify, defend and hold harmless Elite
                      Marketing, its officers, directors, employees, agents and
                      third parties, for any losses, costs, liabilities and
                      expenses (including reasonable attorney's fees) relating
                      to or arising out of your use of or inability to use the
                      Site or services, any user postings made by you, your
                      violation of any terms of this Agreement or your violation
                      of any rights of a third party, or your violation of any
                      applicable laws, rules or regulations. Elite Marketing
                      reserves the right, at its own cost, to assume the
                      exclusive defense and control of any matter otherwise
                      subject to indemnification by you, in which event you will
                      fully cooperate with Elite Marketing in asserting any
                      available defenses.
                    </p>
                    <p>
                      Arbitration In the event the parties are not able to
                      resolve any dispute between them arising out of or
                      concerning these Terms and Conditions, or any provisions
                      hereof, whether in contract, tort, or otherwise at law or
                      in equity for damages or any other relief, then such
                      dispute shall be resolved only by final and binding
                      arbitration pursuant to the Federal Arbitration Act,
                      conducted by a single neutral arbitrator and administered
                      by the American Arbitration Association, or a similar
                      arbitration service selected by the parties, in a location
                      mutually agreed upon by the parties. The arbitrators award
                      shall be final, and judgment may be entered upon it in any
                      court having jurisdiction. In the event that any legal or
                      equitable action, proceeding or arbitration arises out of
                      or concerns these Terms and Conditions, the prevailing
                      party shall be entitled to recover its costs and
                      reasonable attorney's fees. The parties agree to arbitrate
                      all disputes and claims in regards to these Terms and
                      Conditions or any disputes arising as a result of these
                      Terms and Conditions, whether directly or indirectly,
                      including Tort claims that are a result of these Terms and
                      Conditions. The parties agree that the Federal Arbitration
                      Act governs the interpretation and enforcement of this
                      provision. The entire dispute, including the scope and
                      enforceability of this arbitration provision shall be
                      determined by the Arbitrator. This arbitration provision
                      shall survive the termination of these Terms and
                      Conditions.
                    </p>
                    <p>
                      Class Action Waiver Any arbitration under these Terms and
                      Conditions will take place on an individual basis; class
                      arbitrations and class/representative/collective actions
                      are not permitted. THE PARTIES AGREE THAT A PARTY MAY
                      BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S INDIVIDUAL
                      CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY
                      PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE
                      PROCEEDING, SUCH AS IN THE FORM OF A PRIVATE ATTORNEY
                      GENERAL ACTION AGAINST THE OTHER. Further, unless both you
                      and Employer agree otherwise, the arbitrator may not
                      consolidate more than one person's claims, and may not
                      otherwise preside over any form of a representative or
                      class proceeding.
                    </p>
                    <h4>Liability disclaimer</h4>
                    <p>
                      The information, software, products, and services included
                      in or available through the site may include inaccuracies
                      or typographical errors. Changes are periodically added to
                      the information herein. Elite marketing and/or its
                      suppliers may make improvements and/or changes in the site
                      at any time.
                    </p>
                    <p>
                      Elite marketing and/or its suppliers make no
                      representations about the suitability, reliability,
                      availability, timeliness, and accuracy of the information,
                      software, products, services and related graphics
                      contained on the site for any purpose. To the maximum
                      extent permitted by applicable law, all such information,
                      software, products, services and related graphics are
                      provided "as is" without warranty or condition of any
                      kind. Elite marketing and/or its suppliers hereby disclaim
                      all warranties and conditions with regard to this
                      information, software, products, services and related
                      graphics, including all implied warranties or conditions
                      of merchantability, fitness for a particular purpose,
                      title and noninfringement.
                    </p>
                    <p>
                      To the maximum extent permitted by applicable law, in no
                      event shallelite marketing and/or its suppliers be liable
                      for any direct, indirect, punitive, incidental, special,
                      consequential damages or any damages whatsoever including,
                      without limitation, damages for loss of use, data or
                      profits, arising out of or in any way connected with the
                      use or performance of the site, with the delay or
                      inability to use the site or related services, the
                      provision of or failure to provide services, or for any
                      information, software, products, services and related
                      graphics obtained through the site, or otherwise arising
                      out of the use of the site, whether based on contract,
                      tort, negligence, strict liability or otherwise, even if
                      elite marketing or any of its suppliers has been advised
                      of the possibility of damages. Because some
                      states/jurisdictions do not allow the exclusion or
                      limitation of liability for consequential or incidental
                      damages, the above limitation may not apply to you. If you
                      are dissatisfied with any portion of the site, or with any
                      of these terms of use, your sole and exclusive remedy is
                      to discontinue using the site.
                    </p>
                    <h4>Termination/access restriction</h4>
                    <p>
                      Elite Marketing and Kings Down reserve the right, in its
                      sole discretion, to terminate your access to the Site and
                      the related services or any portion thereof at any time,
                      without notice. To the maximum extent permitted by law,
                      this agreement is governed by applicable state laws and
                      you hereby consent to the exclusive jurisdiction in all
                      disputes arising out of or relating to the use of the
                      Site. Use of the Site is unauthorized in any jurisdiction
                      that does not give effect to all provisions of these
                      Terms, including, without limitation, this section.
                    </p>
                    <p>
                      You agree that no joint venture, partnership, employment,
                      or agency relationship exists between you and Elite
                      Marketing as a result of this agreement or use of the
                      Site. Elite Marketing's performance of this agreement is
                      subject to existing laws and legal process, and nothing
                      contained in this agreement is in derogation of Elite
                      Marketing's right to comply with governmental, court and
                      law enforcement requests or requirements relating to your
                      use of the Site or information provided to or gathered by
                      Elite Marketing with respect to such use. If any part of
                      this agreement is determined to be invalid or
                      unenforceable pursuant to applicable law including, but
                      not limited to, the warranty disclaimers and liability
                      limitations set forth above, then the invalid or
                      unenforceable provision will be deemed superseded by a
                      valid, enforceable provision that most closely matches the
                      intent of the original provision and the remainder of the
                      agreement shall continue in effect.
                    </p>
                    <p>
                      Unless otherwise specified herein, this agreement
                      constitutes the entire agreement between the user and
                      Elite Marketing with respect to the Site and it supersedes
                      all prior or contemporaneous communications and proposals,
                      whether electronic, oral or written, between the user and
                      Elite Marketing with respect to the Site. A printed
                      version of this agreement and of any notice given in
                      electronic form shall be admissible in judicial or
                      administrative proceedings based upon or relating to this
                      agreement to the same extent and subject to the same
                      conditions as other business documents and records
                      originally generated and maintained in printed form. It is
                      the express wish to the parties that this agreement and
                      all related documents be written in English.
                    </p>
                    <h4>Changes to Terms</h4>
                    <p>
                      Elite Marketing reserves the right, in its sole
                      discretion, to change the Terms under which are offered.
                      The most current version of the Terms will supersede all
                      previous versions. Elite Marketing encourages you to
                      periodically review the Terms to stay informed of our
                      updates.
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          type="button"
                          onClick={() => {
                            register();
                          }}
                          className="round-red-btn w-100 mt-3 reset-reg border-0"
                        >
                          I agree with terms and conditions
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          type="button"
                          onClick={() => {
                            hideMod();
                          }}
                          className="round-red-btn w-100 mt-3  border-0"
                          data-bs-dismiss="modal"
                        >
                          I disagree with terms and conditions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      ) : null}
      {/* </div> */}
    </>
  );
}

export default Registration;
