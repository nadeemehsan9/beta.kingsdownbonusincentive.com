import axios from "axios";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast, ToastContainer } from "react-toastify";

import { UpdateProduct } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";

import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";

import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";

export default function EditProduct() {
  const state = useSelector((state) => state.stateVals);
  const { id: userId } = state;

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");

  const [upc, setUpc] = useState("");

  const { id: prodId } = useParams();

  useLayoutEffect(() => {
    const getAddedProduct = async () => {
      setLoading(true);

      try {
        const { data } = await AdminListService.getProductPriceBySizeId(prodId);
        const { response: res } = data;
        setPrice(res.bonus);
        setProduct(res.description);

        setUpc(res.sku);

        setLoading(false);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 404) {
          toast.error("Resource Not Found!", {
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
        } else {
          setLoading(false);
        }
      }
    };

    getAddedProduct();
  }, []);

  const getIp = async () => {
    const res = await axios.get("https://api.ipify.org?format=json");

    const weIp = res.data.ip;
    secureLocalStorage.setItem("ip", weIp);
  };

  const updateProduct = async (values) => {
    setLoading(true);
    try {
      values["updated_by"] = userId;
      await AdminListService.updateProductList(prodId, values);
      setLoading(false);
      toast.success("Product Updated !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      setLoading(false);
      if (err?.response?.status === 422) {
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
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        price: price,
      },
      validationSchema: UpdateProduct,
      onSubmit: (values, action) => {
        updateProduct(values);
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
                <h2>Edit Product</h2>
              </div>

              <div className="slides-here">
                <div className="alert alert-info">
                  Name of the product is required
                </div>
                <div className="main-content-box">
                  <div className="manage-territories-box">
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row">
                        <div class="col-sm-6">
                          <div class="form-group">
                            <p>
                              <strong> Levin Description</strong>
                              <br />
                              {product}
                            </p>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="form-group">
                            <p>
                              <strong>Sku</strong>
                              <br />
                              {upc}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label">Bonus:</label>
                          <div className="form-floating">
                            <input
                              type="number"
                              placeholder="Price"
                              className={`form-control ${
                                errors.price && touched.price ? "is-danger" : ""
                              }`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="price"
                              value={values.price || ""}
                              required
                            />
                            <label>Bonus</label>
                            {errors.price && touched.price ? (
                              <p className="help is-danger">{errors.price}</p>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-2 mt-lg-2">
                          <button
                            className="btn btn-primary d-block px-4 my-0 mt-lg-4 width-100 back-blue"
                            type="submit"
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
