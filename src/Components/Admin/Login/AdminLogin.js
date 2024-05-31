import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useFormik } from "formik";
import { signImSchema } from "../../../schema";
import { toast, ToastContainer } from "react-toastify";
import AdminListService from "../../../services/admin-list.service";
import "react-toastify/dist/ReactToastify.css";
import "../includes/general.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux/index";
import { Helmet } from "react-helmet";

export default function AdminLogin() {
  const TITLE = "Kings Down | Admin Login";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const login = async (values, action) => {
    setLoading(true);
    try {
      const response = await AdminListService.login(values);

      if (response.status === 200) {
        if (
          response.data.user.user_type !== "rsa" &&
          response.data.user.user_type !== "manager" &&
          response.data.user.user_type !== "corporate"
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
          action.resetForm();
          navigate("/admin/dashboard");
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
        }

        setLoading(false);
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
      } else {
        setLoading(false);
        console.log(err);
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
        login(values, action);
      },
    });

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

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
                  <form action="" onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="prf-hed" style={{ color: "#70b0c1" }}>
                          ADMIN LOGIN
                        </h4>
                      </div>
                      <hr className="underLine" />
                      <div className="col-12">
                        <div
                          className={` input-group ${
                            errors.name && touched.name ? "is-danger" : ""
                          }`}
                        >
                          <span className="input-group-text" id="basic-addon1">
                            <i className="bi bi-person-fill"></i>
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
                            <i className="bi bi-lock-fill"></i>
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
                          <span>If you have Forgot your Password.</span>
                          <Link to="/admin/forgot-pass"> Click here </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <br />
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
