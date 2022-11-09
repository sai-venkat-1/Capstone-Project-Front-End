import React, { useContext } from "react";
import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import { Auth } from "../App";
import { showErrorToastNotification } from "../components/ToastNotification";

function ProtectedRoute({ auth }) {
  let location = useLocation();
  const handleRouteRender = () => {
    if (!auth) {
      // showErrorToastNotification(<p>Login required</p>);
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  };

  return handleRouteRender();
}

export default ProtectedRoute;
