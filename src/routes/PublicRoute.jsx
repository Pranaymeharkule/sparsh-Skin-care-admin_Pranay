/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import ServiceManager from "../pages/modules/ServiceManager/ServiceManger.jsx";
import AppointmentManager from "../pages/modules/AppointmentManager/AppointmentManager.jsx";
import ContactInquiryManager from "../pages/modules/ContactInquiryManager/ContactInquiryManager.jsx";

const PublicRoute = () => {

  return (
    <Routes>
      
      <Route
        path="/"
        element={
         <ContactInquiryManager/>
        }
      />
      <Route
        path="/service-manager"
        element={
        <ServiceManager/>
        }
      />
      <Route
        path="/appointment-manager"
        element={
         <AppointmentManager/>
        }
      />
    </Routes>
  )
};

export default PublicRoute;
