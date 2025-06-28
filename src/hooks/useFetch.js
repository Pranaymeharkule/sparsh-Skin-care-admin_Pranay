import axios from "axios";
import { useCallback } from "react";

function useFetch() {
  const fetchData = useCallback(async ({ method, url, data, params }) => {
    console.log(method, url, data);
    try {
      const token =
        localStorage.getItem("admin_token") ||
        sessionStorage.getItem("admin_token");

      const axiosConfig = {
        method,
        url,
        ...(data && { data }),
        ...(params && { params }),
        headers: {
          Authorization: `Bearer ${token}`,
          ...(data instanceof FormData && {
            "Content-Type": "multipart/form-data",
          }),
        },
      };

      const result = await axios(axiosConfig);
      return result.data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error.message);
      throw error.response.data;
    }
  }, []);

  return [fetchData];
}

export default useFetch;
