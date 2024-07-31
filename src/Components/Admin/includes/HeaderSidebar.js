import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux/index";
import { useSelector } from "react-redux";
import AdminListService from "../../../services/admin-list.service";

export default function HeaderSidebar() {
  const [loading, setLoading] = useState(false);
  const [allYears, setAllYears] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const state = useSelector((state) => state.stateVals);
  const { name, uType } = state;

  var welcomeFname;
  if (name) {
    welcomeFname = name.split(" ");
  } else {
    welcomeFname = "Unknown";
  }

  const logOut = async (e) => {
    e.preventDefault();
    setLoading(true);
    userActions.logOut(null);
    setLoading(false);
    navigate("/admin");
  };

  const getAllYears = async () => {
    try {
      const response = await AdminListService.getAllYears();

      setAllYears(response.data.response);
    } catch (err) {
      setAllYears([]);
    }
  };

  useLayoutEffect(() => {
    getAllYears();
  }, []);

  const date = new Date();
  var time = date.getTime();

  return (
    <>
      <header className="top-header">
        <nav className="navbar navbar-expand gap-3">
          <div className="mobile-toggle-icon fs-3">
            <i className="bi bi-list"></i>
          </div>
          <div className="top-navbar-right ms-auto">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/profile-admin">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/admin/"
                  onClick={(e) => {
                    logOut(e);
                  }}
                >
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <div className="red-welcome">
                  <div className="trianles">
                    {" "}
                    <img
                      src="/admin_assets/images/lef-red.png"
                      className="lef-red"
                      alt=""
                    />{" "}
                    <img
                      src="/admin_assets/images/rig-red.png"
                      className="rig-red"
                      alt=""
                    />{" "}
                    <div className="welcome-txt">
                      Welcome - {welcomeFname[0] ? welcomeFname[0] : "Unknown"}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
          <Link to="/admin/dashboard">
            <img
              src="/admin_assets/images/logo-icon.png"
              className="logo-icon"
              alt="logo icon"
            />
          </Link>
          <div>
            <img
              src="/admin_assets/images/logo-icon-2.png"
              className="logo-icon-2"
              alt="logo icon"
            />
          </div>
          <div className="toggle-icon ms-auto">
            {" "}
            <i className="bi bi-list"></i>
          </div>
        </div>

        <ul className="metismenu" id="menu">
          <li>
            <Link to="/admin/dashboard">
              <div className="parent-icon">
                <i className="fadeIn animated bx bx-home-circle"></i>
              </div>
              <div className="menu-title">Dashboard</div>
            </Link>
          </li>

          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="bi bi-grid-fill"></i>
              </div>
              <div className="menu-title">Claims</div>
            </a>
            <ul>
              <li>
                <Link to="/admin/claims">
                  <i className="bi bi-circle"></i>Latest Claims
                </Link>
              </li>
              <li>
                <a
                  href="/"
                  className="has-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="bi bi-circle"></i>Processed Claims
                </a>
                <ul>
                  <li>
                    <Link to="/admin/accepted-claim">
                      <i className="bi bi-circle"></i>Accepted Claims
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/rejected-claim">
                      <i className="bi bi-circle"></i>Rejected Claims
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="fadeIn animated bx bx-archive-in"></i>
              </div>
              <div className="menu-title">Archive Claims</div>
            </a>
            <ul>
              <li>
                <Link
                  to={
                    uType == "dos"
                      ? "/admin/archived-dos-claim"
                      : "/admin/archived-claim"
                  }
                >
                  <i className="bi bi-circle"></i>All Archive Claims
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="bi bi-person-lines-fill"></i>
              </div>
              <div className="menu-title">Participants</div>
            </a>
            <ul>
              <li>
                <Link to="/admin/view-rsa">
                  <i className="bi bi-circle"></i>View RSA's
                </Link>
              </li>
              <li>
                <Link to="/admin/view-deactivated-rsa">
                  <i className="bi bi-circle"></i>View Deactivated RSA's
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="fadeIn animated bx bx-layer"></i>
              </div>
              <div className="menu-title">Product</div>
            </a>
            <ul>
              <li>
                <Link to="/admin/add-product">
                  <i className="bi bi-circle"></i>Add Product
                </Link>
              </li>

              <li>
                <Link to="/admin/view-product">
                  <i className="bi bi-circle"></i>View All Products
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="fadeIn animated bx bi-basket3-fill"></i>
              </div>
              <div className="menu-title">RETAILERS</div>
            </a>
            <ul>
              <li>
                <Link to="/admin/add-retailers">
                  <i className="bi bi-circle"></i>Add Retailers
                </Link>
              </li>

              <li>
                <Link to="/admin/view-retailers">
                  <i className="bi bi-circle"></i>View All Retailers
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="lni lni-library "></i>
              </div>
              <div className="menu-title">REPORTS</div>
            </a>
            <ul>
              <li>
                <a
                  href="/"
                  className="has-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="bi bi-circle"></i>Export All Claims
                </a>
                <ul>
                  {allYears.length > 0 &&
                    allYears.map((data) => (
                      <li>
                        <Link
                          to={`https://claims-api.elitestacks.com/v1/export-report-claims-kings/${data}?time=${time}`}
                        >
                          <i className="bi bi-circle"></i>
                          {data}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <a
                  href="/"
                  className="has-arrow"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <i className="bi bi-circle"></i>Download 1099 Report
                </a>
                <ul>
                  {allYears.length > 0 &&
                    allYears.map((data) => (
                      <li>
                        <Link
                          to={`https://claims-api.elitestacks.com/v1/export-1099-report/${data}?time=${time}`}
                        >
                          <i className="bi bi-circle"></i>
                          {data}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <Link to="/admin/reports-history">
                  <i className="bi bi-circle"></i>Reports History{" "}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="/"
              className="has-arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <div className="parent-icon">
                <i className="lni lni-book"></i>
              </div>
              <div className="menu-title">Newsletter</div>
            </a>
            <ul>
              <li>
                <Link to="/admin/add-newsletter">
                  <i className="bi bi-circle"></i>Add Newsletter
                </Link>
              </li>
              <li>
                <Link to="/admin/manage-newsletter">
                  <i className="bi bi-circle"></i>Manage Newsletter
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </>
  );
}
