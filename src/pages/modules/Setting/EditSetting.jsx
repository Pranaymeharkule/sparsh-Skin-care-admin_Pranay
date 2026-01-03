import React, { useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function EditSetting() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    if (!email) return alert("Enter email");

    try {
      await api.post("/doctor-profile/send-otp", { email });
      navigate("/otp", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="p-6">
      <input
        className="border p-3 w-full"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleGetOtp}
        className="bg-indigo-900 text-white p-3 mt-4 w-full"
      >
        Send OTP
      </button>
    </div>
  );
}
