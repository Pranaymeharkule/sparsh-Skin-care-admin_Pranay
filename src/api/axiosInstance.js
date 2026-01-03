import axios from "axios";
import conf from "../config";

const axiosInstance = axios.create({
  baseURL: conf.apiBaseUrl
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
