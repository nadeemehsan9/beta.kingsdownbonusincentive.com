import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";
import Login from "./Components/User/Login/Login";
import AdminLogin from "./Components/Admin/Login/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import AllClaims from "./Components/Admin/Claims/AllClaims";
import AcceptedClaims from "./Components/Admin/Claims/AcceptedClaims";
import RejectedClaims from "./Components/Admin/Claims/RejectedClaims";
import ArchivedClaim from "./Components/Admin/Claims/Archived_Claim/ArchivedClaim";

import ViewRsa from "./Components/Admin/Participants/ViewRSAs";

import ProfileAdmin from "./Components/Admin/ProfileAdmin/ProfileAdmin";

import AddProduct from "./Components/Admin/Products/AddProduct";

import ViewProduct from "./Components/Admin/Products/ViewProduct";
import ReportsHistory from "./Components/Admin/Reports/ReportsHistory";

import AddNewsletter from "./Components/Admin/Newsletter/AddNewsletter";
import ManageNewsletter from "./Components/Admin/Newsletter/ManageNewsletter";

import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { bindActionCreators } from "redux";
import { actionCreaters } from "./Redux";
import Welcome from "./Components/User/Welcome/Welcome";
import PrevClaims from "./Components/User/Claims/PrevClaims";

import PrivacyStatement from "./Components/PrivacyStatement/PrivacyStatement";
import ProfileInfo from "./Components/Account/ProfileInfo";

import ViewDetails from "./Components/User/Claims/ViewDetails";
import FileClaims from "./Components/User/Claims/FileClaims";
import ForgotPass from "./Components/User/ForgotPassword/ForgotPass";
import Registration from "./Components/User/Registration/Registration";
import TermCondition from "./Components/User/Registration/TermCondition";
import ChangePass from "./Components/User/ChangePass/ChangePass";
import CheckForgetToken from "./Components/User/ForgotPassword/CheckForgetToken";
import RegPrivacyStatement from "./Components/User/Registration/RegPrivacyStatement";
import ViewDetail from "./Components/Dashboard/ViewDetail";

import AdminForgotPass from "./Components/Admin/AdminForgotPass/AdminForgotPass";
import CheckAdminForgetToken from "./Components/Admin/AdminForgotPass/CheckAdminForgetToken";
import AdminChangePass from "./Components/Admin/AdminForgotPass/AdminChangePass";
import EditUser from "./Components/Admin/Participants/EditUser";
import UpdateNewsletter from "./Components/Admin/Newsletter/UpdateNewsletter";

import EditProduct from "./Components/Admin/Products/EditProduct";
import ViewRSAsDeactivate from "./Components/Admin/Participants/ViewRSAsDeactivate";
import NotFound from "./Components/NotFound";
import AddRetailers from "./Components/Admin/Retailers/AddRetailers";
import ViewRetailers from "./Components/Admin/Retailers/ViewRetailers";
import EditRetailers from "./Components/Admin/Retailers/EditRetailers";

function App() {
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  const navigate = useNavigate();
  const locat = useLocation();
  const state = useSelector((state) => state.stateVals);
  // const { state, dispatch: ctxDispatch } = useContext(UserContext);
  const { id, accessToken, uType } = state;

  let decoded;

  useEffect(() => {
    // auto logout code start
    if (accessToken) {
      decoded = jwt_decode(accessToken);
      // console.log("expiry date:" + decoded.exp);
      // console.log("current date:" + Math.floor(new Date().getTime() / 1000));
      // var date = new Date(decoded.exp * 1000);
      // console.log(date.toLocaleTimeString("en-US"));
      // const current = new Date();
      // const time = current.toLocaleTimeString("en-US");
      // console.log(time);
    }

    if (
      accessToken &&
      uType !== "admin" &&
      uType !== "dos" &&
      uType !== "ndos" &&
      uType !== "1099"
    ) {
      if (Math.floor(new Date().getTime() / 1000) > decoded.exp) {
        userActions.logOut(null);
        Swal.fire({
          title: "Expired!",
          text: "Your Login Session expired!",
          icon: "error",
          confirmButtonText: "Login Again",
        });
        navigate("/");
      }
      if (
        locat.pathname === "/" ||
        locat.pathname === "/forgot-pass" ||
        locat.pathname === "/registration" ||
        locat.pathname === "/forgot-pass/" ||
        locat.pathname === "/registration/" ||
        locat.pathname === "/register-statement" ||
        locat.pathname === "/register-statement/"
      ) {
        navigate("/welcome");
      }
    } else {
      if (
        locat.pathname !== "/forgot-pass" &&
        locat.pathname !== "/forgot-pass/" &&
        locat.pathname !== "/forgot-token" &&
        locat.pathname !== "/change-pass" &&
        locat.pathname !== "/term-and-conditions" &&
        locat.pathname !== "/register-statement" &&
        locat.pathname !== "/register-statement/" &&
        locat.pathname !== "/registration" &&
        locat.pathname.indexOf("admin") <= -1 &&
        locat.pathname.indexOf("1099") <= -1
      ) {
        navigate("/");
      }
    }

    // admin login conditions
    const callFun = window["onUrlChange"];
    if (
      accessToken &&
      uType !== "rsa" &&
      uType !== "manager" &&
      uType !== "corporate" &&
      uType !== "1099"
    ) {
      // auto logout code start
      if (Math.floor(new Date().getTime() / 1000) > decoded.exp) {
        userActions.logOut(null);
        Swal.fire({
          title: "Expired!",
          text: "Your Login Session expired!",
          icon: "error",
          confirmButtonText: "Login Again",
        });
        navigate("/admin");
      }
      // auto logout code end
      if (
        locat.pathname === "/admin" ||
        locat.pathname === "/admin/" ||
        locat.pathname === "/admin/forgot-pass" ||
        locat.pathname === "/admin/forgot-pass/"
      ) {
        callFun();
        navigate("/admin/dashboard");
      }
    } else {
      if (
        locat.pathname !== "/admin/forgot-pass" &&
        locat.pathname !== "/admin/forgot-token" &&
        locat.pathname !== "/admin/change-pass" &&
        locat.pathname !== "/admin/forgot-pass/" &&
        locat.pathname !== "/admin/change-pass/" &&
        locat.pathname.indexOf("admin") > -1
      ) {
        navigate("/admin");
      }
    }
  }, [locat.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/welcome" element={<Welcome />} />
      <Route path="/prev-claims" element={<PrevClaims />} />

      <Route path="/privacy-statement" element={<PrivacyStatement />} />
      <Route path="/profile-info" element={<ProfileInfo />} />
      <Route path="/claim-detail/:id" element={<ViewDetails />} />
      <Route path="/submit-claim" element={<FileClaims />} />
      <Route path="/forgot-pass" element={<ForgotPass />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/term-and-conditions" element={<TermCondition />} />
      <Route path="/change-pass" element={<ChangePass />} />
      <Route path="/forgot-token" element={<CheckForgetToken />} />
      <Route path="/register-statement" element={<RegPrivacyStatement />} />

      {/* admin routing here  */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/forgot-pass" element={<AdminForgotPass />} />
      <Route path="/admin/forgot-token" element={<CheckAdminForgetToken />} />
      <Route path="/admin/change-pass" element={<AdminChangePass />} />
      <Route path="/admin/profile-admin" element={<ProfileAdmin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/dashboard/view-detail/:id" element={<ViewDetail />} />
      <Route path="/admin/claims" element={<AllClaims />} />
      <Route path="/admin/accepted-claim" element={<AcceptedClaims />} />
      <Route path="/admin/rejected-claim" element={<RejectedClaims />} />
      <Route path="/admin/archived-claim" element={<ArchivedClaim />} />

      <Route path="/admin/view-rsa" element={<ViewRsa />} />
      <Route
        path="/admin/view-deactivated-rsa"
        element={<ViewRSAsDeactivate />}
      />

      <Route path="/admin/edit/:type/:id" element={<EditUser />} />

      <Route path="/admin/add-product" element={<AddProduct />} />

      <Route path="/admin/view-product" element={<ViewProduct />} />
      <Route path="/admin/reports-history" element={<ReportsHistory />} />

      <Route path="/admin/add-newsletter" element={<AddNewsletter />} />
      <Route path="/admin/manage-newsletter" element={<ManageNewsletter />} />

      <Route
        path="/admin/update-newsletter/:id"
        element={<UpdateNewsletter />}
      />

      <Route path="/admin/edit-product/:id" element={<EditProduct />} />

      <Route path="/admin/add-retailers" element={<AddRetailers />} />

      <Route path="/admin/view-retailers" element={<ViewRetailers />} />
      <Route path="/admin/edit-retailers/:id" element={<EditRetailers />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
