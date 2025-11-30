import React, { useState, useRef } from "react";
import img10 from "../../assets/Gallery/img10.png";
import logo from "../../assets/Gallery/logo asarsh.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import conf from "../../config";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fetchData] = useFetch();

  const handleChange = (el, index) => {
    const value = el.value.replace(/\D/, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
      } else if (index > 0) {
        newOtp[index - 1] = "";
        inputsRef.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };

  const handleConfirmOTP = async () => {
    if (!email) {
      toast.error("Invalid access. Try again.");
      return navigate("/forgot-password");
    }

    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Enter complete 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetchData({
  method: "POST",
url: `${conf.apiBaseUrl}/verify-otp`,
  data: { email, otp: otp.join("") },
});


      if (res.success) {
        toast.success("OTP verified successfully!");
        navigate("/reset-password", {
          state: { resetToken: res.resetToken, email },
        });
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-x-scroll bg-[#fde7e2] flex flex-col px-8 relative ">
      <div className="flex items-center justify-between my-4">
        <img src={logo} alt="Logo" className="w-16" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        <div className="w-full md:w-1/2">
          <img src={img10} className="w-full" />
        </div>

        <div className="flex-1 text-center">
          <h1 className="text-6xl font-bold mb-2">Enter OTP</h1>
          <p className="text-gray-600 mb-6">Enter the OTP to proceed</p>

          <div className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-2xl shadow-xl max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-900">Sparsh Admin</h2>
            <p className="text-sm text-gray-500 mb-6">Security Access</p>

            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="w-12 h-12 text-center text-lg bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300"
                />
              ))}
            </div>

            <button
              onClick={handleConfirmOTP}
              className="w-full bg-indigo-900 text-white py-2 rounded-md font-semibold hover:bg-indigo-800"
            >
              {loading ? "Verifying..." : "Confirm OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
