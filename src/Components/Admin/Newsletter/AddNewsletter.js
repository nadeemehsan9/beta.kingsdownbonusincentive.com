import { CKEditor } from "ckeditor4-react";
import React, { useLayoutEffect, useState } from "react";
import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import AdminListService from "../../../services/admin-list.service";
import { addNewsletterVal } from "../../../schema";
import axios from "axios";
import he from "he";
import secureLocalStorage from "react-secure-storage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddNewsletter() {
  const TITLE = "Kings Down | Newsletter";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state) => state.stateVals);
  const { id } = state;
  const addNewsletter = async (values) => {
    setLoading(true);

    try {
      let updatedValues = { ...values, id };
      const response = await AdminListService.addNewsletter(updatedValues);

      setLoading(false);
      toast.success("Newsletter Created", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/admin/manage-newsletter");
      }, 1000);
    } catch (err) {
      if (err?.response?.data?.subject?.length) {
        toast.error(err.response.data.subject[0], {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (err?.response?.data?.body?.length) {
        toast.error(err.response.data.body[0], {
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

  const getIp = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    const weIp = res.data.IPv4;
    secureLocalStorage.setItem("ip", weIp);
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      subject: "",
      body: "",
    },
    validationSchema: addNewsletterVal,
    onSubmit: (values) => {
      addNewsletter(values);
    },
  });
  useLayoutEffect(() => {
    getIp();
  }, [handleSubmit]);
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="semi-dark">
        <div className="wrapper">
          <HeaderSidebar />
          <ToastContainer />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>Add New Newsletter</h2>
                </div>

                <div className="slides-here">
                  <div className="main-content-box">
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="col-lg-12">
                        <label className="form-label">Subject</label>
                        <div className="form-floating">
                          <input
                            type="text"
                            placeholder="Subject"
                            className={`form-control ${
                              errors.subject && touched.subject
                                ? "is-danger"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="subject"
                            value={values.subject || ""}
                          />
                          <label>Subject</label>
                          {errors.subject && touched.subject ? (
                            <p className="help is-danger">{errors.subject}</p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <CKEditor
                          config={{
                            toolbar: [
                              ["Source"],
                              ["Styles", "Format", "Font", "FontSize"],
                              ["Undo", "Redo"],
                              [
                                "Bold",
                                "Italic",
                                "Strike",
                                "UnderLine",
                                "RemoveFormat",
                              ],
                              ["Link", "Unlink", "Anchor"],
                              ["BulletedList", "NumberedList"],
                              ["EasyImageUpload"],
                              ["Maximize", "ShowBlocks"],
                            ],
                            allowedContent: true,
                            height: "800px",
                            extraPlugins: "easyimage",
                            removePlugins: "image",
                            cloudServices_uploadUrl:
                              "https://33333.cke-cs.com/easyimage/upload/",
                            cloudServices_tokenUrl:
                              "https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt",
                          }}
                          initData='<table align="center" border="0" cellpadding="10" cellspacing="0" style="width:800px">
                        <tbody>
                          <tr>
                            <td colspan="2"><img alt="ashely-bg" src="https://claims-api.elitestacks.com/resources/images/header-kings.png" /></td>
                          </tr>
                          <tr>
                            <td colspan="2" style="vertical-align:top">
                            <h1>This is the main heading of this template</h1>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</td>
                          </tr>
                          <tr>
                            <td style="vertical-align:top">
                            <h2>Another heading</h2>
                      
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                      
                            <h3><em>THIS ONE GOES DEEPER</em></h3>
                      
                            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      
                            <h3>AND A LEVEL-3 TITLE AGAIN</h3>
                      
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                      
                            <p>&nbsp;</p>
                            </td>
                            <td style="vertical-align:top">
                            <h1>Heading 1</h1>
                      
                            <h2>Heading 2</h2>
                      
                            <h3>Heading 3</h3>
                      
                            <p>Heading 4</p>
                      
                            <p>Heading 5</p>
                      
                            <p>Heading 6</p>
                            <a href="#">Link</a></td>
                          </tr>
                          <tr>
                            <td colspan="2" style="vertical-align:top">
                            <h3>And we end with a level-3 heading</h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</td>
                          </tr>
                          <tr>
                            <td colspan="2"><img src="https://claims-api.elitestacks.com/resources/images/banner-kings.png" /></td>
                          </tr>
                          <tr>
                            <td colspan="2">Copyrights 2023</td>
                          </tr>
                        </tbody>
                      </table>
                      '
                          onInstanceReady={(e) => {
                            var data = e.editor.getData();
                            const bodyData = he.encode(data);
                            setFieldValue("body", bodyData);
                          }}
                          onChange={(e) => {
                            var data = e.editor.getData();
                            const bodyData = he.encode(data);
                            setFieldValue("body", bodyData);
                          }}
                        />
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary width-100 px-4 back-blue"
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
