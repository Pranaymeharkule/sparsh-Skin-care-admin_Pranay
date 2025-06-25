/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"; 
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import InquiryManager from "../pages/modules/Inquiry/Inquiry.jsx";
import Layout from "../components/layouts/Layout.jsx"; 
import BlockDate from "../pages/modules/BlockDate/BlockDate.jsx";
import Gallery from "../pages/modules/Gallary/Gallary.jsx";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/content" element={<InquiryManager />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/block-date" element={<BlockDate />} />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
