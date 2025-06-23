/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";

const PublicRoute = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login />
        }
      />
      {/* User Management  */}
      <Route
        path="/example"
        element={
          {/* <UserManagementPanel /> */ }
        }
      />
    </Routes>
  )
};

export default PublicRoute;
