import { Task } from "@/entities/tasks/model/task";
import { ApiPaths } from "@/shared/api/apiPaths";
import { axiosInstance } from "@/shared/api/axiosInstance";

export const createTask = async (
    data: Required<
        Pick<Task, "header" | "description" | "creatorId" | "status">
    > &
        Partial<Pick<Task, "priority" | "executorId" | "expiresAt">>) => {
    const response = await axiosInstance.post(ApiPaths.createTask(), data);
    return response.data;
};
