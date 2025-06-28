import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleGetOTP = () => {
    navigate("/auth/verify-otp");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-gray-900">
          Sparsh Skin Care Admin
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1">
          Security Administration Access
        </p>
        <p className="text-center text-gray-700 mt-4">
          Enter your mail id and we will send you the OTP.
        </p>

        <div className="mt-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-left"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleGetOTP}
          className="mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
};

export default RequestOTP;
