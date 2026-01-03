import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/axiosInstance";

export default function NewPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = async () => {
    if (password !== confirm) return alert("Passwords do not match");

    await api.post("/doctor-profile/reset-password", {
      email: state.email,
      newPassword: password,
    });

    alert("Password updated successfully");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirm(e.target.value)}
        className="border p-2 w-full mt-3"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-900 text-white p-3 mt-4 w-full"
      >
        Save Password
      </button>
    </div>
  );
}
