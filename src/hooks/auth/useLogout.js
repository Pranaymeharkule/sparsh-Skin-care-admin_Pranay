import { useSetRecoilState } from "recoil";
import { adminAuthState } from "../../state/authenticatedState/authenticatedState";

const useLogout = () => {
  const setUserInfo = useSetRecoilState(adminAuthState);

  const logout = () => {
    localStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_token");
    setUserInfo({ isAuthenticated: false });
    window.location.href = "/";
  };

  return logout;
};

export default useLogout;
