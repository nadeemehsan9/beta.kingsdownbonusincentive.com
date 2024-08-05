import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import UserService from "../../../services/user.service";
import { editRsa } from "../../../schema";

export default function EditRsa() {
  const TITLE = "Kings Down | Edit USER SSN";
  const states = useSelector((states) => states.stateVals);
  const { id: userId } = states;
  const { id, type } = useParams();
  const [ssn_number, setSsn_Number] = useState([]);
  const [emp_number, setEmp_number] = useState([]);
  const [first_name, setFirst_Name] = useState([]);
  const [last_name, setLast_Name] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [created_at, setCreated_at] = useState("");

  const [loading, setLoading] = useState(false);

  const [userState, setUserState] = useState([]);
  const [userCity, setUserCity] = useState([]);
  const [userCityLoader, setUserCityLoader] = useState(false);

  const [disable, setDisable] = useState(false);

  const updateRsa = async (values) => {
    setLoading(true);

    try {
      values["updated_by"] = userId;
      const response = await AdminListService.updateRsaList(id, values);

      setLoading(false);
      toast.success("Record Updated !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        getResultData();
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err?.response?.status === 422) {
        if (err?.response?.data?.ssn?.length) {
          toast.error(err?.response?.data?.ssn[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err?.response?.data?.udf?.length) {
          toast.error(
            `The UDF No ${err?.response?.data?.udf[0]} already exists`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        } else if (err?.response?.data?.email?.length) {
          toast.error(err?.response?.data?.email[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err?.response?.data?.phone?.length) {
          toast.error(err?.response?.data?.phone[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err?.response?.data?.zip?.length) {
          toast.error(err?.response?.data?.zip[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else
          toast.error("Unprocessable Content !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
      } else if (err?.response?.status === 409) {
        toast.error(err.response.data.response, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Some thing went wrong!", {
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
    }
  };

  const getResultData = async () => {
    setLoading(true);
    try {
      const response = await AdminListService.getUserById(id);
      const { data } = response;
      const { response: res } = data;
      // console.log(res.address2);
      if (res.ssn_duplicate == "yes") {
        setSSNerror("SSN already exists");
        setDisable(true);
      }

      setSsn_Number(res.ssn);

      setEmp_number(
        res.emp_number !== "" ? res.emp_number.toUpperCase() : "N/A"
      );
      setFirst_Name(res.first_name);
      setLast_Name(res.last_name);
      setUsername(res.username);
      setPassword(res.password);
      setEmail(res.email);
      setAddress1(res.address1);
      setState(res.state_id);
      setCity(res.city_id);
      setZip(res.zip);
      setPhone(res.phone);
      // {moment(res.created_at).format("MM-DD-YYYY")}
      setCreated_at(moment(res.created_at).format("MM-DD-YYYY"));
      changeUserCity(res.state_id);

      // let resultData;
      // resultData = response.data.response;
      setLoading(false);
    } catch (err) {
      // setTotalPages("1");
      if (err?.response?.status === 404) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    getResultData();

    const getUserState = async () => {
      const { data } = await UserService.getUserState();
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          key: value.name,
          value: value.id,
        });
      });
      setUserState([{ key: "SELECT STATE", value: "" }, ...results]);
    };
    getUserState();
  }, []);

  const changeUserCity = (e) => {
    setUserCity([]);
    setFieldValue("city", "");

    const getUserCity = async () => {
      setUserCityLoader(true);
      const { data } = await UserService.getCityByStateId(e);
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          key: value.city,
          value: value.id,
        });
      });
      setUserCity([...results]);
      setUserCityLoader(false);
    };

    if (e !== "") {
      getUserCity();
    }
  };

  const [ssnerror, setSSNerror] = useState("");

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      ssn_number: ssn_number,
      emp_number: emp_number,
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password,
      email: email,
      address1: address1,
      state: state,
      city: city,
      zip: zip,
      phone: phone,
      created_at: created_at,
      updated_by: userId,
    },
    validationSchema: editRsa,
    onSubmit: (values, action) => {
      updateRsa(values);
    },
  });

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="semi-dark">
        <div className="wrapper">
          <CheckUtype />
          <HeaderSidebar />
          <ToastContainer />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>
                    Edit{" "}
                    {type == "deactive-rsa"
                      ? "deactive rsa"
                      : type == "deactivemanager"
                      ? "deactive manager"
                      : type}{" "}
                  </h2>
                </div>
                <div className="slides-here">
                  <div className="alert alert-info">
                    <strong>Info!</strong> The UDF No contains the last four
                    digits of the SSN, and the first character of both the first
                    and last name. Once SSN has been updated UDF number will be
                    auto generated
                  </div>
                  <div className="row">
                    <Link to={`/admin/view-${type}`} className="btn-back">
                      {" "}
                      Go Back
                    </Link>
                  </div>
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                          <div className="col-lg-6">
                            {/* FIXME SSN */}
                            <label className="form-label">SSN Number:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="SSN Number"
                                className={`form-control ${
                                  errors.ssn_number && touched.ssn_number
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="ssn_number"
                                value={values.ssn_number || ""}
                              />
                              <label>SSN Number</label>
                              {errors.ssn_number && touched.ssn_number ? (
                                <p className="help is-danger">
                                  {errors.ssn_number}
                                </p>
                              ) : null}
                              {ssnerror ? (
                                <p className="help is-danger">{ssnerror}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">UDF No:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="UDF No"
                                className={`form-control ${
                                  errors.emp_number && touched.emp_number
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="emp_number"
                                value={values.emp_number || ""}
                                disabled
                              />
                              <label>UDF No:</label>
                              {/* {errors.udf_no && touched.udf_no ? (
                              <p className="help is-danger">
                                {errors.udf_no}
                              </p>
                            ) : null} */}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">First Name:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="First Name"
                                className={`form-control ${
                                  errors.first_name && touched.first_name
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="first_name"
                                value={values.first_name || ""}
                              />
                              <label>First Name</label>
                              {errors.first_name && touched.first_name ? (
                                <p className="help is-danger">
                                  {errors.first_name}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">Last Name:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Last Name"
                                className={`form-control ${
                                  errors.last_name && touched.last_name
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="last_name"
                                value={values.last_name || ""}
                              />
                              <label>Last Name</label>
                              {errors.last_name && touched.last_name ? (
                                <p className="help is-danger">
                                  {errors.last_name}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">User Name:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="User Name"
                                className={`form-control ${
                                  errors.username && touched.username
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="username"
                                value={values.username || ""}
                                disabled
                              />
                              <label>User Name</label>
                              {/* {errors.username && touched.username ? (
                              <p className="help is-danger">
                                {errors.username}
                              </p>
                            ) : null} */}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">Password:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="password"
                                className={`form-control ${
                                  errors.password && touched.password
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                value={values.password || ""}
                                disabled
                              />
                              <label>Password</label>
                              {/* {errors.password && touched.password ? (
                              <p className="help is-danger">
                                {errors.password}
                              </p>
                            ) : null} */}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Email:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Email"
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                value={values.email || ""}
                              />
                              <label>Email</label>
                              {errors.email && touched.email ? (
                                <p className="help is-danger">{errors.email}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Phone:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Phone"
                                className={`form-control ${
                                  errors.phone && touched.phone
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="phone"
                                value={values.phone || ""}
                              />
                              <label>Phone</label>
                              {errors.phone && touched.phone ? (
                                <p className="help is-danger">{errors.phone}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div
                              className={`form-floating ${
                                errors.state && touched.state ? "is-danger" : ""
                              }`}
                            >
                              <select
                                className="form-select"
                                onChange={(e) => {
                                  handleChange(e);
                                  changeUserCity(e.target.value);
                                }}
                                onBlur={handleBlur}
                                name="state"
                                value={values.state || ""}
                                required
                              >
                                {/* <option value="">SELECT STATE</option> */}
                                {userState.map((res) => {
                                  return (
                                    <option key={res.value} value={res.value}>
                                      {res.key}
                                    </option>
                                  );
                                })}
                              </select>
                              <label>State</label>
                              {errors.state && touched.state ? (
                                <p className="help is-danger">{errors.state}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6">
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
                                  errors.city && touched.city ? "is-danger" : ""
                                }`}
                              >
                                <select
                                  className="form-select"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name="city"
                                  value={values.city || ""}
                                  required
                                >
                                  <option value="">SELECT CITY</option>
                                  {userCity.map((res) => {
                                    return (
                                      <option key={res.value} value={res.value}>
                                        {res.key}
                                      </option>
                                    );
                                  })}
                                </select>
                                <label>City</label>
                                {errors.city && touched.city ? (
                                  <p className="help is-danger">
                                    {errors.city}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">Zip:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Zip Code"
                                className={`form-control ${
                                  errors.zip && touched.zip ? "is-danger" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="zip"
                                value={values.zip || ""}
                              />
                              <label>Zip</label>
                              {errors.zip && touched.zip ? (
                                <p className="help is-danger">{errors.zip}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Address:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Address"
                                className={`form-control ${
                                  errors.address1 && touched.address1
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="address1"
                                value={values.address1 || ""}
                              />
                              <label>Address</label>
                              {errors.address1 && touched.address1 ? (
                                <p className="help is-danger">
                                  {errors.address1}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <label className="form-label">Added On:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Added On"
                                className={`form-control ${
                                  errors.created_at && touched.created_at
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="added On"
                                value={values.created_at || ""}
                                disabled
                              />
                              <label>Added On</label>
                              {/* {errors.add_on && touched.add_on ? (
                              <p className="help is-danger">{errors.add_on}</p>
                            ) : null} */}
                            </div>
                          </div>

                          <div className="col-lg-2">
                            <button
                              type="submit"
                              className="btn btn-primary d-block px-4 mt-30 width-100 back-blue"
                              disabled={disable}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <ToTop />
          <div className={`loader ${loading ? "in" : ""}`}>
            <div className="spinner-border main-spin"></div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
