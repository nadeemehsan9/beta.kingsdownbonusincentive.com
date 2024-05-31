import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function CheckUtype() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = secureLocalStorage.getItem("uType");
    if (userType === "dos") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);
  return <></>;
}
