import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { changePassword } from "../../schema/index";

import UserService from "../../../services/user.service";
import Swal from "sweetalert2";
import axios from "axios";

import secureLocalStorage from "react-secure-storage";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";

import { ToastContainer } from "react-toastify";

// TODO
function AdminChangePass() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.stateVals);
  const { forgotToken } = state;

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        confirm_password: "",
      },
      validationSchema: changePassword,
      onSubmit: (values, action) => {
        passChange(action);
      },
    });

  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");

    const weIp = res.data.IPv4;
    secureLocalStorage.setItem("ip", weIp);
  };

  const passChange = async (action) => {
    setLoading(true);
    try {
      const response = await UserService.changePass(values, forgotToken);

      if (response.status === 200) {
        setLoading(false);

        userActions.removeForgot();
        action.resetForm();
        Swal.fire({
          title: "Success!",
          text: "Password Change Successful",
          icon: "success",
          confirmButtonText: "Login Now",
        });

        navigate("/admin");
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err.response,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Some thing went wrong",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
  };

  useEffect(() => {
    getIp();
  }, [handleSubmit]);
  return (
    <>
      <div className="login-admin-1">
        <ToastContainer />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="text-center">
                <Link to="/">
                  <img src="/images/logo.png" className="logo" alt="" />
                </Link>
              </div>
              <div className="content-login">
                <div className="black-box">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="prf-hed" style={{ color: "#70b0c1" }}>
                          UPDATE YOUR PASSWORD
                        </h4>
                      </div>

                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.password && touched.password
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            value={values.password || ""}
                            required
                          />
                          {errors.password && touched.password ? (
                            <p className="help is-danger">{errors.password}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.confirm_password && touched.confirm_password
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirm_password"
                            value={values.confirm_password || ""}
                            required
                          />
                          {errors.confirm_password &&
                          touched.confirm_password ? (
                            <p className="help is-danger">
                              {errors.confirm_password}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <button type="submit" className="change-pass ms-0">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="copyright">
                © Copyrights {new Date().getFullYear()} all rights reserved by
                Kings Down Bonus Incentive.
              </p>
            </div>
          </div>
        </div>

        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
    </>
  );
}

export default AdminChangePass;
