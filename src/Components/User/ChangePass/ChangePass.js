import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../schema/index";
import InputField from "../../InputField";
import UserService from "../../../services/user.service";
import FootForgot from "../ForgotPassword/FootForgot";
import HeadForgot from "../ForgotPassword/HeadForgot";
import ToTop from "../Include/ToTop";
import Swal from "sweetalert2";
import axios from "axios";

import secureLocalStorage from "react-secure-storage";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";
import { Helmet } from "react-helmet";

// TODO
function ChangePass() {
  const TITLE = "Kings Down| Change your Password";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  //   const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  // const forgotToken = useSelector(state => state);
  const state = useSelector((state) => state.stateVals);
  const { forgotToken } = state;

  // useEffect(() => {
  //   console.log(state);
  //   console.log(secureLocalStorage.getItem("forgotToken"));
  // }, [])
  // console.log("forgot="+forgotToken);
  //   const { forgotToken } = state;
  // FIXME remove this
  // const forgotToken = localStorage.getItem('forgot');

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

  // useEffect(() => {
  //   useSelector();
  // }, [forgotToken]);

  const getIp = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");

    const weIp = res.data.ip;
    secureLocalStorage.setItem("ip", weIp);
  };

  const passChange = async (action) => {
    setLoading(true);
    try {
      const response = await UserService.changePass(values, forgotToken);

      if (response.status === 200) {
        setLoading(false);
        // ctxDispatch({
        //   type: "REMOVE_FORGOT",
        // });
        userActions.removeForgot();
        action.resetForm();
        Swal.fire({
          title: "Success!",
          text: "Password Change Successful",
          icon: "success",
          confirmButtonText: "Login Now",
        });

        navigate("/");
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
          text: "Some thing went wrong!",
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
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="pad-bot">
        <ToTop />
        <HeadForgot />

        <section className="slide-up">
          <div className="container">
            <div className="slides-here mt-5">
              <h2 className="slide-heading">
                <span>Change your </span>
                password
              </h2>
              <div className="form-box ">
                <div className="form-filds">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="prf-hed" style={{ textAlign: "center" }}>
                          UPDATE YOUR PASSWORD
                        </h4>
                      </div>
                      <div className="col-lg-6">
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
                      <div className="col-lg-6">
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

                      <div className="col-lg-4">
                        <button
                          type="submit"
                          className="round-red-btn w-100 mt-3"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </form>
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

export default ChangePass;
