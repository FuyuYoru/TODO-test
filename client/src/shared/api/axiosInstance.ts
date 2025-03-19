import axios from "axios";
import { baseUrl } from "./apiPaths";
import { refreshToken } from "./endpoints/refreshToken";

const VITE_ENV = import.meta.env.VITE_ENV;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: VITE_ENV !== "development", // В проде используем куки
});

// Интерцептор запросов (Только в development)
if (VITE_ENV === "development") {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

// Интерцептор ответов (Только в development)
if (VITE_ENV === "development") {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const request = error.config;

      if (error.response?.status === 401 && !request._retry) {
        request._retry = true;

        const newToken = await refreshToken();
        if (!newToken?.access_token) {
          return Promise.reject(error);
        }

        localStorage.setItem("accessToken", newToken.access_token);
        request.headers.Authorization = `Bearer ${newToken.access_token}`;

        return axiosInstance(request);
      }

      return Promise.reject(error);
    }
  );
}
