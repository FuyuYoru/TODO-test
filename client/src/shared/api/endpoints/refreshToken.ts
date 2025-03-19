import { axiosInstance } from "@/shared/api/axiosInstance";
import { ApiPaths, baseUrl } from "../apiPaths";

const VITE_ENV = import.meta.env.VITE_ENV;

export const refreshToken = async () => {
  let data = undefined;

  if (VITE_ENV === "development") {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("Refresh token отсутствует, требуется авторизация");
      return null;
    }

    data = { refreshToken };
  }

  try {
    const response = await axiosInstance.post(
      baseUrl + ApiPaths.refreshToken(),
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    return null;
  }
};
