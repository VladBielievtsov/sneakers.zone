import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

// process.env.API_BASE_URL

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

axiosClient.interceptors.request.use((config) => {
  const token = getCookie("ACCESS_TOKEN");
  config.headers.Accept = "application/json";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      if (response.status === 401) {
        deleteCookie("ACCESS_TOKEN");
      } else if (response.status === 404) {
        //Show not found
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  }
);

export default axiosClient;
