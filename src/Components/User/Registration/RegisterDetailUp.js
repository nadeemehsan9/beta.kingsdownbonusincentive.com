import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateRegisterStoreSchema } from "../../../schema/index";

function RegisterDetailUp() {
  const [storeStateSelected, setStoreStateSelected] = useState("");
  const [citySelected, setCitySelected] = useState(null);
  const [storeSelected, setStoreSelected] = useState(null);
  const [storeStateText, setStoreStateText] = useState("Loading");
  const [cityText, setCityText] = useState("Loading");
  const [storeText, setStoreText] = useState("Loading");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        stateprov: storeStateSelected,
        city: citySelected,
        store: storeSelected,
      },
      validationSchema: updateRegisterStoreSchema,
      onSubmit: (values, action) => {
        // UpdateStoreData(values, action);
      },
    });

  return (
    <>
      <form noValidate>
        <ul className="timeline single-li">
          <li>
            <div className="prfil-set">
              <div className="form-box">
                <div className="row">
                  <div className="alert alert-danger" role="alert">
                    <h6 className="astric-req">
                      Field(s) marked with <span>Asterisk (*)</span> are
                      mandatory.
                    </h6>
                  </div>
                  <div className="col-lg-8">
                    <h4 className="prf-hed">SELECT YOUR STORE</h4>{" "}
                  </div>
                </div>

                {/* {!storeEdit ? ( */}
                <div className="form-filds ">
                  <div className="row">
                    <div className="col-lg-4">
                      <div
                        className={`form-floating ${
                          errors.stateprov && touched.stateprov
                            ? "is-danger"
                            : ""
                        }`}
                      >
                        <select
                          className="form-select"
                          onChange={(e) => {
                            // changeCity(e);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          name="stateprov"
                          value={values.stateprov || ""}
                          required
                        >
                          <option value="">STORE STATE</option>;
                          <option value="test1">test1</option>;
                          <option value="test2">test2</option>;
                          {/* {storeState.map((res) => {
                            return (
                              <option key={res.value} value={res.value}>
                                {res.key}
                              </option>
                            );
                          })} */}
                        </select>
                        <label htmlFor="floatingSelect">
                          SELECT STATE/PROVINCE
                        </label>
                        {errors.stateprov && touched.stateprov ? (
                          <p className="help is-danger">{errors.stateprov}</p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="select-leading">
                        {/* {cityLoader ? ( */}
                        <span
                          // className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {/* ) : null} */}
                        <div
                          className={`form-floating ${
                            errors.city && touched.city ? "is-danger" : ""
                          }`}
                        >
                          <select
                            className="form-select"
                            onChange={(e) => {
                              // changeStore(e);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            name="city"
                            value={values.city || ""}
                            required
                          >
                            <option value="">SELECT CITY</option>;
                            {/* {city.map((res) => {
                              return (
                                <option key={res.value} value={res.value}>
                                  {res.key}
                                </option>
                              );
                            })} */}
                          </select>
                          <label htmlFor="">SELECT CITY</label>
                          {errors.city && touched.city ? (
                            <p className="help is-danger">{errors.city}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="select-leading">
                        {/* {storeLoader ? ( */}
                        <span
                          // className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {/* ) : null} */}
                        <div className="form-floating">
                          <div
                            className={`form-floating ${
                              errors.store && touched.store ? "is-danger" : ""
                            }`}
                          >
                            <select
                              className="form-select"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                              name="store"
                              //   value={values.store || ""}
                              requiredlass
                            >
                              <option value=""> SELECT STORE </option>
                              {/* {store.map((res) => {
                                return (
                                  <option key={res.value} value={res.value}>
                                    {res.key}
                                  </option>
                                );
                              })} */}
                            </select>
                            <label htmlFor="">SELECT STORE</label>
                            {errors.store && touched.store ? (
                              <p className="help is-danger">{errors.store}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
          </li>
        </ul>
        {/* <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div> */}
      </form>
    </>
  );
}

export default RegisterDetailUp;
