import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addProductSizeSchema } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import StoreService from "../../../services/store.service";

import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";

import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import ProductService from "../../../services/product.service";
import { Helmet } from "react-helmet";

export default function AddProductSize() {
  const TITLE = "Kings Down | Product Size";
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const [productData, setProductData] = useState([]);
  const [productSize, setProductSize] = useState([]);

  useLayoutEffect(() => {
    const getProductData = async () => {
      setLoading(true);
      try {
        const { data } = await ProductService.getProductForSize();
        const { response: res } = data;
        const results = [];
        res.map((value) => {
          results.push({
            key: value.name,
            value: value.id,
          });
        });
        setProductData([{ key: "Select Product", value: "" }, ...results]);
        setLoading(false);
      } catch (err) {
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getProductData();
  }, []);

  const addProductSize = async (values, action) => {
    setLoading(true);

    try {
      let updatedValues = { ...values, id };
      const response = await AdminListService.addProductSize(updatedValues);

      if (response.status === 201) {
        setLoading(false);
        toast.success("Product Created !", {
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
      if (err?.response?.status === 422) {
        if (err?.response?.data?.upc?.length) {
          toast.error(err.response.data.upc[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err?.response?.data?.size?.length) {
          toast.error(err.response.data.size[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (err?.response?.data?.spiff?.length) {
          toast.error(err.response.data.spiff[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else
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
        upc: "",
        size: "",
        spiff: "",
      },
      validationSchema: addProductSizeSchema,
      onSubmit: (values, action) => {
        // FIXME
        addProductSize(values, action);
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
      {" "}
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
                  <h2>Add Product Size</h2>
                  <div className="alert alert-info">
                    In this page only those products will appear whose any Size
                    is pending
                  </div>
                </div>

                <div className="slides-here">
                  <div className="main-content-box">
                    <div className="manage-territories-box">
                      <form onSubmit={handleSubmit} noValidate>
                        <div className="row gy-3">
                          <div className="col-lg-6 ">
                            <label className="form-label">
                              Select Product:
                            </label>

                            <select
                              className={`form-control form-select ${
                                errors.productName && touched.productName
                                  ? "is-danger"
                                  : ""
                              }`}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              name="productName"
                              value={values.productName || ""}
                              required
                            >
                              {productData.map((res) => {
                                return (
                                  <option key={res.value} value={res.value}>
                                    {res.key}
                                  </option>
                                );
                              })}
                            </select>
                            {errors.productName && touched.productName ? (
                              <p className="help is-danger">
                                {errors.productName}
                              </p>
                            ) : null}
                          </div>

                          <div className="col-lg-6 ">
                            <label className="form-label">UPC</label>
                            <div className="form-floating">
                              <input
                                type="number"
                                placeholder="UPC"
                                className={`form-control ${
                                  errors.upc && touched.upc ? "is-danger" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="upc"
                                value={values.upc || ""}
                                required
                              />
                              <label>UPC</label>
                              {errors.upc && touched.upc ? (
                                <p className="help is-danger">{errors.upc}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6  ">
                            <label className="form-label">Size</label>
                            <div className="form-floating">
                              <input
                                type="text"
                                placeholder="Size"
                                className={`form-control ${
                                  errors.size && touched.size ? "is-danger" : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="size"
                                value={values.size || ""}
                                required
                              />
                              <label>Size</label>
                              {errors.size && touched.size ? (
                                <p className="help is-danger">{errors.size}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6  ">
                            <label className="form-label">Spiff</label>
                            <div className="form-floating">
                              <input
                                type="number"
                                min={1}
                                placeholder="Spiff"
                                className={`form-control ${
                                  errors.spiff && touched.spiff
                                    ? "is-danger"
                                    : ""
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="spiff"
                                value={values.spiff || ""}
                                required
                              />
                              <label>Spiff</label>
                              {errors.spiff && touched.spiff ? (
                                <p className="help is-danger">{errors.spiff}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <button
                              type="submit"
                              className="btn btn-primary d-block px-4  width-100 back-blue"
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
