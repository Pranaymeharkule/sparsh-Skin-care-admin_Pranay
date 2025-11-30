import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import img11 from "../../assets/Gallery/img11.png";
import logo from "../../assets/Gallery/logo asarsh.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import conf from "../../config";
import useFetch from "../../hooks/useFetch";
import { isValidPassword } from "../../utils/validator/validator";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email, resetToken } = location.state || {};

  const [fetchData] = useFetch();

  // Prevent direct access
  if (!email || !resetToken) {
    toast.error("Invalid access. Please verify OTP again.");
    navigate("/forgot-password");
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (![newPassword, confirmPassword].every(isValidPassword)) {
      toast.error("Please enter a strong password");
      return;
    }

    const res = await fetchData({
      method: "POST",
url: `${conf.apiBaseUrl}/reset-password`,
      data: { email, resetToken, newPassword, confirmPassword },
    });

    if (res.success) {
      toast.success("Password reset successfully!");
      navigate("/login");
    } else {
      toast.error(res.message || "Failed to reset password");
    }
  };

  return (
    <div className="h-full overflow-x-scroll bg-[#fde7e2] flex flex-col px-8 relative ">
      <div className="flex items-center justify-between my-4">
        <img src={logo} alt="Sparsh Logo" className="w-16 h-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center lg:px-10 flex-1">
        <div className="relative overflow-visible">
          <img src={img11} alt="Doctor Illustration" className="mx-auto max-h-full" />
        </div>

        <div className="flex flex-col items-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">New Password</h1>
          <p className="text-gray-600 mb-6">Generate a new password</p>

          <div className="bg-[#fceae4] w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-1">Sparsh Skin Care Admin</h2>
            <p className="text-gray-500 text-sm mb-6">Security Administration Access</p>

            <form className="space-y-4" onSubmit={handleSave}>
              <div>
                <label className="block font-medium">New Password</label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3.5"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
