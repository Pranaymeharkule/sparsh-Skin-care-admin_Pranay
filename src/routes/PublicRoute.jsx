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
import DashboardPage from "../pages/Dashboard/DashboardPage.jsx";
import OTPLoginCard from "../pages/Dashboard/Dashemail.jsx";
import OTPConfirmPage from "../pages/Dashboard/Dashotp.jsx";
import PasswordResetPage from "../pages/Dashboard/Dashpassword.jsx";
import ServiceManager from "../pages/modules/ServiceManager/ServiceManger.jsx";
import AppointmentManager from "../pages/modules/AppointmentManager/AppointmentManager.jsx";
import AppointmentDetails from "../pages/modules/AppointmentDetails/AppointmentDetails.jsx";
import EditAppointmentDetails from "../pages/modules/AppointmentDetails/EditAppointment.jsx";
import DashboardSetting from '../pages/modules/Setting/Setting.jsx'
import DashbaordNotification from "../pages/modules/Notification/Notification.jsx";
const PublicRoute = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login />
        }
      />
      {/* User Management  */}
      <Route
        path=""
        element={
           <DashboardPage /> 
        }
      />
       <Route
        path="/email"
        element={
           <OTPLoginCard /> 
        }
      />
      <Route path="/otp"
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
      <Route path="/" element={<Login />} />
      <Route path="auth/request-otp" element={<RequestOTP  />} />
      <Route path="auth/verify-otp" element={<VerifyOTP  />} />
      <Route path="auth/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/content" element={<InquiryManager />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/block-date" element={<BlockDate />} />
         <Route path="/services" element={<ServiceManager />} />
        <Route path="/appointments" element={<AppointmentManager />} />
        <Route path="/appointmentdetails" element={<AppointmentDetails />} />
        <Route path="/editappointment" element={<EditAppointmentDetails />} />
        <Route path="/dashboardsetting" element={<DashboardSetting />} />
        <Route path="/dashboardnotification" element={<DashbaordNotification />} />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
