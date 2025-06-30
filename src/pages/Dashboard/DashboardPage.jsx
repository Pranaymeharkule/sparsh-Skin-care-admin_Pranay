import { useState } from "react";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import img8 from "../../assets/Gallery/img8.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here

export default function DashboardPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Admin");

  const togglePassword = () => setShowPassword(!showPassword);

  const roles = [
    { title: "Admin", description: "Full Access" },
    { title: "Editor", description: "Edit Content" },
    { title: "Viewer", description: "Read only" },
  ];

  return (
    <div className="h-screen md:overflow-hidden overflow-auto bg-[#fde7e2] flex flex-col px-8 py-6 relative ">
      {/* Top Row: Logo and Welcome */}
      <div className="flex items-center justify-between mb-8">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
       
      </div>

      {/* Main content */}
      <div className="flex flex-col  md:flex-row items-center justify-center gap-19 md:gap-">
        {/* Left Illustration */}
        <div className="w-full  md:w-1/2">
          <img src={img8} alt="Doctor Illustration" className="w-full md:h-[550px]  md:w-[700px]  " />
        </div>



 <div className="text-center  flex-1">

   <h1 className="text-6xl font-bold md:mr-38  text-gray-900">Welcome</h1>
          <p className="text-gray-600  md:mr-38 mb-9">To the Dashboard of Sparsh Skin Clinic</p>
        {/* Login Form */}
        <div className="bg-[#fceae4] w-full max-w-md p-8 rounded-xl mt- shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Sparsh Skin Care Admin
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Security Administration Access
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-start font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-start font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-start font-medium text-gray-700 mb-1">Access Role</label>
              <div className="flex gap-3 flex-wrap">
                {roles.map((r) => (
                  <div
                    key={r.title}
                    className={`cursor-pointer border rounded-lg px-4 py-2 text-center flex-1 ${
                      role === r.title
                        ? "bg-white border-gray-300 text-gray-700"
                        : "bg-white border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setRole(r.title)}
                  >
                    <div className="font-semibold">{r.title}</div>
                    <div className="text-xs">{r.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remember Me and Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-1">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition"
            >
              Log In
            </button>
          </form>
        </div>
</div>




      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-80000 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
