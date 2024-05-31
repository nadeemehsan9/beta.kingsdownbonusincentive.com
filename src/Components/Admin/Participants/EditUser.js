import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import UserService from "../../../services/user.service";

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
  const [created_at, setCreated_at] = useState("");

  const [loading, setLoading] = useState(false);

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const checkSSN = async (e) => {
    // console.log(values.ssn_number.length);
    if (values.ssn_number !== "" && values.ssn_number.length >= 11) {
      values["id"] = userId;
      // setDisable(true);
      try {
        const response = await UserService.validateSSNAdmin(values);

        // if (response.status === 200) {
        setDisable(false);
        setSSNerror("");
        // register(action);
        // }
      } catch (err) {
        if (err?.response?.status === 409) {
          setDisable(true);
          setSSNerror(err.response.data.response);
        } else {
          // FIXME
          console.log(err.message);
          setDisable(false);
        }
      }
    } else {
      setDisable(false);

      setSSNerror("");
    }
  };
  const updateRsa = async (values) => {
    setLoading(true);

    try {
      values["updated_by"] = userId;
      const response = await AdminListService.updateRsaList(id, values);

      if (response.status === 200) {
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
      }
    } catch (err) {
      setLoading(false);
      if (err?.response?.status === 422) {
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

  useLayoutEffect(() => {
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
        setState(res.state !== "" ? res.state.toUpperCase() : "N/A");
        setCity(res.city !== "" ? res.city.toUpperCase() : "N/A");
        setZip(res.zip);
        // {moment(res.created_at).format("MM-DD-YYYY")}
        setCreated_at(moment(res.created_at).format("MM-DD-YYYY"));

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
    getResultData();
  }, []);
  // const [disable, setDisable] = useState(false);
  const [usererror, setUsererror] = useState("");
  const [ssnerror, setSSNerror] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
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
        created_at: created_at,
        updated_by: userId,
      },
      // validationSchema: addStore,
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
                    SSN
                  </h2>
                </div>
                <div className="slides-here">
                  <div className="alert alert-info">
                    <strong>Info!</strong> Once SSN has been updated UDF number
                    will be auto generated
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
                                onKeyUp={checkSSN}
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
                                disabled
                              />
                              <label>First Name</label>
                              {/* {errors.first_name && touched.first_name ? (
                              <p className="help is-danger">
                                {errors.first_name}
                              </p>
                            ) : null} */}
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
                                disabled
                              />
                              <label>Last Name</label>
                              {/* {errors.last_name && touched.last_name ? (
                              <p className="help is-danger">
                                {errors.last_name}
                              </p>
                            ) : null} */}
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
                                disabled
                              />
                              <label>Email</label>
                              {/* {errors.email && touched.email ? (
                              <p className="help is-danger">{errors.email}</p>
                            ) : null} */}
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
                                disabled
                              />
                              <label>Address</label>
                              {/* {errors.address1 && touched.address1 ? (
                              <p className="help is-danger">{errors.address1}</p>
                            ) : null} */}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">State:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="State"
                                className={`form-control ${
                                  errors.state && touched.state
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="state"
                                value={values.state || ""}
                                disabled
                              />
                              <label>State</label>
                              {/* {errors.state && touched.state ? (
                              <p className="help is-danger">{errors.state}</p>
                            ) : null} */}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">City:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="City"
                                className={`form-control ${
                                  errors.city && touched.city ? "is-danger" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="city"
                                value={values.city || ""}
                                disabled
                              />
                              <label>City</label>
                              {/* {errors.city && touched.city ? (
                              <p className="help is-danger">{errors.city}</p>
                            ) : null} */}
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
                                disabled
                              />
                              <label>Zip</label>
                              {/* {errors.zip && touched.zip ? (
                              <p className="help is-danger">{errors.zip}</p>
                            ) : null} */}
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
          {/* <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div> */}
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
