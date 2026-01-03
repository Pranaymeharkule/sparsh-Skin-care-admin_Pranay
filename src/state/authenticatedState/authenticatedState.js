import { atom } from "recoil";

export const adminAuthState = atom({
  key: "adminAuthState",
  default: {
    isAuthenticated: !!localStorage.getItem("admin_token") || !!sessionStorage.getItem("admin_token"),
  },
});
