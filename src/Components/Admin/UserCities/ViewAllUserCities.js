import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import useSortableData from "../../../hooks/useSortableData";
import useTable from "../../../hooks/useTable";
import { quizSearch } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";
import AdminFooter from "../includes/AdminFooter";
import CheckUtype from "../includes/CheckUtype";
import HeaderSidebar from "../includes/HeaderSidebar";
import MoveTable from "../includes/MoveTable";
import ToTop from "../includes/ToTop";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function ViewAllUserCities() {
  const TITLE = "Kings Down | View Cities";
  const state = useSelector((state) => state.stateVals);
  const { id: adminId } = state;
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { height, width } = useWindowDimensions();
  const [resultData, setResultData] = useState([]);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("");

  const changeLimit = (e) => {
    let newLimit = e;
    console.log(limit);
    const getResultData = async () => {
      try {
        if (values.fieldtype === "" && values.searchval === "") {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getNewLimitCityListUser(
            newLimit
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;
            setResultData(resultData);
            setTotalResults(response.data.records);
            setCurrentPage(1);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (values.fieldtype !== "" && values.searchval !== "") {
          setLoading(true);

          setLimit(newLimit);

          const response = await AdminListService.getSearchCityListUser(
            values.fieldtype,
            values.searchval,
            newLimit
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;
            console.log(response.data.response);
            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
          } else {
            setTotalResults("0");
            setTotalPages("1");
            setResultData([]);
            setLoading(false);
          }
        } else if (values.fieldtype !== "" || values.searchval !== "") {
          handleSubmit();
        }
      } catch (err) {
        if (err.response.status === 404) {
          setTotalResults("0");
          setTotalPages("1");
          setResultData([]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const changePagination = (e) => {
    setCurrentPage(e);

    // console.log(e)
    let pageNo = e;
    // setLimit(newLimit);
    console.log(limit);
    const getResultData = async () => {
      setLoading(true);

      try {
        const response = await AdminListService.getPaginationCityListUser(
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
        if (err.response.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
  };

  const searchData = async (action) => {
    setLoading(true);
    try {
      const response = await AdminListService.getSearchCityListUser(
        values.fieldtype,
        values.searchval,
        limit
      );
      let resultData;
      if (response.status === 206) {
        setLoading(false);
        resultData = response.data.response;
        setResultData(resultData);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setLimit(response.data.per_page);
      } else {
        setTotalResults("0");
        setTotalPages("1");
        setResultData([]);
        setLoading(false);
      }
    } catch (err) {
      setTotalPages("1");
      setTotalResults("0");
      if (err.response.status === 500) {
        setLoading(false);
      } else {
        setLoading(false);
        setResultData([]);
      }
    }
  };

  const getCityData = async () => {
    setLoading(true);
    try {
      const response = await AdminListService.getCityListUser();
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
      if (err.response.status === 404) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    getCityData();
  }, []);

  const delData = async (delId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#696158",
      cancelButtonColor: "#e60000",
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          await AdminListService.deleteUserCity(delId, adminId);
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
                onClick={() => requestSort("city")}
                className={getClassNamesFor("city")}
              >
                City Name
              </th>
              <th
                scope="col"
                onClick={() => requestSort("zip")}
                className={getClassNamesFor("zip")}
              >
                Zip Code
              </th>
              <th
                scope="col"
                onClick={() => requestSort("code")}
                className={getClassNamesFor("code")}
              >
                State Code
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
                  <td>{el.city}</td>
                  <td>{el.zip}</td>
                  <td>{el.state_code}</td>
                  <td className="add-edit-delete-inline text-start">
                    <Link
                      to={"/admin/edit-user-city/" + el.id}
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
        {/* {totalResults > limit && totalPages > 1 ? (
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
        )} */}
      </>
    );
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      enableReinitialize: true,

      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
        // action.resetForm();
        searchData(action);
      },
    });
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <div className="semi-dark">
        <div className="wrapper">
          <CheckUtype />
          <ToastContainer />
          <HeaderSidebar />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>
                    All Cities <span>[{totalResults}]</span>
                  </h2>
                </div>

                <div className="slides-here">
                  <div className="alert alert-info">
                    You can search your required data by putting text in search
                    box
                  </div>
                  <div className="main-content-box rzl-tabl">
                    <form onSubmit={handleSubmit} noValidate>
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
                            <option value="1">City Name</option>
                            <option value="2">Zip Code</option>
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
                            <option>10</option>
                            <option>50</option>
                            <option>100</option>
                            <option>200</option>
                            <option>300</option>
                            <option>400</option>
                            <option>500</option>
                            <option>600</option>
                            <option>700</option>
                            <option>800</option>
                            <option>900</option>
                            <option>1000</option>
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
                    </form>
                    <MoveTable />
                    <div className="table-responsive">
                      <Table data={resultData} rowsPerPage={limit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="pagi">
                  {totalResults > limit && totalPages > 1 ? (
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={parseInt(limit)}
                      totalItemsCount={totalResults}
                      onChange={(e) => {
                        changePagination(e);
                      }}
                      pageRangeDisplayed={
                        width >= 1024
                          ? 8
                          : width >= 768
                          ? 6
                          : width >= 425
                          ? 3
                          : width >= 375
                          ? 2
                          : 1
                      }
                      itemClass="page-item"
                      linkClass="page-link"
                      firstPageText="First Page"
                      lastPageText="Last Page"
                    />
                  ) : (
                    ""
                  )}
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
