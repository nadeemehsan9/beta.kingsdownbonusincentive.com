import React, { useState } from "react";
import { useFormik } from "formik";
import ToTop from "../Include/ToTop";
import { forgotPassword } from "../../schema/index";
import FootForgot from "./FootForgot";
import HeadForgot from "./HeadForgot";
import "./ForgotPass.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import mbanPik2 from "../../../assets/mban-pik2.jpg";
import UserService from "../../../services/user.service";
import { Helmet } from "react-helmet";
function ForgotPass() {
  const TITLE = "Kings Down| Forgot Your Password";
  const [loading, setLoading] = useState(false);
  const [alertdan, setalertdan] = useState(false);
  const [alertsuc, setalertsuc] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: forgotPassword,
      onSubmit: (values, action) => {
        // same shape as initial values

        forgot(action);
      },
    });
  const forgot = async (action) => {
    setLoading(true);
    try {
      await UserService.forgotPass(values);
      setLoading(false);
      setalertsuc(true);
      setalertdan(false);
      action.resetForm();
    } catch (err) {
      if (err?.response?.status === 404) {
        setLoading(false);
        setalertsuc(false);
        setalertdan(true);
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

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="pad-bot">
        <ToTop />
        <HeadForgot />
        <section className="slide-up">
          <div className="container">
            <div className="slides-here">
              <h2 className="slide-heading">
                <span>FORGOT YOUR</span> PASSWORD?
              </h2>
              <div className="whiteBg-Forgot">
                <div className="back-slid forgt-slide">
                  <div className="text-contain">
                    <div className="row">
                      <div className="col-lg-7 inc-z">
                        <form
                          className="forgot-frm"
                          onSubmit={handleSubmit}
                          noValidate
                        >
                          <div>
                            <div
                              className={`alert alert-success  fade  ${
                                alertsuc ? "d-block show" : "d-none"
                              }`}
                              role="alert"
                            >
                              An email has been sent to you, please check your
                              email address.
                            </div>
                            <div
                              className={`alert alert-danger  fade  ${
                                alertdan ? " d-block show" : "d-none"
                              }`}
                              role="alert"
                            >
                              <strong>Sorry!</strong> You are not a registered
                              user.
                            </div>
                            <label
                              htmlFor="inputPassword5"
                              className="form-label"
                            >
                              RECOVERY EMAIL
                            </label>
                            <div className="forgot-fild">
                              <input
                                type="email"
                                id="inputPassword5"
                                className={`form-control ${
                                  errors.email && touched.email
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email"
                                name="email"
                                value={values.email || ""}
                                required
                              />
                              <input
                                type="submit"
                                name=""
                                value="RECOVER PASSWORD"
                              />
                            </div>

                            {errors.email && touched.email ? (
                              <p className="help is-danger">{errors.email}</p>
                            ) : null}

                            <div className="row">
                              <div className="col-lg-6">
                                <Link
                                  to="/"
                                  className="round-red-btn w-100 mt-3"
                                >
                                  BACK TO LOGIN
                                </Link>
                              </div>
                              <div className="col-lg-6">
                                <Link
                                  to="/registration"
                                  className="round-red-btn w-100 mt-3"
                                >
                                  REGISTER HERE
                                </Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-5 inc-z">
                        <div className="round-with-bar">
                          <div className="round-bor">
                            <img src={mbanPik2} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FootForgot />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
