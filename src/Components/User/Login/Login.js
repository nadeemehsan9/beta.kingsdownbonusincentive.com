import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import { useFormik } from "formik";
import { signImSchema } from "../../../schema";
import UserService from "../../../services/user.service";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";

import { Helmet } from "react-helmet";
export default function Login() {
  const TITLE = "Kings Down| User Login";

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const login = async (values) => {
    setLoading(true);
    try {
      const response = await UserService.login(values);

      if (response.status === 200) {
        if (
          response.data.user.user_type !== "admin" &&
          response.data.user.user_type !== "dos" &&
          response.data.user.user_type !== "ndos"
        ) {
          userActions.logIn({
            accessToken: response.data.access_token,
            id: response.data.user.id,
            uName: response.data.user.username,
            uType: response.data.user.user_type,
            name:
              response.data.user.first_name +
              " " +
              response.data.user.last_name,
          });

          navigate("/welcome", { replace: true });
          setLoading(false);
        } else {
          toast.error("Username or Password is invalid !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }

        // console.log(response.data.access_token);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        setLoading(false);
        toast.error("Username or Password is invalid !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.status === 403) {
        setLoading(false);
        toast.error(err.response.data.error, {
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
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: signImSchema,
      onSubmit: (values, action) => {
        login(values);
      },
    });

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="login-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4 center-it">
              <Link to="/" className="logo-img">
                <img src="images/logo.png" className="logo" alt="" />
              </Link>
              <div className="content-login">
                <div className="black-box">
                  <form action="" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.name && touched.name ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <img src="images/user.png" alt="" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name"
                            value={values.name || ""}
                            required
                          />
                          {errors.name && touched.name ? (
                            <p className="help is-danger">{errors.name}</p>
                          ) : null}
                        </div>
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
                            <img src="images/padlock.png" alt="" />
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
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
                      <div className="col-lf">
                        <input type="submit" value="Login" />
                      </div>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12">
                      <ul>
                        <li>
                          <span>
                            If you haven't registered for this website.
                          </span>
                          <Link to="/registration"> Click here </Link>
                        </li>
                        <li>
                          <span>If you have Forgot your Password.</span>
                          <Link to="/forgot-pass"> Click here </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-8">
              <img
                src="images/logo1-img.png"
                className="img-fluid side-ban"
                alt=""
              />
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
        <ToastContainer />
      </div>
    </>
  );
}
