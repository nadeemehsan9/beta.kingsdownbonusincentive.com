import { CKEditor } from "ckeditor4-react";
import React, { useState } from "react";
import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import ToTop from "../includes/ToTop";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import AdminListService from "../../../services/admin-list.service";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import he from "he";
import { useSelector } from "react-redux";
import { addNewsletterVal } from "../../../schema";

export default function UpdateNewsletter() {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  const [body, setBody] = useState("");

  const state = useSelector((state) => state.stateVals);
  const { id: adminId } = state;

  useEffect(() => {
    const getResult = async (e) => {
      try {
        setLoading(true);
        const response = await AdminListService.getNewsletterById(id);
        setSubject(response.data.response.subject);
        setBody(he.decode(response.data.response.body));
        setLoading(false);
      } catch (err) {
        setLoading(false);

        toast.error("Something went wrong!", {
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
    };
    getResult();
  }, []);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,

    initialValues: {
      subject: subject,
      body: body,
    },
    validationSchema: addNewsletterVal,
    onSubmit: (values, action) => {
      // if (emailerror === "") {
      updateData(values);
      // }
    },
  });

  const updateData = async (values) => {
    values.body = he.encode(values.body);
    values.updated_by = adminId;

    try {
      setLoading(true);
      const response = await AdminListService.updateNewsletterById(id, values);
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
      setLoading(false);
      setTimeout(() => {
        navigate("/admin/manage-newsletter");
      }, 1000);
    } catch (err) {
      setLoading(false);

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

  return (
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

              <form onSubmit={handleSubmit} noValidate>
                <div className="slides-here">
                  <div className="main-content-box">
                    <div className="row">
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
                        {body && (
                          <CKEditor
                            initData={body}
                            config={{
                              allowedContent: true,
                              toolbar: [
                                ["Source"],
                                ["Styles", "Format", "Font", "FontSize"],
                                [
                                  "Cut",
                                  "Copy",
                                  "Paste",
                                  "PasteText",
                                  "PasteFromWord",
                                  "-",
                                  "Undo",
                                  "Redo",
                                ],
                                [
                                  "Bold",
                                  "Italic",
                                  "Strike",
                                  "UnderLine",
                                  "RemoveFormat",
                                ],
                                ["Link", "Unlink", "Anchor"],
                                [
                                  "NumberedList",
                                  "BulletedList",
                                  "-",
                                  "Outdent",
                                  "Indent",
                                  "-",
                                  "Blockquote",
                                  "CreateDiv",
                                  "-",
                                  "JustifyLeft",
                                  "JustifyCenter",
                                  "JustifyRight",
                                  "JustifyBlock",
                                  "-",
                                  "BidiLtr",
                                  "BidiRtl",
                                  "Language",
                                ],
                                ["EasyImageUpload"],
                                ["TextColor", "BGColor"],
                                ["Maximize", "ShowBlocks"],
                              ],
                              extraPlugins: "easyimage",
                              removePlugins: "image",
                              height: "800px",
                              cloudServices_uploadUrl:
                                "https://33333.cke-cs.com/easyimage/upload/",
                              cloudServices_tokenUrl:
                                "https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt",
                            }}
                            onInstanceReady={(e) => {}}
                            onChange={(e) => {
                              var data = e.editor.getData();

                              setFieldValue("body", data);
                            }}
                          />
                        )}
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-lg-4">
                          <button className="btn btn-primary width-100 px-4 back-blue">
                            Update
                          </button>
                        </div>
                      </div>
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
  );
}
