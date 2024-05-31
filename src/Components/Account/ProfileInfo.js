import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import UserService from "../../services/user.service";
import Footer from "../User/Include/Footer";
import Header from "../User/Include/Header";

import InputField from "../InputField";

import { updateUserSchema } from "../schema/index";
import "./ProfileInfo.css";
import secureLocalStorage from "react-secure-storage";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../Redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Select from "react-select";
import StoreService from "../../services/store.service";

function ProfileInfo() {
  const TITLE = "Kings Down | Your Account Settings";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  // const { state, dispatch: ctxDispatch } = useContext(UserContext);

  const state = useSelector((state) => state.stateVals);
  const { accessToken, id } = state;

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");

  const [userState, setUserState] = useState([]);
  const [userCity, setUserCity] = useState([]);
  const [retailer, setRetailer] = useState([]);

  const [userCityLoader, setUserCityLoader] = useState(false);

  const [emailerror, setEmailerror] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const [userSelectedState, setSelectedUserState] = useState("");
  const [userSelectedCity, setSelectedUserCity] = useState("");
  const [retailerId, setRetailerId] = useState("");
  const [retailerText, setRetailerText] = useState("");
  const [userSelectedStateText, setSelectedUserStateText] = useState("");
  const [userSelectedCityText, setSelectedUserCityText] = useState("");

  useEffect(() => {
    const getUserCity = async (val) => {
      setUserCityLoader(true);
      const { data } = await UserService.getCityByStateId(val);
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          label: value.city,
          value: value.id,
        });
      });
      setUserCity([...results]);
      setUserCityLoader(false);
    };
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

    const getProfile = async () => {
      setLoading(true);
      try {
        const response = await UserService.getProfile(accessToken);

        const { status } = response;
        console.log(response);
        console.log(status);
        // if (status == 200) {

        userActions.UpdateProfile({
          accessToken: response.data.access_token,
          id: response.data.id,
          uName: response.data.username,
          uType: response.data.user_type,
          name: response.data.first_name + " " + response.data.last_name,
        });
        setFname(response.data.first_name);
        setLname(response.data.last_name);
        setEmail(response.data.email);
        setZip(response.data.zip);
        setAddress1(response.data.address1);
        setAddress2(response.data.address2);
        setPhone(response.data.phone);
        setFax(response.data.fax);

        setSelectedUserState(response.data.state_id);
        setSelectedUserStateText(response.data.state);
        setRetailerText(response.data.retailer);
        setRetailerId(response.data.retailer_id);
        setSelectedUserCityText(response.data.city);
        setSelectedUserCity(response.data.city_id);
        getUserCity(response.data.state_id);
        setLoading(false);
        // }
      } catch (err) {
        console.log(err);
        // userActions.logOut();

        setLoading(false);
        navigate("/welcome");
      }
    };

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

    getProfile();
    getUserState();
    getRetailerList();
  }, []);

  const changeUserCity = (state) => {
    setUserCity([]);

    const getUserCity = async () => {
      setUserCityLoader(true);
      try {
        const { data } = await UserService.getCityByStateId(state);
        const { response: res } = data;
        const results = [];
        res.map((value) => {
          results.push({
            label: value.city,
            value: value.id,
          });
        });
        setUserCity([...results]);
        setUserCityLoader(false);
      } catch {
        setUserCityLoader(false);
      }
    };

    if (state !== "") {
      getUserCity();
    }
  };

  const UpdateUserData = async (values) => {
    try {
      setLoading(true);
      const response = await UserService.UpdateUserInfo(values, id);
      const { data: res } = response;

      if (response.status === 200) {
        userActions.UpdateName({
          name: res.response.first_name + " " + res.response.last_name,
        });
        // ctxDispatch({
        //   type: "UPDATE_NAME",
        //   name: res.response.first_name + " " + res.response.last_name,
        // });

        setLoading(false);

        toast.success("Your contact information has been updated!", {
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
    } catch (err) {
      if (err?.response?.status === 401) {
        setLoading(false);

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
      } else if (err?.response?.status === 422) {
        setLoading(false);
        let errorData = {};

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

        errorData["address1"] =
          err.response?.data &&
          err.response?.data?.address1 &&
          err.response?.data?.address1[0];

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
        setLoading(false);

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

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    setErrors,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,

    initialValues: {
      fname: fname,
      retailer: retailerId,
      lname: lname,
      email: email,
      address1: address1,
      address2: address2,
      stateprov2: userSelectedState,
      city2: userSelectedCity,
      zipcode: zip,
      phone: phone,
      fax: fax,
    },
    validationSchema: updateUserSchema,
    onSubmit: (values, action) => {
      if (emailerror === "") {
        UpdateUserData(values);
      }
    },
  });

  const checkemail = async (action) => {
    if (values.email !== "") {
      setDisable(true);
      try {
        const response = await UserService.validateProfileEmail(values, id);

        if (response.status === 200) {
          setDisable(false);

          setEmailerror("");
          // register(action);
        }
      } catch (err) {
        if (err?.response?.status === 409) {
          setDisable(true);
          setEmailerror(err.response.data.response);
        } else {
          setDisable(false);
          Swal.fire({
            title: "Error!",
            text: "Some thing went wrong",
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

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");

      const weIp = res.data.IPv4;
      secureLocalStorage.setItem("ip", weIp);
    };
    getIp();
  }, [handleSubmit]);
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="user-panel">
        <section className="main-ban page-heading">
          <div className="container">
            <Header />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <div className="traning-awards">
                  <h1 className="mban-head w-100">YOUR ACCOUNT SETTINGS</h1>
                </div> */}
                <h2 className="gen-hed">
                  YOUR ACCOUNT <span className="slide-heading">SETTINGS</span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="Whitebg-box" id="profileBox">
                <form onSubmit={handleSubmit} noValidate>
                  <ul className="timeline contact-info-profile">
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
                              <div className="col-lg-6">
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
                                    placeholder={
                                      retailerText !== ""
                                        ? retailerText
                                        : "SELECT RETAILER"
                                    }
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
                      <div className="prfil-set overflow-visible">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <h4 className="prf-hed">
                                MY CONTACT INFORMATION
                              </h4>{" "}
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
                                  errors={errors.email}
                                  checkEmail={checkemail}
                                  touched={touched.email}
                                  values={values.email}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="E-MAIL"
                                  spanText="E-MAIL"
                                  fieldName="email"
                                  fieldType="email"
                                  required={true}
                                />
                                {emailerror ? (
                                  <p className="help is-danger">{emailerror}</p>
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
                                  fieldType="address1"
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
                                  fieldType="address2"
                                  // required={true}
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
                                    placeholder={
                                      userSelectedStateText !== ""
                                        ? userSelectedStateText
                                        : "SELECT STATE"
                                    }
                                    options={userState}
                                    isSearchable={true}
                                    name="stateprov2"
                                    onChange={(selectedOption) => {
                                      setFieldValue("city2", "");
                                      setSelectedUserCityText("");

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
                                      placeholder={
                                        userSelectedCityText !== ""
                                          ? userSelectedCityText
                                          : "SELECT CITY"
                                      }
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
                              {/* <div className="col-lg-4">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.stateprov2 && touched.stateprov2
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        changeUserCity(e);
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="stateprov2"
                                      value={values.stateprov2 || ""}
                                      required
                                    >
                                      {userState.map((res) => {
                                        return (
                                          <option
                                            key={res.value}
                                            value={res.value}
                                          >
                                            {res.label}
                                          </option>
                                        );
                                      })}
                                    </select>
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
                              </div>

                              <div className="col-lg-4">
                                <div className="select-leading">
                                  {userCityLoader ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  ) : null}
                                  <div
                                    className={`form-floating ${
                                      errors.city2 && touched.city2
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name="city2"
                                      value={values.city2 || ""}
                                      required
                                    >
                                      <option value="">SELECT CITY</option>
                                      {userCity.map((res) => {
                                        return (
                                          <option
                                            key={res.value}
                                            value={res.value}
                                          >
                                            {res.label}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <label>
                                      <span>*</span> CITY
                                    </label>
                                    {errors.city2 && touched.city2 ? (
                                      <p className="help is-danger">
                                        {errors.city2}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div> */}
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
                                  errors={errors.phone}
                                  touched={touched.phone}
                                  values={values.phone}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="PHONE"
                                  spanText="PHONE"
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
                                  placeholder="FAX NO"
                                  spanText="FAX NO"
                                  fieldName="fax"
                                  fieldType="fax"
                                  required={false}
                                />
                              </div>

                              <div className="col-lg-6">
                                <button
                                  type="submit"
                                  className="round-red-btn w-100 mt-3 "
                                  value="UPDATE"
                                  disabled={disable}
                                >
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  UPDATE
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

        <Footer />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
        {/* <SeeAttachment /> */}
      </div>
    </>
  );
}

export default ProfileInfo;
