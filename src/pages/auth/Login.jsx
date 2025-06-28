import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
const BsEyeFill = (props) => {
  return (
    <svg
      {...props} // allows className, style, onClick, etc.
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip0_3718_1080">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <mask
          id="mask0_3718_1080"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <path d="M24 0H0V24H24V0Z" fill="white" />
        </mask>
      </defs>
      <g clipPath="url(#clip0_3718_1080)">
        <g mask="url(#mask0_3718_1080)">
          <path
            d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z"
            fill="#272727"
          />
          <path
            d="M12.0001 21.0205C8.24008 21.0205 4.69008 18.8205 2.25008 15.0005C1.19008 13.3505 1.19008 10.6605 2.25008 9.00047C4.70008 5.18047 8.25008 2.98047 12.0001 2.98047C15.7501 2.98047 19.3001 5.18047 21.7401 9.00047C22.8001 10.6505 22.8001 13.3405 21.7401 15.0005C19.3001 18.8205 15.7501 21.0205 12.0001 21.0205ZM12.0001 4.48047C8.77008 4.48047 5.68008 6.42047 3.52008 9.81047C2.77008 10.9805 2.77008 13.0205 3.52008 14.1905C5.68008 17.5805 8.77008 19.5205 12.0001 19.5205C15.2301 19.5205 18.3201 17.5805 20.4801 14.1905C21.2301 13.0205 21.2301 10.9805 20.4801 9.81047C18.3201 6.42047 15.2301 4.48047 12.0001 4.48047Z"
            fill="#272727"
          />
        </g>
      </g>
    </svg>
  );
};


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
                {showPassword ? <BsEyeFill size={20} /> : <FiEyeOff size={20} />}
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
