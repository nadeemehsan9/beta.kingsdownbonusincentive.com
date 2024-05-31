import { useFormik } from "formik";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";

import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import useSortableData from "../../../hooks/useSortableData";
import useTable from "../../../hooks/useTable";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { quizSearch } from "../../../schema";
import AdminListService from "../../../services/admin-list.service";

import AdminFooter from "../includes/AdminFooter";
import HeaderSidebar from "../includes/HeaderSidebar";
import MoveTable from "../includes/MoveTable";
import ToTop from "../includes/ToTop";
import { Helmet } from "react-helmet";

export default function ReportsHistory() {
  const TITLE = "Kings Down | Reports History";
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");
  const { height, width } = useWindowDimensions();

  // TODO from else part
  const changeLimit = (e) => {
    let newLimit = e;
    // console.log(limit);
    const getResultData = async () => {
      try {
        if (values.fieldtype === "" && values.searchval === "") {
          setLoading(true);

          setLimit(newLimit);
          const response = await AdminListService.getPaginatedReportHistory(
            "1",
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

          const response = await AdminListService.getSearchReportHistory(
            values.fieldtype,
            values.searchval,
            newLimit,
            "1"
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;

            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
            setCurrentPage(1);
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
        if (err?.response?.status === 404) {
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

  // TODO
  const changePagination = (e) => {
    setCurrentPage(e);

    // console.log(e)
    let pageNo = e;
    // setLimit(newLimit);
    // console.log(limit);
    const getResultData = async () => {
      setLoading(true);

      try {
        if (values.fieldtype === "" && values.searchval === "") {
          setLoading(true);

          const response = await AdminListService.getPaginatedReportHistory(
            pageNo,
            limit
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;
            setResultData(resultData);
            setTotalResults(response.data.records);
            setCurrentPage(pageNo);
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

          const response = await AdminListService.getSearchReportHistory(
            values.fieldtype,
            values.searchval,
            limit,
            pageNo
          );

          let resultData;
          if (response.status === 206) {
            setLoading(false);
            resultData = response.data.response;

            setResultData(resultData);
            setTotalResults(response.data.records);
            setTotalPages(response.data.total_pages);
            setLimit(response.data.per_page);
            setCurrentPage(pageNo);
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
        if (err?.response?.status === 404) {
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
      const response = await AdminListService.getSearchReportHistory(
        values.fieldtype,
        values.searchval,
        limit,
        "1"
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
      if (err?.response?.status === 500) {
        setLoading(false);
      } else {
        setLoading(false);
        setResultData([]);
      }
    }
  };

  useLayoutEffect(() => {
    const getResultData = async () => {
      setLoading(true);
      try {
        const response = await AdminListService.getReportHistoryList();
        let resultData;
        resultData = response.data.response;
        setResultData(resultData);
        setLimit(response.data.per_page);
        setTotalResults(response.data.records);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setTotalPages("1");
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    getResultData();
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
        <table className=" caption-top align-middle table-borderless table-style-1">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => requestSort("index")}
                className={getClassNamesFor("index")}
              >
                No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("Subject")}
                className={getClassNamesFor("Subject")}
              >
                Subject
              </th>
              <th
                scope="col"
                onClick={() => requestSort("Date")}
                className={getClassNamesFor("Date")}
              >
                Date
              </th>
              <th
                scope="col"
                onClick={() => requestSort("Path")}
                className={getClassNamesFor("Path")}
              >
                File Path
              </th>
              <th
                scope="col"
                onClick={() => requestSort("From")}
                className={getClassNamesFor("From")}
              >
                Sent From
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
                  <td>{el.subject}</td>
                  <td>
                    {el.created_at == "0000-00-00"
                      ? "N/A"
                      : moment(el.created_at).format("MM-DD-YYYY")}
                  </td>
                  <td>
                    {el.file_path}
                    {/* <Link
                      to={"/admin/edit-store/" + el.id}
                      className="btn btn-primary px-4 back-blue"
                    >
                      Edit <i className="bi bi-pencil-fill"></i>{" "}
                    </Link> */}
                  </td>
                  <td>{el.send_from}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-capitalize">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        fieldtype: "",
        searchval: "",
      },
      validationSchema: quizSearch,
      onSubmit: (values, action) => {
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
          <HeaderSidebar />
          <main className="page-content">
            <div className="row">
              <div className="col">
                <div className="manage-heading-2">
                  <h2>
                    Report's History <span>[{totalResults}]</span>
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
                            <option value="1">Subject</option>
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
                    {/* <MoveTable /> */}
                    <div className="claim-table">
                      <Table data={resultData} rowsPerPage={limit} />
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
