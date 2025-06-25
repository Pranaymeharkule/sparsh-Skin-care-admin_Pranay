/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import OTPLoginCard from "../pages/Dashboard/Dashemail.jsx";
import OTPConfirmPage from "../pages/Dashboard/Dashotp.jsx";
import PasswordResetPage from "../pages/Dashboard/Dashpassword.jsx";

const PublicRoute = () => {

  return (
    <Routes>
      <Route
        path=""
        element={
          <Login />
        }
      />
      {/* User Management  */}
      <Route
        path="/dashboard"
        element={
           <DashboardPage /> 
        }
      />
       <Route
        path="/emailotp"
        element={
           <OTPLoginCard /> 
        }
      />
      <Route
        path="/otp"
        element={
           <OTPConfirmPage /> 
        }
      />
       <Route
        path="/resetpassword"
        element={
           <PasswordResetPage /> 
        }
      />
    </Routes>
  )
};

export default PublicRoute;
