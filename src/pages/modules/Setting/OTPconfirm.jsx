import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../../api/axiosInstance";

export default function OTPConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const inputs = useRef([]);

  const verifyOtp = async () => {
    const otp = inputs.current.map(i => i.value).join("");
    if (otp.length !== 6) return alert("Enter full OTP");

    try {
      await api.post("/doctor-profile/verify-otp", {
        email: state.email,
        otp,
      });
      navigate("/new-password", { state: { email: state.email } });
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="p-6">
      <h2>Enter OTP</h2>
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            maxLength={1}
            ref={(el) => (inputs.current[i] = el)}
            className="border w-10 text-center"
          />
        ))}
      </div>
      <button onClick={verifyOtp} className="mt-4 bg-indigo-900 text-white p-3">
        Verify OTP
      </button>
    </div>
  );
}
