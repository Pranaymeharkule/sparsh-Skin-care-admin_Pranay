import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"; 
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import AppointmentDashboard from "./pages/modules/AppointmentManager/AppointmentManager";
import Layout from "./components/layouts/Layout";
import InquiryManager from "./pages/modules/Inquiry/Inquiry";
import Gallery from "./pages/modules/Gallary/Gallary";
import BlockDate from "./pages/modules/BlockDate/BlockDate";
import ServiceManager from "./pages/modules/ServiceManager/ServiceManger";
import ViewAppoinment from "./pages/modules/AppointmentManager/ViewAppoinment";
import AppointmentManager from "./pages/modules/AppointmentManager/AppointmentManager.jsx";
import AppointmentDetails from "./pages/modules/AppointmentDetails/AppointmentDetails";
import EditAppointmentDetails from "./pages/modules/AppointmentDetails/EditAppointment";
import DashboardSetting from "./pages/modules/Setting/Setting";
import Notification from "./pages/modules/Notification/Notification";
import OTPPage from "./pages/modules/Setting/OTPconfirm";
import NewPassword from "./pages/modules/Setting/NewPassword";
import EditSetting from "./pages/modules/Setting/EditSetting";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* User Management  */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<AppointmentDashboard />} />
            <Route path="/content" element={<InquiryManager />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/block-date" element={<BlockDate />} />
            <Route path="/services" element={<ServiceManager />} />
            <Route path="appointments">
              <Route index element={<AppointmentManager />} />
              <Route path="view/:id" element={<ViewAppoinment />} />
            </Route>

            <Route
              path="/appointmentdetails"
              element={<AppointmentDetails />}
            />
            <Route
              path="/editappointment"
              element={<EditAppointmentDetails />}
            />

            <Route path="/setting" element={<DashboardSetting />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/otpemail" element={<OTPPage />} />
            <Route path="/newpassword" element={<NewPassword />} />
            <Route path="/editsetting" element={<EditSetting />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
