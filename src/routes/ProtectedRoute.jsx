import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { adminAuthState } from "../state/authenticatedState/authenticatedState";
import { useRecoilValue } from "recoil";

const ProtectedRoute = () => {
  const authState = useRecoilValue(adminAuthState);

  const token =
    localStorage.getItem("admin_token") ||
    sessionStorage.getItem("admin_token");

  if (!token || !authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
