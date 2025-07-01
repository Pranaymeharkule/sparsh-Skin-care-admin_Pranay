import React, { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import img9 from "../../assets/Gallery/img9.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here
import useFetch from "../../hooks/useFetch";
import conf from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const handleGetOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter youe password");
      return;
    }

    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/auth/forgot-password`,
        data: { email },
      });

      console.log(res);
      if (res.success) {
        toast.success(res.message);
        navigate("/verify-otp", {
          state: { email },
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Login Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";

      toast.error(message);
    } finally {
      setLoading(false);
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
              src={img9}
              alt="Doctor Illustration"
              className="h-auto max-h-full object-cover mx-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            To the Dashboard of Sparsh Skin Clinic
          </p>
          {/* Login Form */}
          <form
            className="bg-[#fceae4] w-full max-w-md p-6 rounded-xl shadow-lg"
            onSubmit={handleGetOTP}
          >
            <h2 className="text-xl font-semibold text-center mb-1">
              Sparsh Skin Care Admin
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              Security Administration Access
            </p>
            <p className="text-center text-sm mb-6">
              Enter your mail id and we will send you the OTP.
            </p>

            <div className="space-y-4 text-start">
              <label className="font-medium ">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
              />
            </div>

            <button
              type="submit"
              className={`mt-6 w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200 ${
                loading && "cursor-not-allowed bg-indigo-800"
              }`}
              disabled={loading}
            >
              Get OTP
            </button>
          </form>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-800 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
