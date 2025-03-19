import axios from "axios";
import { baseUrl } from "./apiPaths";
import { refreshToken } from "./endpoints/refreshToken";

const VITE_ENV = import.meta.env.VITE_ENV;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (VITE_ENV === "development") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;

    if (error.response && error.response.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        return axiosInstance(request);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
