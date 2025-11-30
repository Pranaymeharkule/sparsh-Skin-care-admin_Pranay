import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  const sendOTP = async (email) => {
    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/admin/forgot-password`, {
        email,
      });

      return { success: true, message: res.data.message };
    } catch (err) {
      return { success: false, message: err?.response?.data?.message || "Failed to send OTP" };
    } finally {
      setLoading(false);
    }
  };

  return { sendOTP, loading };
}
