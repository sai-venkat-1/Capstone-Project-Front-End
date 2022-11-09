import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { showErrorToastNotification } from "../components/ToastNotification";

function UnAuthOnlyRoutes({ auth }) {
  const handleRouteRender = () => {
    if (!auth) {
      return <Outlet />;
    } else {
      return <Navigate to={"/operations"} />;
    }
  };
  return handleRouteRender();
}

export default UnAuthOnlyRoutes;
