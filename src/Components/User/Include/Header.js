import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";

export default function Header() {
  let locatEURL = useLocation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);

  const state = useSelector((state) => state.stateVals);
  const { name, uType, id } = state;

  var welcomeFname;
  if (name) {
    welcomeFname = name.split(" ");
  } else {
    welcomeFname = "Unknown";
  }

  const logOut = async (event) => {
    event.preventDefault();

    setLoading(true);
    userActions.logOut(null);
    setLoading(false);
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <header>
        <div className="row">
          <div className="col-lg-2 pe-lg-0 d-flex align-items-center justify-content-center">
            <Link to="/welcome">
              <img src="/images/logo-white.png" className="logo" alt="" />
            </Link>
          </div>
          <div className="col-lg-10 ps-lg-0">
            <div className="top-contacts">
              <div className="row">
                <div className="col-lg-6">
                  <div className="fax-con">
                    <div>
                      Fax-Number:
                      <a href="fax:866-632-6450"> 866-632-6450</a> Phone
                      Number:
                      <a href="tel:866-354-8321"> 866-354-8321</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="apps-dtl">
                    <Link to="/" onClick={(e) => logOut(e)}>
                      Logout{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-items">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                  className="navbar-toggler hmbrgr"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link
                        className={`nav-link ${
                          locatEURL.pathname === "/welcome" ? "active" : ""
                        }`}
                        aria-current="page"
                        to="/welcome"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Claims
                      </a>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/submit-claim">
                          File a Claim
                        </Link>
                        <Link className="dropdown-item" to="/prev-claims">
                          View Previous Claims
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        type="button"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </a>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile-info">
                          My Info
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="red-welcome">
                <div className="trianles">
                  <img
                    src="/images/lef-red.png"
                    className="lef-red"
                    alt="lef-red.png"
                  />
                  <img
                    src="/images/rig-red.png"
                    className="rig-red"
                    alt="rig-red.png"
                  />
                  <div className="welcome-txt">
                    Welcome - {welcomeFname[0] ? welcomeFname[0] : "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </>
  );
}
