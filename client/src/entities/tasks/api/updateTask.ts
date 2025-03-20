import { ApiPaths } from "@/shared/api/apiPaths";
import { axiosInstance } from "@/shared/api/axiosInstance";

export const updateTask = async (id, data) => {
  const response = await axiosInstance.put(ApiPaths.updateTask(id), data);
  return response.data;
};
