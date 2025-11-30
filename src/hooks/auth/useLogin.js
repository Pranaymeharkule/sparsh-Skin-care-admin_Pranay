// src/hooks/auth/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import conf from "../../config";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { adminAuthState } from "../../state/authenticatedState/authenticatedState";

const useLogin = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUserInfo = useSetRecoilState(adminAuthState);

  const adminLogin = async ({ email, password, rememberMe }) => {
    const data = { email, password };
    setLoading(true);

    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/login`,   // ✅ http://localhost:5000/api/admin/login
        data,
      });

      console.log("LOGIN RESPONSE:", res);

      if (res.success) {
        // clean old tokens
        localStorage.removeItem("admin_token");
        sessionStorage.removeItem("admin_token");

        if (rememberMe) {
          localStorage.setItem("admin_token", res.token);
        } else {
          sessionStorage.setItem("admin_token", res.token);
        }

        toast.success(res.message || "Login successful");
        setUserInfo({ isAuthenticated: true });
        navigate("/dashboard");
      } else {
        toast.error(res.message || "Invalid email or password");
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

  // keep resetAdmin as it is or remove if not needed
  const resetAdmin = async ({ email, newPassword, confirmPassword }) => {
    const data = { email, newPassword, confirmPassword };
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.resetPasswordUrl}`,
        data,
      });

      if (res.success) {
        console.log(res);
        toast.success(res?.message);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { resetAdmin, adminLogin, loading };
};

export default useLogin;
