import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { adminAuthState } from "../../state/authenticatedState/authenticatedState";
import useFetch from "../useFetch";
import conf from "../../config/index";

const useFetchUser = () => {
  const [fetchData] = useFetch();
  const setAuth = useSetRecoilState(adminAuthState);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("admin_token");
      if (!token) return;

      try {
        const res = await fetchData({
          method: "GET",
          url: `${conf.admingetProfileUrl}`, 
        });

        if (res.success) {
          setAuth({
            isAuthenticated: true,
            user: res, 
          });
        } else {
          console.error("User fetch failed:", res.message);
          setAuth({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error("Fetch user error:", error);
        sessionStorage.removeItem("admin_token");
        setAuth({ isAuthenticated: false, user: null });
      }
    };

    fetchUser();
  }, []);
};

export default useFetchUser;
