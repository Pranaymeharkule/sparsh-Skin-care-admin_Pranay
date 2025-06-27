import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Admin");

  const togglePassword = () => setShowPassword(!showPassword);

  const roles = [
    { title: "Admin", description: "Full Access" },
    { title: "Editor", description: "Edit Content" },
    { title: "Viewer", description: "Read only" },
  ];

  return (
    <div className="min-h-screen overflow-y-scroll  flex items-center justify-center  px-4">
      <div className=" bg-[#FDE6DD] p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">
          Sparsh Skin Care Admin
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Security Administration Access
        </p>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block tex  text-start font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400  bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-start font-medium ">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="mt-1 w-full px-4 py-2 border bg-white border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-  text-start font-medium text-gray-700 mb-1">
              Access Role
            </label>
            <div className="flex gap-3">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className={`cursor-pointer border rounded-lg px-4 py-2 text-center flex-1 ${
                    role === r.title
                      ? " bg-white border-gray-300 text-gray-700"
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
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="  accent-blue-600" />
              Remembmer me
            </label>
            <Link to="/auth/request-otp" className="hover:underline">
              Forgot Password?
            </Link>
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
  );
}
