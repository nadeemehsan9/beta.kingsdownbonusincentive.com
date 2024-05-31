import React, { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    if (window.location.pathname.indexOf("admin") > -1) {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  }, []);
  return <></>;
}
