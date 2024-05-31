import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
// import { UserContext } from "../../../Components/context/UserContext";
import UserService from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreaters } from "../../../Redux";

function CheckAdminForgetToken() {
  const TITLE = "Change Password";

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userActions = bindActionCreators(actionCreaters, dispatch);
  // const { dispatch: ctxDispatch } = useContext(UserContext);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  // console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/admin");
    } else {
      CheckForgotToken(token);
    }
  }, [token]);

  const logOut = async () => {
    //   ctxDispatch({
    //     type: "LOGOUT",
    //   });
    userActions.logOut();
    setLoading(false);
  };

  const CheckForgotToken = async (token) => {
    setLoading(true);
    try {
      const response = await UserService.checkToken(token);
      if (response.status === 200) {
        setLoading(false);
        userActions.forgot({
          forgotToken: token,
        });

        navigate("/admin/change-pass");
        logOut();
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: err?.response?.statusText,
          icon: "error",
          confirmButtonText: "Try Again",
        });
        navigate("/admin");
      } else {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Some thing went wrong",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        navigate("/admin");
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className={`loader ${loading ? "in" : ""}`}>
        <div className="spinner-border main-spin"></div>
      </div>
    </>
  );
}

export default CheckAdminForgetToken;
