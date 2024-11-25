import axios from "axios";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast, ToastContainer } from "react-toastify";
import { addStateUser } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";

import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { useSelector } from "react-redux";

export default function EditUserState() {
  const [loading, setLoading] = useState(false);
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");

  const { id } = useParams();
  const state = useSelector((state) => state.stateVals);
  const { id: userId } = state;
  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");

    const weIp = res.data.IPv4;
    secureLocalStorage.setItem("ip", weIp);
  };

  useLayoutEffect(() => {
    const getStateName = async () => {
      setLoading(true);
      try {
        const { status, data } = await AdminListService.getStateNameByIdUser(
          id
        );
        if (status === 200) {
          setStateName(data.response.name);
          setStateCode(data.response.code);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getStateName();
  }, []);

  const updateStateName = async (values) => {
    setLoading(true);
    try {
      values["updated_by"] = userId;
      const { status, data } = await AdminListService.updateStateNameByIdUser(
        id,
        values
      );
      if (status === 200) {
        setStateName(data.response.name);
        setLoading(false);
        toast.success("State Updated !", {
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
      console.log(err);

      if (err?.response?.status === 422) {
        setLoading(false);

        toast.error(
          err?.response?.data?.name
            ? err?.response?.data?.name[0]
            : err?.response?.data?.code
            ? err?.response?.data?.code[0]
            : "Unprocessable Content !",
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
        setLoading(false);
      }
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        stateName: stateName,
        code: stateCode,
      },
      validationSchema: addStateUser,
      onSubmit: (values, action) => {
        updateStateName(values);
      },
    });

  useLayoutEffect(() => {
    getIp();
  }, [handleSubmit]);

  return (
    <div className="semi-dark">
      <div className="wrapper">
        <CheckUtype />

        <HeaderSidebar />
        <ToastContainer />
        <main className="page-content">
          <div className="row">
            <div className="col">
              <div className="manage-heading-2">
                <h2>Edit State</h2>
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
                            <p className="help is-danger">{errors.stateName}</p>
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
  );
}
