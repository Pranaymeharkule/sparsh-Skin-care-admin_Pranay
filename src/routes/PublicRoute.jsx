/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"; 
import { Route, Routes } from "react-router-dom";
import InquiryManager from "../pages/modules/Inquiry/Inquiry.jsx";
import Layout from "../components/layouts/Layout.jsx"; 
import Login from "../pages/auth/Login.jsx";
import BlockDate from "../pages/modules/BlockDate/BlockDate.jsx";
import Gallery from "../pages/modules/Gallary/Gallary.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import RequestOTP from "../pages/auth/RequestOTP.jsx";
import VerifyOTP from "../pages/auth/VerifyOTP.jsx";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="auth/request-otp" element={<RequestOTP  />} />
      <Route path="auth/verify-otp" element={<VerifyOTP  />} />
      <Route path="auth/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/content" element={<InquiryManager />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/block-date" element={<BlockDate />} />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
