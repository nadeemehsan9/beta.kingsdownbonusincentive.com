import React, { useLayoutEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useSortableData from "../../../hooks/useSortableData";
import useTable from "../../../hooks/useTable";

import UserService from "../../../services/user.service";
import Footer from "../Include/Footer";
import "../Include/general.css";
import Header from "../Include/Header";

import { Helmet } from "react-helmet";

export default function Welcome() {
  const TITLE = "Kings Down | Welcome";
  const state = useSelector((state) => state.stateVals);
  const { id } = state;

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState("10");

  const [resultData, setResultData] = useState([]);

  useLayoutEffect(() => {
    const getClaimsData = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await UserService.recentClaim(id);

          let resultData;
          if (response.status === 200) {
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
      }
    };
    getClaimsData();
  }, [id]);

  const Table = ({ data, rowsPerPage }) => {
    const { slice } = useTable(data, 1, rowsPerPage);
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
                onClick={() => requestSort("deliver_invoice")}
                className={getClassNamesFor("deliver_invoice")}
              >
                Invoice No
              </th>
              <th
                scope="col"
                onClick={() => requestSort("reward")}
                className={getClassNamesFor("reward")}
              >
                Total Amount
              </th>
              <th
                scope="col"
                onClick={() => requestSort("sale_status")}
                className={getClassNamesFor("sale_status")}
              >
                Status
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.deliver_invoice}</td>
                  {/* <td>{"$ " + el.price}</td> */}
                  <td>$ {el.reward}</td>

                  {el.sale_status === "rejected" && (
                    <td className="rejected" style={{ color: "#dc3545" }}>
                      <i
                        className="fa fa-thumbs-down"
                        style={{ color: "#dc3545" }}
                      ></i>{" "}
                      Rejected
                    </td>
                  )}
                  {el.sale_status === "pending" && (
                    <td className="rejected" style={{ color: "#696158" }}>
                      <i
                        className="fa fa-clock-o"
                        style={{ color: "#696158" }}
                      ></i>{" "}
                      Pending
                    </td>
                  )}
                  {el.sale_status === "approved" && (
                    <td className="rejected" style={{ color: "#28a745" }}>
                      <i
                        className="fa fa-thumbs-up"
                        style={{ color: "#28a745" }}
                      ></i>{" "}
                      Approved
                    </td>
                  )}
                  {/* <td>
                    <span
                      style={{
                        color:
                        el.sale_status === "rejected"
                            ? "#dc3545"
                            : el.sale_status === "pending"
                            ? "#696158"
                            : el.sale_status === "approved"
                            ? "#28a745"
                            : "",
                        textTransform: "uppercase",
                      }}
                    >
                      {el.sale_status}
                    </span>
                  </td> */}
                  <td>
                    <Link
                      to={`/claim-detail/${el.sales_id}`}
                      className="orng-textbtn"
                    >
                      View Details
                    </Link>
                  </td>
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

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="user-panel">
        <section className="main-ban">
          <div className="container">
            <Header />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="traning-awards">
                  <h1 className="mban-head text-uppercase">KingsDown Bonus</h1>
                  <h6 className="mban-ligh">Incentive</h6>
                  <Link to="/submit-claim" className="red-round-btn">
                    {" "}
                    FILE A CLAIM{" "}
                  </Link>
                </div>
              </div>
              <div className="col-lg-7">
                <img
                  src="images/mban-pik.png"
                  className="img-fluid mban-img"
                  alt="images top"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="blue-wlcm">
          <div className="container">
            <div className="bluebg-box">
              <h2>
                welcome to
                <span> Kings Down Bonus Incentive</span>
              </h2>
              <p>
                For questions regarding your claims Email:
                <a href="mailTo:customercare@eliterewards.biz">
                  {" "}
                  customercare@eliterewards.biz
                </a>{" "}
                or call <a href="tel:866-354-8321"> 866-354-8321</a>. Claims can
                also be faxed to <a href="fax:866-632-6450.">866-632-6450</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="claims-part">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h2 className="gen-hed" id="home">
                  Recent <span className="slide-heading">Claims</span>
                </h2>
              </div>
              <div className="col-md-4">
                <div className="viewall-clm">
                  <Link to="/prev-claims" className="red-round-btn">
                    View All Claims
                  </Link>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="table-holder rzl-tabl">
                  <div className="table-responsive">
                    <Table data={resultData} rowsPerPage={limit} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <div className={`loader ${loading ? "in" : ""}`}>
          <div className="spinner-border main-spin"></div>
        </div>
      </div>
    </>
  );
}
