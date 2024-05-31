import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminFooter from "./includes/AdminFooter";
import HeaderSidebar from "./includes/HeaderSidebar";
import ToTop from "./includes/ToTop";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const state = useSelector((state) => state.stateVals);
  const { name } = state;
  return (
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
                      <h4 className="mb-1 text-orange">0</h4>
                      <Link
                        to="/admin"
                        className="btn btn-primary px-4 d-block back-blue"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                  <div
                    className="progress radius-10 my-2"
                    style={{ height: "5px" }}
                  >
                    <div
                      className="progress-bar bg-orange"
                      role="progressbar"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-10">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="">
                      <p className="mb-1">Total Managers</p>
                      <h4 className="mb-0 text-orange">Registered</h4>
                    </div>
                    <div className="ms-auto fs-2 text-orange text-center">
                      <h4 className="mb-1 text-orange">381</h4>
                      <Link
                        to="/admin"
                        className="btn btn-primary px-4 d-block back-blue"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                  <div
                    className="progress radius-10 my-2"
                    style={{ height: "5px" }}
                  >
                    <div
                      className="progress-bar bg-orange"
                      role="progressbar"
                      style={{ width: "65%" }}
                    ></div>
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
                      <h4 className="mb-1 text-orange">6958</h4>
                      <Link
                        to="/admin"
                        className="btn btn-primary px-4 d-block back-blue"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                  <div
                    className="progress radius-10 my-2"
                    style={{ height: "5px" }}
                  >
                    <div
                      className="progress-bar bg-orange"
                      role="progressbar"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="manage-heading-2 mt-3">
                <h2>
                  Latest Claims need your attention <span>[7]</span>
                </h2>
              </div>
              <div className="slides-here">
                <div className="alert alert-info">
                  <b>Info!</b> You can search your required data by putting text
                  in search box
                </div>
                <div className="main-content-box">
                  <button className="btn btn-primary px-4 d-block back-blue mb-3 float-lg-end">
                    View all claims
                  </button>
                  <div className="clearfix"></div>
                  <div className="table-responsive">
                    <table className="table caption-top align-middle table-borderless table-style-1">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Employee No</th>
                          <th scope="col">Invoice No</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Size</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Price</th>
                          <th scope="col">Split Sale</th>
                          <th scope="col">Reward</th>
                          <th scope="col">Store Name</th>
                          <th scope="col">Account</th>
                          <th scope="col">User Name</th>
                          <th scope="col">Role</th>
                          <th scope="col">Invoice Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td></td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td className="form-filds">
                            <div className="form-floating">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                              />
                              <label>Search</label>
                            </div>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>MP-6904</td>
                          <td>265896</td>
                          <td>Realign Plus 14 Series M629</td>
                          <td>King (41)</td>
                          <td>1</td>
                          <td>$40</td>
                          <td>Yes</td>
                          <td>$20</td>
                          <td>
                            S & S Sales, Inc.,
                            <br /> ID, Idaho Falls, 83401{" "}
                          </td>
                          <td>9958800</td>
                          <td>Mike Paxton</td>
                          <td>RSA</td>
                          <td>06-12-2021</td>
                          <td className="text-orange">Pending</td>
                          <td>
                            <button className="btn btn-primary px-4 d-block back-blue">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>MP-6904</td>
                          <td>265896</td>
                          <td>Realign Plus 14 Series M629</td>
                          <td>King (41)</td>
                          <td>1</td>
                          <td>$40</td>
                          <td>Yes</td>
                          <td>$20</td>
                          <td>
                            S & S Sales, Inc.,
                            <br /> ID, Idaho Falls, 83401{" "}
                          </td>
                          <td>9958800</td>
                          <td>Mike Paxton</td>
                          <td>RSA</td>
                          <td>06-12-2021</td>
                          <td className="text-orange">Pending</td>
                          <td>
                            <button className="btn btn-primary px-4 d-block back-blue">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>MP-6904</td>
                          <td>265896</td>
                          <td>Realign Plus 14 Series M629</td>
                          <td>King (41)</td>
                          <td>2</td>
                          <td>$40</td>
                          <td>Yes</td>
                          <td>$20</td>
                          <td>
                            S & S Sales, Inc.,
                            <br /> ID, Idaho Falls, 83401{" "}
                          </td>
                          <td>9958800</td>
                          <td>Mike Paxton</td>
                          <td>RSA</td>
                          <td>06-12-2021</td>
                          <td className="text-orange">Pending</td>
                          <td>
                            <button className="btn btn-primary px-4 d-block back-blue">
                              View Details
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>MP-6904</td>
                          <td>265896</td>
                          <td>Realign Plus 14 Series M629</td>
                          <td>King (41)</td>
                          <td>1</td>
                          <td>$40</td>
                          <td>Yes</td>
                          <td>$20</td>
                          <td>
                            S & S Sales, Inc.,
                            <br /> ID, Idaho Falls, 83401{" "}
                          </td>
                          <td>9958800</td>
                          <td>Mike Paxton</td>
                          <td>RSA</td>
                          <td>06-12-2021</td>
                          <td className="text-orange">Pending</td>
                          <td>
                            <button className="btn btn-primary px-4 d-block back-blue">
                              View Details
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
  );
}
