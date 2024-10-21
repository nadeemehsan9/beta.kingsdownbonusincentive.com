import React, { useLayoutEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import useSortableData from "../../../hooks/useSortableData";
import useTable from "../../../hooks/useTable";

import AdminListService from "../../../services/admin-list.service";

import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";

import HeaderSidebar from "../includes/HeaderSidebar";

import ToTop from "../includes/ToTop";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import NewsLetterModal from "./NewsLetterModal";
import { useSelector } from "react-redux";

export default function ManagerNewsletter() {
  const state = useSelector((state) => state.stateVals);
  const { id: adminId } = state;
  const TITLE = "Kings Down | Manage Newsletter";
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [resultData, setResultData] = useState([]);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("");

  const changePagination = (e) => {
    setCurrentPage(e);

    let pageNo = e;

    const getResultData = async () => {
      setLoading(true);

      try {
        const response = await AdminListService.getPaginationNewsletterList(
          pageNo,
          limit
        );

        let resultData;
        if (response.status === 206) {
          resultData = response.data.response;

          setResultData(resultData);
          setLimit(response.data.per_page);
          setLoading(false);
        }
      } catch (err) {
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const delData = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#70b0c1",
      cancelButtonColor: "#e60000",
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          await AdminListService.deleteNewsletter(delId, adminId);
          setLoading(false);

          toast.success("Deleted Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          getCityData();
        } catch (err) {
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
      }
    });
  };

  const getCityData = async () => {
    setLoading(true);
    try {
      const response = await AdminListService.getNewsletterList();
      let resultData;
      if (response.status === 206) {
        resultData = response.data.response;
        setResultData(resultData);
        setLimit(response.data.per_page);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("1");

      setResultData([]);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getCityData();
  }, []);

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    const getClassNamesFor = (name) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
      <>
        <table className="table caption-top align-middle table-borderless table-style-1">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("id")}
                className={getClassNamesFor("id")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("description")}
                className={getClassNamesFor("description")}
              >
                Description
              </th>

              <th
                scope="col"
                onClick={() => requestSort("Action")}
                className={getClassNamesFor("Action")}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((el, index) => (
                <tr key={el.id}>
                  <td>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * limit + index + 1}
                  </td>
                  <td>
                    {el.description > "" ? el.description.toUpperCase() : "N/A"}
                  </td>
                  {/* <td>{el.zip}</td> */}
                  {/* <td>
                    <Link
                      to={"/admin/edit-city/" + el.id}
                      className="btn btn-primary px-4  back-blue"
                    >
                      Edit <i className="bi bi-pencil-fill"></i>{" "}
                    </Link>
                  </td> */}
                  <td className="add-edit-delete-inline">
                    <NewsLetterModal id={el.id} />
                    {/* <Link
                  data-target=""
                      to={""}
                      className="btn btn-primary px-4  back-blue"
                    >
                      View <i className="bi bi-binoculars"></i>{" "}
                    </Link> */}
                    <Link
                      to={"/admin/update-newsletter/" + el.id}
                      className="btn btn-primary px-4  back-blue"
                    >
                      Edit <i className="bi bi-pencil-fill"></i>{" "}
                    </Link>
                    <button
                      className="btn btn-primary px-4 back-blue"
                      onClick={() => delData(el.id)}
                    >
                      Delete <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-capitalize">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalResults > limit && totalPages > 1 ? (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={parseInt(limit)}
            totalItemsCount={totalResults}
            onChange={(e) => {
              changePagination(e);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            firstPageText="First Page"
            lastPageText="Last Page"
          />
        ) : (
          ""
        )}
      </>
    );
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
                    TEMPLATE NEWSLETTERS LIST <span>[{totalResults}]</span>
                  </h2>
                </div>

                <div className="slides-here">
                  {/* <div className="alert alert-info">
                  You can search your required data by putting text in search
                  box
                </div> */}
                  <div className="main-content-box rzl-tabl">
                    <div className="col-lg-12">
                      <h2 className="manage-territories-heading">Page Notes</h2>
                      <ul className="rob-rollmann">
                        <li>
                          If you want to send newletter to all employees click
                          on "View Custom* Newsletters" then preview and send.
                        </li>
                        <li>
                          *Custom News letter are those news letters which
                          consist of images with their text
                        </li>
                      </ul>
                    </div>
                    <hr />
                    <h2 className="ewslet_temp">
                      Please Choose Default Newsletter Here
                    </h2>
                    {/* <form onSubmit={handleSubmit} noValidate>
                    <div className="row mb-3">
                      <div className="col-lg-3">
                        <select
                          className={`form-select ${
                            errors.fieldtype && touched.fieldtype
                              ? "is-danger"
                              : ""
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="fieldtype"
                          value={values.fieldtype || ""}
                          required
                        >
                          <option value="">Select</option>
                          <option value="2">State Name</option>
                        </select>
                        {errors.fieldtype && touched.fieldtype ? (
                          <p className="help is-danger">{errors.fieldtype}</p>
                        ) : null}
                      </div>

                      <div className="col-lg-4 ">
                        <div className="input-group">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.searchval && touched.searchval
                                ? "is-danger"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="searchval"
                            placeholder="Enter something to search"
                            value={values.searchval || ""}
                            required
                          />

                          <button
                            className="btn btn-outline-secondary sebmit-dat"
                            type="submit"
                          >
                            Search
                          </button>
                        </div>
                        {errors.searchval && touched.searchval ? (
                          <p className="help is-danger">{errors.searchval}</p>
                        ) : null}
                      </div>

                      <div className="col-lg-2 ">
                        <select
                          className="form-select"
                          value={limit}
                          onChange={(e) => changeLimit(e.target.value)}
                        >
                          <option value="10">10</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="250">250</option>
                          <option value="500">500</option>
                        </select>
                      </div>
                      <div className="col-lg-1 ">
                        <button
                          className="btn btn-outline-secondary"
                          type="reset"
                          onClick={() => window.location.reload(false)}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form> */}
                    {/* <MoveTable /> */}
                    <div className="table-responsive">
                      <Table data={resultData} rowsPerPage={limit} />
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
