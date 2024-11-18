import axios from "axios";
import { useFormik } from "formik";
import secureLocalStorage from "react-secure-storage";
import React, { useLayoutEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { addCity } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import StoreService from "../../../services/store.service";

import AdminFooter from "../includes/AdminFooter";

import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import CheckUtype from "../includes/CheckUtype";
import { Helmet } from "react-helmet";

export default function AddUserCities() {
  const TITLE = "Casper Cash | Cities";
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  const [stateData, setStateData] = useState([]);

  useLayoutEffect(() => {
    const getStateData = async () => {
      setLoading(true);
      try {
        const { data } = await StoreService.getUserState();
        const { response: res } = data;
        const results = [];
        res.map((value) => {
          results.push({
            key: value.name,
            value: value.id,
          });
        });
        setStateData([{ key: "Select State", value: "" }, ...results]);
        setLoading(false);
      } catch (err) {
        if (err.response.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getStateData();
  }, []);

  const putCity = async (values, action) => {
    setLoading(true);

    try {
      const response = await AdminListService.addUserCity(values);

      if (response.status === 201) {
        setLoading(false);
        toast.success("City Created !", {
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
      if (err.response.status === 422) {
        toast.error(
          err?.response?.data?.city
            ? err?.response?.data?.city[0]
            : err?.response?.data?.zip
            ? err?.response?.data?.zip[0]
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
      } else if (err.response.status === 409) {
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
        cityName: "",
        zipCode: "",
        stateName: "",
      },
      validationSchema: addCity,
      onSubmit: (values, action) => {
        putCity(values, action);
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
                  <h2>
                    Add <span>User City</span>
                  </h2>
                </div>

                <div className="slides-here">
                  <div className="alert alert-info">
                    Name of the City is required
                  </div>
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                          <div className="col-lg-6 mt-1">
                            <div className="form-group custom-group">
                              <label className="form-label">
                                Select State:
                              </label>
                              <select
                                className={`form-control form-select ${
                                  errors.stateName && touched.stateName
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="stateName"
                                value={values.stateName || ""}
                                required
                              >
                                {stateData.map((res) => {
                                  return (
                                    <option key={res.value} value={res.value}>
                                      {res.key}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.stateName && touched.stateName ? (
                                <p className="help is-danger">
                                  {errors.stateName}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <label className="form-label">City Name:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="City Name"
                                className={`form-control ${
                                  errors.cityName && touched.cityName
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="cityName"
                                value={values.cityName || ""}
                                required
                              />
                              <label>City Name</label>
                              {errors.cityName && touched.cityName ? (
                                <p className="help is-danger">
                                  {errors.cityName}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 mt-lg-0">
                            <label className="form-label">Zip Code:</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Zip Code"
                                className={`form-control ${
                                  errors.zipCode && touched.zipCode
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="zipCode"
                                value={values.zipCode || ""}
                                required
                              />
                              <label>Zip Code</label>
                              {errors.zipCode && touched.zipCode ? (
                                <p className="help is-danger">
                                  {errors.zipCode}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-2 mt-lg-2">
                            <button
                              className="btn btn-primary d-block px-4 my-0 mt-lg-4 width-100 back-blue"
                              type="submit"
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
