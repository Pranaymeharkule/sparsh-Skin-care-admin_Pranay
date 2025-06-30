import React, { useState, useRef } from "react";

import { Eye, EyeOff } from "lucide-react";
import img11 from "../../assets/Gallery/img11.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here

export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      alert("Password reset successful!");
      // Add API logic here
    } else {
      alert("Passwords do not match!");
    }
  };
  return (
    <div className="min-h-screen bg-[#fde7e2] px-8 py-6">
      {/* Top Row: Logo and Welcome */}
      <div className="flex items-center justify-between mb-8">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-2">
        {/* Left Illustration */}
        <div className="">
          <img src={img11} alt="Doctor Illustration" className=" object-contain h-full" />
        </div>

        <div className="text-center flex-1 mx-auto">
          <h1 className="text-6xl font-bold text-gray-900">
            New Password
          </h1>
          <p className="text-gray-600  md:mr-38 mb-9">
            Generate a new password
          </p>
          {/* Login Form */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-2xl shadow-xl w-full max-w-md ">
            <div className="  p-4 rounded mb-4">
              <h2 className="text-xl font-bold text-center text-gray-900">
                Sparsh Skin Care Admin
              </h2>
              <p className="text-center text-sm text-gray-500 mt-1">
                Security Administration Access
              </p>

              <div className="mt-6">
                <label className="block text-sm  text-start font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div className="mt-4 relative">
                <label className="block  text-start text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 bg-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      {/* <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-800 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div> */}
    </div>
  );
}
