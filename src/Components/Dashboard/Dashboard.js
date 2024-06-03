import moment from "moment";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useSortableData from "../../hooks/useSortableData";
import useTable from "../../hooks/useTable";
import UserService from "../../services/user.service";

import AdminFooter from "../Admin/includes/AdminFooter";
import HeaderSidebar from "../Admin/includes/HeaderSidebar";

import ToTop from "../Admin/includes/ToTop";
import useLibrary from "../../hooks/useLibrary";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const TITLE = "Kings Down | Dashboard";

  const { convertObject } = useLibrary();
  const { convertString } = useLibrary();

  const [loading, setLoading] = useState(true);
  const [claimCounter, setClaimCounter] = useState("");
  const [pendingClaimCounter, setPendingClaimCounter] = useState("");
  const [rsaCounter, setRsaCounter] = useState("");

  const [limit, setLimit] = useState("10");
  const [resultData, setResultData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState("0");
  const [totalPages, setTotalPages] = useState("1");

  const [percentage, setPercentage] = useState({
    claimPercentage: 0,
    managerPercentage: 0,
    rsaPercentage: 0,
  });

  const state = useSelector((state) => state.stateVals);
  const { name, id } = state;

  useEffect(() => {
    const resultData = async () => {
      setLoading(true);
      try {
        const response = await UserService.pendingClaims();
        setPendingClaimCounter(response.data.response);
        setLoading(false);
      } catch (err) {
        setPendingClaimCounter("0");
        setLoading(false);
      }
    };
    resultData();
  }, []);

  useEffect(() => {
    const resultData = async () => {
      setLoading(true);
      try {
        const response = await UserService.totalClaims();
        setClaimCounter(response.data.response);
        setLoading(false);
      } catch (err) {
        setClaimCounter("0");
        setLoading(false);
      }
    };
    resultData();
  }, []);

  useEffect(() => {
    const resultData = async () => {
      setLoading(true);
      try {
        const response = await UserService.totalRsa();
        setRsaCounter(response.data.response);
        setLoading(false);
      } catch (err) {
        setRsaCounter("0");
        setLoading(false);
      }
    };
    resultData();
  }, []);

  useLayoutEffect(() => {
    const getPercentage = async () => {
      try {
        const response = await UserService.getPercentage();
        console.log("test");
        const { data } = response;
        const { response: res } = data;
        setPercentage({
          claimPercentage: res[0].claim,
          rsaPercentage: res[1].rsa,
        });
      } catch (err) {
        if (err?.response?.status === 404) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };

    const getResultData = async () => {
      setLoading(true);

      try {
        let resultData;

        const response = await UserService.pendingClaimsList();
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
    getPercentage();
  }, []);

  const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);
    const { items, requestSort, sortConfig } = useSortableData(slice);

    const getClassNamesFor = (name) => {};

    return (
      <>
        <table className="table-bordered caption-top align-middle  table-style-1">
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
                onClick={() => requestSort("employee")}
                className={getClassNamesFor("employee")}
              >
                Employee No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("invoice")}
                className={getClassNamesFor("invoice")}
              >
                Invoice No
              </th>

              <th
                scope="col"
                onClick={() => requestSort("product")}
                className={getClassNamesFor("product")}
              >
                Product Name
              </th>

              <th
                scope="col"
                onClick={() => requestSort("quantity")}
                className={getClassNamesFor("quantity")}
              >
                Quantity
              </th>

              <th
                scope="col"
                onClick={() => requestSort("reward")}
                className={getClassNamesFor("reward")}
              >
                Reward
              </th>

              <th
                scope="col"
                onClick={() => requestSort("username")}
                className={getClassNamesFor("username")}
              >
                Username
              </th>

              <th
                scope="col"
                onClick={() => requestSort("role")}
                className={getClassNamesFor("role")}
              >
                Role
              </th>

              <th
                scope="col"
                onClick={() => requestSort("invoice_date")}
                className={getClassNamesFor("invoice_date")}
              >
                Invoice Date
              </th>

              <th
                scope="col"
                onClick={() => requestSort("status")}
                className={getClassNamesFor("status")}
              >
                Status
              </th>
              <th
                scope="col"
                onClick={() => requestSort("action")}
                className={getClassNamesFor("action")}
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
                  <td>{convertObject(el.empNum)}</td>
                  <td>{convertObject(el.deliver_invoice)}</td>
                  {/* <td>{convertObject(el.prodName)}</td> */}
                  <td>{`${el.code}/${el.prodName}/$${el.price}`}</td>
                  <td>{convertObject(el.ship_quantity)}</td>

                  <td>${el.price * el.ship_quantity}</td>

                  <td>{el.username}</td>
                  <td>{convertString(el.role)}</td>
                  <td>
                    {el.invoice_date === "0000-00-00"
                      ? "N/A"
                      : moment(el.invoice_date).format("MM-DD-YYYY")}
                  </td>
                  {el.sale_status === "rejected" && (
                    <td className="rejected">
                      <i
                        className="fa fa-thumbs-down"
                        style={{ color: "#dc3545" }}
                      >
                        {" "}
                        Rejected
                      </i>{" "}
                      <br />
                      {/* <strong>Reason:</strong> {el.reject_reason} */}
                    </td>
                  )}
                  {el.sale_status === "approved" && (
                    <td className="approved">
                      <i
                        className="fa fa-thumbs-up"
                        style={{ color: "#28a745" }}
                      >
                        {" "}
                        Approved
                      </i>
                      <br />
                      {/* <strong>Reason:</strong> {el.approved_reason} */}
                    </td>
                  )}
                  {el.sale_status === "pending" && (
                    <td className="pending">
                      <i className="fa fa-clock-o" style={{ color: "#696158" }}>
                        {" "}
                        Pending
                      </i>
                      <br />
                      {/* <strong>Reason:</strong> {el.approved_reason} */}
                    </td>
                  )}
                  <td>
                    <Link
                      to={"/admin/dashboard/view-detail/" + el.salesID}
                      className="btn p-0  text-left"
                      style={{ color: "#70b0c1" }}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center text-capitalize">
                  No record found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
          <HeaderSidebar />

          <main className="page-content">
            <div className="manage-heading-2">
              <h2>
                Welcome, <span>{name}</span>
              </h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xxl-3 gy-3">
              <div className="col">
                <div className="card radius-10">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="mb-1">Total Claims</p>
                        <h4 className="mb-0 text-orange">Filed Today</h4>
                      </div>
                      <div className="ms-auto fs-2 text-orange text-center">
                        <h4 className="mb-1 text-orange">{claimCounter}</h4>
                        <Link
                          to="/admin/claims"
                          className="btn btn-primary px-4 d-block back-blue"
                        >
                          More
                        </Link>
                      </div>
                    </div>

                    {/* Claims Percentage */}
                    <div className="progress" style={{ marginTop: "6px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentage.claimPercentage}%` }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {percentage.claimPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card radius-10">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="">
                        <p className="mb-1">Total RSA's</p>
                        <h4 className="mb-0 text-orange">Registered</h4>
                      </div>
                      <div className="ms-auto fs-2 text-orange text-center">
                        <h4 className="mb-1 text-orange">{rsaCounter}</h4>
                        <Link
                          to="/admin/view-rsa"
                          className="btn btn-primary px-4 d-block back-blue"
                        >
                          More
                        </Link>
                      </div>
                    </div>

                    {/* Rsa Percentage */}
                    <div className="progress" style={{ marginTop: "6px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentage.rsaPercentage}%` }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {percentage.rsaPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="manage-heading-2 mt-3">
                  <h2>
                    Latest Claims need your attention{" "}
                    <span>[{pendingClaimCounter}]</span>
                  </h2>
                </div>
                <div className="slides-here">
                  <div className="alert alert-info">
                    <b>Info!</b> You can search your required data by putting
                    text in search box
                  </div>
                  <div className="main-content-box ">
                    <Link
                      className="btn btn-primary px-4 d-block back-blue mb-3 float-lg-end"
                      to="/admin/claims"
                    >
                      View all claims
                    </Link>
                    <div className="clearfix"></div>

                    <div className="claim-table">
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
