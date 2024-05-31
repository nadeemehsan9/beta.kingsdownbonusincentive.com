import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";
import { UpAdminSchema } from "../../../schema";
import UserService from "../../../services/user.service";
import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { Helmet } from "react-helmet";

export default function ProfileAdmin() {
  const TITLE = "Kings Down | Admin Profile";
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const navigate = useNavigate();
  const state = useSelector((state) => state.stateVals);
  const { accessToken, id } = state;

  const [loading, setLoading] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [address1, setAddress1] = useState("");
  const [phone, setPhone] = useState("");
  const [userSelectedState, setSelectedUserState] = useState("");
  const [userSelectedCity, setSelectedUserCity] = useState("");
  const [userState, setUserState] = useState([]);
  const [userCity, setUserCity] = useState([]);
  const [userCityLoader, setUserCityLoader] = useState(false);

  useLayoutEffect(() => {
    if (accessToken) {
      const getProfile = async () => {
        setLoading(true);
        try {
          const response = await UserService.getProfile(accessToken);
          // if (response.status === 200) {
          userActions.UpdateProfile({
            id: response.data.id,
            uName: response.data.username,
            uType: response.data.user_type,
            name: response.data.first_name + " " + response.data.last_name,
          });

          setFname(response.data.first_name);
          setLname(response.data.last_name);
          setEmail(response.data.email);
          setZip(response.data.zip);
          // setSelectedUserState(response.data.state);
          // setSelectedUserCity(response.data.city);
          setSelectedUserState(response.data.state_id);
          setSelectedUserCity(response.data.city_id);
          getUserCity(response.data.state_id);
          setAddress1(response.data.address1);
          setPhone(response.data.phone);
          setUserName(response.data.username);
          setLoading(false);
          // }
        } catch (err) {
          userActions.logOut(null);
          setLoading(false);
        }
      };

      getProfile();
    }
  }, [navigate, accessToken]);

  const getUserCity = async (val) => {
    setUserCityLoader(true);
    const { data } = await UserService.getCityByStateId(val);
    const { response: res } = data;
    const results = [];
    res.map((value) => {
      results.push({
        key: value.city,
        value: value.id,
      });
    });
    setUserCity([...results]);
    setUserCityLoader(false);
  };

  useEffect(() => {
    const getUserState = async () => {
      const { data } = await UserService.getUserState();
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          key: value.name,
          value: value.id,
        });
      });
      setUserState([{ key: "SELECT STATE", value: "" }, ...results]);
    };
    getUserState();
  }, []);

  const changeUserCity = (e) => {
    setUserCity([]);
    const getUserCity = async () => {
      setUserCityLoader(true);
      const { data } = await UserService.getCityByStateId(e.target.value);
      const { response: res } = data;
      const results = [];
      res.map((value) => {
        results.push({
          key: value.city,
          value: value.id,
        });
      });
      setUserCity([...results]);
      setUserCityLoader(false);
    };

    if (e.target.value !== "") {
      getUserCity();
    }
  };
  const UpdateUserData = async (values) => {
    try {
      if (values.new_password === "") {
        setLoading(true);
        const response = await UserService.UpdateAdminInfo(values, id);
        const { data: res } = response;

        if (response.status === 200) {
          userActions.UpdateName({
            name: res.response.first_name + " " + res.response.last_name,
          });

          setLoading(false);

          toast.success("Your Profile information has been updated!", {
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
      } else if (values.new_password !== "") {
        setLoading(true);
        const response = await UserService.UpdateAdminInfoWithPass(
          values,
          id,
          values.new_password
        );
        const { data: res } = response;
        if (response.status === 200) {
          userActions.UpdateName({
            name: res.response.first_name + " " + res.response.last_name,
          });
          setLoading(false);
          toast.success("Your Profile information has been updated!", {
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
    } catch (err) {
      if (err?.response?.status === 401) {
        setLoading(false);

        toast.error("Error, Try Again Later!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.status === 422) {
        setLoading(false);
        toast.error("Error, Unprocessable Content!", {
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
        setLoading(false);

        toast.error("Error, Some thing went wrong!", {
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        fname: fname,
        lname: lname,
        email: email,
        address1: address1,
        state: userSelectedState,
        city: userSelectedCity,
        phone: phone,
        zipcode: zip,
        // password: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: UpAdminSchema,
      onSubmit: (values, action) => {
        // console.log("testing");
        UpdateUserData(values);
      },
    });

  useEffect(() => {
    if (accessToken) {
      const getIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");

        const weIp = res.data.IPv4;
        secureLocalStorage.setItem("ip", weIp);
      };
      getIp();
    }
  }, [handleSubmit, accessToken]);

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="semi-dark">
        <div className="wrapper">
          <ToastContainer />

          <HeaderSidebar />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>My Account</h2>
                </div>
                <form
                  className="profile-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="main-content-box">
                    <h2 className="manage-territories-heading">Information</h2>
                    <div className="row">
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.fname && touched.fname ? "is-danger" : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First-Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="fname"
                            value={values.fname || ""}
                          />
                          <label>
                            First Name{" "}
                            <span className="d-inline-block">* </span>
                          </label>
                          {errors.fname && touched.fname ? (
                            <p className="help is-danger">{errors.fname}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.lname && touched.lname ? "is-danger" : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lname"
                            value={values.lname || ""}
                          />
                          <label>
                            Last Name <span className="d-inline-block">* </span>
                          </label>
                          {errors.lname && touched.lname ? (
                            <p className="help is-danger">{errors.lname}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.address1 && touched.address1
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="address1"
                            value={values.address1 || ""}
                          />
                          <label>
                            Address <span className="d-inline-block">* </span>
                          </label>
                          {errors.address1 && touched.address1 ? (
                            <p className="help is-danger">{errors.address1}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.state && touched.state ? "is-danger" : ""
                          }`}
                        >
                          <select
                            className="form-select"
                            onChange={(e) => {
                              changeUserCity(e);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            name="state"
                            value={values.state || ""}
                            required
                          >
                            {/* <option value="">SELECT STATE</option> */}
                            {userState.map((res) => {
                              return (
                                <option key={res.value} value={res.value}>
                                  {res.key}
                                </option>
                              );
                            })}
                          </select>
                          <label>
                            State <span className="d-inline-block">* </span>
                          </label>
                          {errors.state && touched.state ? (
                            <p className="help is-danger">{errors.state}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="select-leading">
                          {userCityLoader ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                          <div
                            className={`form-floating ${
                              errors.city && touched.city ? "is-danger" : ""
                            }`}
                          >
                            <select
                              className="form-select"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="city"
                              value={values.city || ""}
                              required
                            >
                              <option value="">SELECT CITY</option>
                              {userCity.map((res) => {
                                return (
                                  <option key={res.value} value={res.value}>
                                    {res.key}
                                  </option>
                                );
                              })}
                            </select>
                            <label>
                              City <span className="d-inline-block">* </span>
                            </label>
                            {errors.city && touched.city ? (
                              <p className="help is-danger">{errors.city}</p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.zipcode && touched.zipcode ? "is-danger" : ""
                          }`}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Zip"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="zipcode"
                            value={values.zipcode || ""}
                          />
                          <label>
                            Zip <span className="d-inline-block">* </span>
                          </label>
                          {errors.zipcode && touched.zipcode ? (
                            <p className="help is-danger">{errors.zipcode}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="phone"
                            value={values.phone || ""}
                          />
                          <label>Phone</label>
                        </div>
                      </div>
                    </div>

                    <h2 className="manage-territories-heading">
                      Email Information
                    </h2>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="User Name"
                            value={userName}
                            disabled={true}
                          />
                          <label>User Name</label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.email && touched.email ? "is-danger" : ""
                          }`}
                        >
                          <input
                            type="email"
                            className="form-control"
                            placeholder="E-mail Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email || ""}
                          />
                          <label>
                            E-mail Address{" "}
                            <span className="d-inline-block">* </span>
                          </label>
                          {errors.email && touched.email ? (
                            <p className="help is-danger">{errors.email}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <h2 className="manage-territories-heading">
                      Password Information
                    </h2>
                    <div className="row">
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.new_password && touched.new_password
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="new_password"
                            value={values.new_password || ""}
                          />
                          <label>New Password</label>
                          {errors.new_password && touched.new_password ? (
                            <p className="help is-danger">
                              {errors.new_password}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className={`form-floating ${
                            errors.confirm_password && touched.confirm_password
                              ? "is-danger"
                              : ""
                          }`}
                        >
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm New Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirm_password"
                            value={values.confirm_password || ""}
                          />
                          <label>Confirm New Password </label>
                          {errors.confirm_password &&
                          touched.confirm_password ? (
                            <p className="help is-danger">
                              {errors.confirm_password}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary width-100 px-4 back-orange"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
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
