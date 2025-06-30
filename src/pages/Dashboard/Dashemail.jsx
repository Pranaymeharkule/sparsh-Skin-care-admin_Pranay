import React, { useState } from 'react';


import { Eye, EyeOff } from "lucide-react";
import img9 from "../../assets/Gallery/img9.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here

export default function OTPLoginCard() {
  const [email, setEmail] = useState('');

  const handleGetOTP = () => {
    // Add your OTP sending logic here
    alert(`OTP will be sent to: ${email}`);
  };
  return (
    <div className="h-screen md:overflow-hidden overflow-auto bg-[#fde7e2] flex flex-col px-8 py-6 relative">
      {/* Top Row: Logo and Welcome */}
      <div className="flex items-center justify-between mb-8">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
       
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-19 md:gap-">
        {/* Left Illustration */}
        <div className="w-full  px-8 md:w-[800px]">
          <img src={img9} alt="Doctor Illustration" className="w-full md:h-[550px]  md:w-[700px] " />
        </div>



 <div className="text-center text-top-0 flex-1">

   <h1 className="text-4xl font-bold md:mr-38  text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600  md:mr-38 mb-9">To the Dashboard of Sparsh Skin Clinic</p>
        {/* Login Form */}
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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




      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-800 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
