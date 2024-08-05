import { useFormik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { addRetailerSchema } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";

import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";

import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Helmet } from "react-helmet";

export default function AddRetailers() {
  const TITLE = "Kings Down | Product";
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.stateVals);
  const { id } = state;

  const addRetailer = async (values, action) => {
    setLoading(true);

    try {
      let updatedValues = { ...values, id };
      const response = await AdminListService.addRetailer(updatedValues);

      if (response.status === 201) {
        setLoading(false);
        toast.success("Retailer Created!", {
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
      console.log(err);
      if (err?.response?.data?.name?.length) {
        toast.error(err.response.data.name[0], {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.status === 422) {
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
      setLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        productName: "",
      },
      validationSchema: addRetailerSchema,
      onSubmit: (values, action) => {
        addRetailer(values, action);
      },
    });

  useLayoutEffect(() => {
    getIp();
  }, [handleSubmit]);

  const getIp = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");
    const weIp = res.data.ip;
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
                  <h2>Add Retailer </h2>
                  <div className="alert alert-info">
                    Name of the Retailer is required
                  </div>
                </div>

                <div className="slides-here">
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                          <div className="col-lg-7">
                            <label className="form-label">Retailer Name</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Retailer Name"
                                className={`form-control ${
                                  errors.productName && touched.productName
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="productName"
                                value={values.productName || ""}
                                required
                              />
                              <label>Retailer Name</label>
                              {errors.productName && touched.productName ? (
                                <p className="help is-danger">
                                  Please fill the Retailer Name
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-5 ">
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
