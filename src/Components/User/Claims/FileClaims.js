import axios from "axios";
import React, { useEffect, useState } from "react";
import InputField from "../../InputField";
import Footer from "../Include/Footer";
import Header from "../Include/Header";
import { useFormik } from "formik";
import { submitUserSchema } from "../../schema";
import { toast } from "react-toastify";
import "./FileClaim.css";
import secureLocalStorage from "react-secure-storage";
import UserService from "../../../services/user.service";
import { useSelector } from "react-redux";
import ProductService from "../../../services/product.service";
import { Helmet } from "react-helmet";
import Select from "react-select";

import StoreService from "../../../services/store.service";

function FileClaims() {
  const TITLE = "Kings Down| File A Claims";

  const initialInputTypes = [
    { id: 1, type: "text" },
    { id: 2, type: "text" },
    { id: 3, type: "text" },
  ];
  const [inputTypes, setInputTypes] = useState(initialInputTypes);

  const handleInputClick = (id) => {
    const updatedInputTypes = inputTypes.map((input) => {
      if (input.id === id) {
        return { ...input, type: "date" };
      }
      return input;
    });
    setInputTypes(updatedInputTypes);
  };

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [price, setPrice] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");

  const [product, setProduct] = useState([]);
  const [retailer, setRetailer] = useState([]);

  const state = useSelector((state) => state.stateVals);
  const { id } = state;

  const onFileChange = (e) => {
    setImage(e);
  };

  const onFileChange2 = (e) => {
    setImage2(e);
  };

  const onFileChange3 = (e) => {
    setImage3(e);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    setProduct([]);
    const getRetailerList = async () => {
      try {
        const { data } = await StoreService.getRetailers();
        const { response: res } = data;
        const results = [];
        res.map((value) => {
          results.push({
            label: value.name,
            value: value.id,
          });
        });
        setRetailer([...results]);
      } catch (err) {
        setRetailer([]);
      }
    };

    getRetailerList();

    const getRetailerInfo = async () => {
      try {
        const response = await StoreService.getRetailerInfoById(id);

        setSelectedOption(response?.data?.response);
        setFieldValue("retailer", response?.data?.response?.value);
      } catch (error) {
        setSelectedOption(null);
      }
    };

    getRetailerInfo();

    const getProduct = async () => {
      const { data } = await ProductService.getProduct(id);

      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          key: value.sku + " / " + value.description,
          value: value.id,
        });
      });
      setProduct([...results]);
    };
    getProduct();
  }, []);

  // }, [userActions, accessToken, navigate]);

  const resetPrices = () => {
    setPrice("");
    setPrice2("");
    setPrice3("");
  };

  const SubmitClaim = async (action, values, rId) => {
    try {
      setLoading(true);
      const response = await UserService.SubmitClaim(values, id, rId);
      const { data: res } = response;
      setLoading(false);

      toast.success(res.response, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      action.resetForm();
      resetPrices();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setLoading(false);

      if (
        err?.response?.data?.response &&
        typeof err?.response?.data?.response === "string"
      ) {
        toast.error(err?.response?.data?.response, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (
        err?.response?.data?.error &&
        typeof err?.response?.data?.error === "string"
      ) {
        toast.error(err?.response?.data?.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-center",
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

  const {
    values,
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,

    initialValues: {
      retailer: "",
      product: "",
      product2: "",
      product3: "",

      invoice: "",
      invoice2: "",
      invoice3: "",

      invoice_date: "",
      invoice_date2: "",
      invoice_date3: "",

      quantity: "",
      quantity2: "",
      quantity3: "",

      image: "",
      image2: "",
      image3: "",
    },
    validationSchema: submitUserSchema,

    onSubmit: (values, action) => {
      var bodyFormData = new FormData();
      // FORM 1

      bodyFormData.append("product", values.product);

      bodyFormData.append("invoice", values.invoice);
      bodyFormData.append("invoice_date", values.invoice_date);
      bodyFormData.append("quantity", values.quantity);
      bodyFormData.append("image", image, image.name);

      if (values.product2 != "") {
        // FORM 2

        bodyFormData.append("product2", values.product2);

        bodyFormData.append("invoice2", values.invoice2);
        bodyFormData.append("invoice_date2", values.invoice_date2);
        bodyFormData.append("quantity2", values.quantity2);
        bodyFormData.append("image2", image2, image2.name);
      }

      if (values.product3 != "") {
        // FORM 3

        bodyFormData.append("product3", values.product3);

        bodyFormData.append("invoice3", values.invoice3);
        bodyFormData.append("invoice_date3", values.invoice_date3);
        bodyFormData.append("quantity3", values.quantity3);
        bodyFormData.append("image3", image3, image3.name);
      }

      bodyFormData.append("ip", secureLocalStorage.getItem("ip"));

      SubmitClaim(action, bodyFormData, values.retailer);
      // action.resetForm();
    },
  });

  // const splitValue = (e) => {
  //   console.log("value=" + e);
  //   let value = "";
  //   if (e === "on") {
  //     value = "1";
  //   } else {
  //     value = "0";
  //   }
  //   return value;
  // };

  useEffect(() => {
    const getIp = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");

      const weIp = res.data.IPv4;
      secureLocalStorage.setItem("ip", weIp);
    };
    getIp();
  }, [handleSubmit]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="user-panel">
        <section className="main-ban page-heading">
          <div className="container">
            <Header />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* <div className="traning-awards">
                  <h1 className="mban-head w-100">HOPE TO DREAM SALES</h1>
                </div> */}
                <h2 className="gen-hed">
                  FILE A <span className="slide-heading">CLAIM</span>
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="Whitebg-box" id="FileClaimsBox">
                <form onSubmit={handleSubmit} noValidate>
                  <ul className="timeline claim_detail">
                    <li>
                      <div className="prfil-set overflow-visible">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="alert alert-danger" role="alert">
                                <h6 className="astric-req">
                                  Field(s) marked with <span>Asterisk (*)</span>{" "}
                                  are mandatory.
                                </h6>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <h4 className="prf-hed">SELECT RETAILER</h4>
                            </div>
                          </div>

                          <div className="form-filds ">
                            <div className="row">
                              <div className="col-lg-6">
                                <div
                                  className={`form-floating ${
                                    errors.retailer && touched.retailer
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <Select
                                    value={selectedOption}
                                    className={
                                      errors.retailer && touched.retailer
                                        ? "error-select-search"
                                        : ""
                                    }
                                    placeholder={"SELECT RETAILER"}
                                    // placeholder={"* SELECT STATE/PROVINCE"}
                                    options={retailer}
                                    isSearchable={true}
                                    name="retailer"
                                    onChange={(selectedOption) => {
                                      handleSelectChange(selectedOption);
                                      if (selectedOption) {
                                        setFieldValue(
                                          "retailer",
                                          selectedOption.value
                                        );
                                      } else {
                                        setFieldValue("retailer", "");
                                      }
                                    }}
                                    onBlur={() =>
                                      setFieldTouched("retailer", true)
                                    }
                                  />
                                  <label
                                    htmlFor="floatingSelect"
                                    className="with-select"
                                  >
                                    <span>*</span> RETAILER
                                  </label>
                                  {errors.retailer && touched.retailer ? (
                                    <p className="help is-danger">
                                      {errors.retailer}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="prfil-set">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-12">
                              <div className="alert alert-info" role="alert">
                                <h6 className="astric-req">
                                  First box of{" "}
                                  <strong>PRODUCT INFORMATION</strong> is
                                  mandatory rest of them will be saved only when
                                  they are filled completely.
                                </h6>
                              </div>
                            </div>
                          </div>
                          <br />

                          <div className="row ">
                            <div className="col-6">
                              <h4 className="prf-hed">PRODUCT INFORMATION</h4>{" "}
                            </div>

                            {price !== "" ? (
                              <div className="col-6">
                                <div className="claimPrice">
                                  Reward: ${price}
                                </div>{" "}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.product && touched.product
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="product"
                                      value={values.product || ""}
                                      required
                                    >
                                      <option value="">
                                        Levin SKU / Description{" "}
                                      </option>
                                      {product.map((res) => {
                                        return (
                                          <option
                                            key={res.key}
                                            value={res.value}
                                          >
                                            {res.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <label>
                                      <span>*</span> PRODUCT SOLD
                                    </label>
                                    {errors.product && touched.product ? (
                                      <p className="help is-danger">
                                        {errors.product}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.invoice}
                                  touched={touched.invoice}
                                  values={values.invoice}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="DELIVERED INVOICE No"
                                  spanText="DELIVERED INVOICE NO"
                                  fieldName="invoice"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>

                              <div className="col-lg-6">
                                <div
                                  className={`form-floating ${
                                    errors.invoice_date && touched.invoice_date
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <input
                                    id={inputTypes[0].id}
                                    type={inputTypes[0].type}
                                    // onClick={() => handleInputClick(inputTypes[0].id)}
                                    onFocus={() =>
                                      handleInputClick(inputTypes[0].id)
                                    }
                                    placeholder=" "
                                    className="form-control"
                                    onChange={handleChange}
                                    onKeyUp={(e) => e.preventDefault()}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onBlur={handleBlur}
                                    name="invoice_date"
                                    value={values.invoice_date || ""}
                                    required
                                  />
                                  <label className="date">
                                    <span>*</span> INVOICE DATE
                                  </label>
                                  {errors.invoice_date &&
                                  touched.invoice_date ? (
                                    <p className="help is-danger">
                                      {errors.invoice_date}
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.quantity && touched.quantity
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="quantity"
                                      value={values.quantity || ""}
                                      required
                                    >
                                      <option value="">SELECT QUANTITY</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                    </select>
                                    <label>
                                      <span>*</span> QUANTITY SHIPPED
                                    </label>
                                    {errors.quantity && touched.quantity ? (
                                      <p className="help is-danger">
                                        {errors.quantity}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  className="file"
                                  errors={errors.image}
                                  touched={touched.image}
                                  values={values.image}
                                  handleChange={(e) => {
                                    handleChange(e);
                                    onFileChange(e.target.files[0]);
                                  }}
                                  handleBlur={handleBlur}
                                  placeholder="UPLOAD FILE"
                                  spanText="UPLOAD FILE"
                                  fieldName="image"
                                  fieldType="file"
                                  required={true}
                                />
                              </div>
                              <div className="col-md-12">
                                <p>
                                  {" "}
                                  You can upload only <b>
                                    jpg, jpeg, png, gif
                                  </b>{" "}
                                  and <b>pdf</b> files. Maximum size allowed is{" "}
                                  <b>10MB.</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="prfil-set">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row justify-content-between">
                                <div className="col-6">
                                  <h4 className="prf-hed">
                                    PRODUCT INFORMATION
                                  </h4>{" "}
                                </div>
                                {price2 !== "" ? (
                                  <div className="col-6">
                                    <div className="claimPrice2">
                                      Reward: ${price2}
                                    </div>{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="select-leading">
                                  {/* {userCityLoader ? (
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  ) : null} */}
                                  <div
                                    className={`form-floating ${
                                      errors.product2 && touched.product2
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="product2"
                                      value={values.product2 || ""}
                                      required
                                    >
                                      <option value="">
                                        {" "}
                                        Levin SKU / Description{" "}
                                      </option>
                                      {product.map((res) => {
                                        return (
                                          <option
                                            key={res.value}
                                            value={res.value}
                                          >
                                            {res.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <label>
                                      <span>*</span> PRODUCT SOLD
                                    </label>
                                    {errors.product2 && touched.product2 ? (
                                      <p className="help is-danger">
                                        {errors.product2}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.invoice2}
                                  touched={touched.invoice2}
                                  values={values.invoice2}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="DELIVERED INVOICE NO"
                                  spanText="DELIVERED INVOICE NO"
                                  fieldName="invoice2"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>

                              <div className="col-lg-6">
                                <div
                                  className={`form-floating ${
                                    errors.invoice_date2 &&
                                    touched.invoice_date2
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <input
                                    id={inputTypes[1].id}
                                    type={inputTypes[1].type}
                                    // onClick={() => handleInputClick(inputTypes[1].id)}
                                    onFocus={() =>
                                      handleInputClick(inputTypes[1].id)
                                    }
                                    placeholder=" "
                                    className="form-control"
                                    onKeyUp={(e) => e.preventDefault()}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="invoice_date2"
                                    value={values.invoice_date2 || ""}
                                    required
                                  />
                                  <label className="date">
                                    <span>*</span> INVOICE DATE
                                  </label>
                                  {errors.invoice_date2 &&
                                  touched.invoice_date2 ? (
                                    <p className="help is-danger">
                                      {errors.invoice_date2}
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.quantity2 && touched.quantity2
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="quantity2"
                                      value={values.quantity2 || ""}
                                      required
                                    >
                                      <option value="">SELECT QUANTITY</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                    </select>
                                    <label>
                                      <span>*</span> QUANTITY SHIPPED
                                    </label>
                                    {errors.quantity2 && touched.quantity2 ? (
                                      <p className="help is-danger">
                                        {errors.quantity2}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  className="file"
                                  errors={errors.image2}
                                  touched={touched.image2}
                                  values={values.image2}
                                  handleChange={(e) => {
                                    handleChange(e);
                                    onFileChange2(e.target.files[0]);
                                  }}
                                  handleBlur={handleBlur}
                                  placeholder="UPLOAD IMAGE"
                                  spanText="UPLOAD IMAGE"
                                  fieldName="image2"
                                  fieldType="file"
                                  required={true}
                                />
                              </div>
                              <div className="col-md-12">
                                <p>
                                  {" "}
                                  You can upload only <b>
                                    jpg, jpeg, png, gif
                                  </b>{" "}
                                  and <b>pdf</b> files. Maximum size allowed is{" "}
                                  <b>10MB.</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="prfil-set">
                        <div className="form-box">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="row justify-content-between">
                                <div className="col-6">
                                  <h4 className="prf-hed">
                                    PRODUCT INFORMATION
                                  </h4>{" "}
                                </div>
                                {price3 !== "" ? (
                                  <div className="col-6">
                                    <div className="claimPrice3">
                                      Reward: ${price3}
                                    </div>{" "}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-filds">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.product3 && touched.product3
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="product3"
                                      value={values.product3 || ""}
                                      required
                                    >
                                      <option value="">
                                        Levin SKU / Description{" "}
                                      </option>
                                      {product.map((res) => {
                                        return (
                                          <option
                                            key={res.value}
                                            value={res.value}
                                          >
                                            {res.key}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <label>
                                      <span>*</span> PRODUCT SOLD
                                    </label>
                                    {errors.product3 && touched.product3 ? (
                                      <p className="help is-danger">
                                        {errors.product3}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  errors={errors.invoice3}
                                  touched={touched.invoice3}
                                  values={values.invoice3}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="DELIVERED INVOICE NO"
                                  spanText="DELIVERED INVOICE NO"
                                  fieldName="invoice3"
                                  fieldType="text"
                                  required={true}
                                />
                              </div>

                              <div className="col-lg-6">
                                <div
                                  className={`form-floating ${
                                    errors.invoice_date3 &&
                                    touched.invoice_date3
                                      ? "is-danger"
                                      : ""
                                  }`}
                                >
                                  <input
                                    id={inputTypes[2].id}
                                    type={inputTypes[2].type}
                                    // onClick={() => handleInputClick(inputTypes[2].id)}
                                    onFocus={() =>
                                      handleInputClick(inputTypes[2].id)
                                    }
                                    className="form-control"
                                    // className="form-input"
                                    onChange={handleChange}
                                    onKeyUp={(e) => e.preventDefault()}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onBlur={handleBlur}
                                    name="invoice_date3"
                                    value={values.invoice_date3 || ""}
                                    required
                                    placeholder=" "
                                  />
                                  <label className="date">
                                    <span>*</span> INVOICE DATE
                                  </label>
                                  {errors.invoice_date3 &&
                                  touched.invoice_date3 ? (
                                    <p className="help is-danger">
                                      {errors.invoice_date3}
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="select-leading">
                                  <div
                                    className={`form-floating ${
                                      errors.quantity3 && touched.quantity3
                                        ? "is-danger"
                                        : ""
                                    }`}
                                  >
                                    <select
                                      className="form-select"
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                      onBlur={handleBlur}
                                      name="quantity3"
                                      value={values.quantity3 || ""}
                                      required
                                    >
                                      <option value="">SELECT QUANTITY</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                    </select>
                                    <label>
                                      <span>*</span> QUANTITY SHIPPED
                                    </label>
                                    {errors.quantity3 && touched.quantity3 ? (
                                      <p className="help is-danger">
                                        {errors.quantity3}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <InputField
                                  className="file"
                                  errors={errors.image3}
                                  touched={touched.image3}
                                  values={values.image3}
                                  handleChange={(e) => {
                                    handleChange(e);
                                    onFileChange3(e.target.files[0]);
                                  }}
                                  handleBlur={handleBlur}
                                  placeholder="UPLOAD IMAGE"
                                  spanText="UPLOAD IMAGE"
                                  fieldName="image3"
                                  fieldType="file"
                                  required={true}
                                />
                              </div>
                              <div className="col-md-12">
                                <p>
                                  {" "}
                                  You can upload only <b>
                                    jpg, jpeg, png, gif
                                  </b>{" "}
                                  and <b>pdf</b> files. Maximum size allowed is{" "}
                                  <b>10MB.</b>
                                </p>
                              </div>

                              <div className="col-lg-6">
                                <button
                                  type="submit"
                                  className="round-red-btn w-100 mt-3 "
                                  value="SUBMIT"
                                >
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  SUBMIT
                                </button>
                              </div>
                              <div className="col-lg-6">
                                <input
                                  type="reset"
                                  className="round-red-btn w-100 mt-3 reset-reg"
                                  value="RESET FORM"
                                  onClick={() => window.location.reload(false)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  {/* <div className="container">
                    <div className="row">
                      <div className="col-sm-2">
                        <input
                          type="reset"
                          className="round-red-btn w-100 mt-3 clr"
                          value="RESET"
                          onClick={() => window.location.reload(false)}
                        />{" "}
                      </div>
                      <div className="col-sm-2">
                        <input
                          type="submit"
                          className="round-red-btn w-100 mt-3"
                          value="SUBMIT"
                        />{" "}
                      </div>
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
        {/* <SeeAttachment /> */}
      </div>
    </>
  );
}

export default FileClaims;
