import React, { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import img10 from "../../assets/Gallery/img10.png"; // Doctor illustration
import logo from "../../assets/Gallery/logo asarsh.jpg"; // Add your logo image here
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const [fetchData] = useFetch();
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // Only digits
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < 5 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // Just clear the current input
        newOtp[index] = "";
      } else if (index > 0) {
        // Move to previous input and clear it
        newOtp[index - 1] = "";
        if (inputsRef.current[index - 1]) {
          inputsRef.current[index - 1].focus();
        }
      }

      setOtp(newOtp);
    }
  };

  const handleConfirmOTP = async () => {
    if (!email || !otp) {
      toast.error("Missing email or OTP");
      return;
    }
    setLoading(true);

    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/auth/verify-otp`,
        data: { email, otp: otp.join("") },
      });

      if (res.success) {
        toast.success(res.message);
        navigate("/reset-password", {
          state: { resetToken: res.resetToken, email },
        });
      } else {
        toast.error(res.message || "OTP Verification Failed.");
      }
    } catch (error) {
      console.error("OTP Confirmation Error:", error);
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
      <div className="flex flex-col md:flex-row items-center justify-center gap-19 md:gap-">
        {/* Left Illustration */}
        <div className="w-full md:w-1/2">
          <img src={img10} alt="Doctor Illustration" className="w-full " />
        </div>

        <div className="text-center  flex-1">
          <h1 className="text-6xl font-bold md:mr-38  text-gray-900">
            Enter OTP
          </h1>
          <p className="text-gray-600  md:mr-38 mb-9">
            Enter the OTP to Proceed
          </p>
          {/* Login Form */}
          <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-2xl shadow-xl w-full max-w-md  ">
            <div className="  p-4 rounded mb-4">
              <h2 className="text-xl font-bold text-center text-gray-900">
                Sparsh Skin Care Admin
              </h2>
              <p className="text-center text-sm text-gray-500 mt-1">
                Security Administration Access
              </p>
            </div>

            <div className=" p-4 rounded">
              <p className="text-center   text-gray-800 mb-4">Enter OTP</p>
              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center bg-white text-lg border border-gray-300 rounded-md  focus:ring-2 focus:ring-pink-300 outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleConfirmOTP}
                className="w-full bg-indigo-900 text-white py-2 rounded-md font-semibold shadow hover:bg-indigo-800 transition duration-200"
              >
                Confirm OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-100 bg-purple-800 rounded-full opacity-40 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-800 rounded-full opacity-40 -translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
}
