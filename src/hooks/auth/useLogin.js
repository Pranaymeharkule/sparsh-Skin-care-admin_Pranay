import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import conf from "../../config/index";
import useFetch from "../useFetch";
import { toast } from "react-toastify";
import { adminAuthState } from "../../state/authenticatedState/authenticatedState";

const useLogin = () => {
  const [fetchData] = useFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const setUserInfo = useSetRecoilState(adminAuthState); 

  const adminLogin = async ({ email, password, role, rememberMe }) => {
    const data = { email, password, role };
    setLoading(true);
    try {
      const res = await fetchData({
        method: "POST",
        url: `${conf.apiBaseUrl}/admin/login`,
        data,
      });

      console.log(res)

      if (res.success) {
        localStorage.removeItem("admin_token");
        sessionStorage.removeItem("admin_token");

        if (rememberMe) {
          localStorage.setItem("admin_token", res.token);
        } else {
          sessionStorage.setItem("admin_token", res.token);
        }

        toast.success(res?.message);
        setUserInfo({
          isAuthenticated: true,
        });
        navigate("/dashboard");
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
        // sessionStorage.setItem("admin_token", res.token);
        console.log(res);
        toast.success(res?.message);
        // setUserInfo({
        //   isAuthenticated: true,
        // });
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

  return {
    resetAdmin,
    adminLogin,
    loading,
  };
};

export default useLogin;
