import axios from "axios";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { addStateUser } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import { toast, ToastContainer } from "react-toastify";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import secureLocalStorage from "react-secure-storage";
import CheckUtype from "../includes/CheckUtype";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function AddUserStates() {
  const TITLE = "Kings Down | States";
  const state = useSelector((state) => state.stateVals);
  const { id: adminId } = state;
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const putState = async (values, action) => {
    setLoading(true);

    try {
      values.id = adminId;
      const response = await AdminListService.addUserState(values);

      if (response.status === 201) {
        setLoading(false);
        toast.success("State Created !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        action.resetForm();
      }
    } catch (err) {
      if (err.response.status === 422 || err.response.status === 409) {
        toast.error(
          err?.response?.data?.name
            ? err?.response?.data?.name[0]
            : err?.response?.data?.code
            ? err?.response?.data?.code[0]
            : "State already exists",
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
      setLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        stateName: "",
        code: "",
      },
      validationSchema: addStateUser,
      onSubmit: (values, action) => {
        console.log(values);
        putState(values, action);
      },
    });
  useLayoutEffect(() => {
    getIp();
  }, [handleSubmit]);

  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");

    const weIp = res.data.IPv4;
    secureLocalStorage.setItem("ip", weIp);
  };
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
                  <h2>Add State</h2>
                </div>

                <div className="slides-here">
                  <div className="alert alert-info">
                    Name of the state is required
                  </div>
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                          <div className="col-lg-4">
                            <label className="form-label">State Name:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.stateName && touched.stateName
                                    ? "is-danger"
                                    : ""
                                }`}
                                placeholder="State Name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="stateName"
                                value={values.stateName || ""}
                                required
                              />
                              <label>State Name</label>
                            </div>
                            {errors.stateName && touched.stateName ? (
                              <p className="help is-danger">
                                {errors.stateName}
                              </p>
                            ) : null}
                          </div>
                          <div className="col-lg-4">
                            <label className="form-label">State Code:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.code && touched.code ? "is-danger" : ""
                                }`}
                                placeholder="State Code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="code"
                                value={values.code || ""}
                                required
                              />
                              <label>State Code</label>
                            </div>
                            {errors.code && touched.code ? (
                              <p className="help is-danger">{errors.code}</p>
                            ) : null}
                          </div>
                          <div className="col-lg-4">
                            <button
                              type="submit"
                              className="btn btn-primary d-block px-4 mt-30 width-100 back-blue"
                            >
                              Submit
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
