import { axiosInstance } from "@/shared/api/axiosInstance";
import { ApiPaths, baseUrl } from "../apiPaths";

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.get(
      baseUrl + ApiPaths.refreshToken(),
      {
        withCredentials: true,
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
