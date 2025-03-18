import { ApiPaths, baseUrl } from "@/shared/api/apiPaths";
import { axiosInstance } from "@/shared/api/axiosInstance";
import { User } from "../model/user";

export const getCurrent = async (): Promise<User | null> => {
  try {
    const { data } = await axiosInstance.get<User>(`${baseUrl}${ApiPaths.getCurrentUser()}`, {withCredentials: true});
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
