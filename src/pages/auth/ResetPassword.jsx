import React, { useState, useRef } from "react";

import { Eye, EyeOff } from "lucide-react";
import img11 from "../../assets/Gallery/img11.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here

export default function ResetPassword() {
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
    <div className="h-full overflow-x-scroll bg-[#fde7e2] flex flex-col px-8 relative ">
      {/* Top Row: Logo and Welcome */}
      <div className="flex items-center justify-between my-4">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
      </div>

      {/* Main content */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center lg:px-10 flex-1">
        {/* Left Illustration */}
        <div className="relative overflow-visible">
          <div className="flex items-center overflow-x-visible overflow-y-hidden h-full">
            <img
              src={img11}
              alt="Doctor Illustration"
              className="h-auto max-h-full object-cover mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">New Password</h1>
          <p className="text-gray-600 mb-6">Generate a new password</p>

          <div className="bg-[#fceae4] w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-1">
              Sparsh Skin Care Admin
            </h2>
            <p className=" text-gray-500 text-sm mb-6">
              Security Administration Access
            </p>

            {/* Form */}
            <form className="space-y-4 text-start">
              <div>
                <label className="block font-medium ">New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium ">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Enter confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3.5 "
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSave}
                className="mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      {/* <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-800 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div> */}
    </div>
  );
}
