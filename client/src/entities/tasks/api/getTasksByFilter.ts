import { Task, TaskFilter } from "@/entities/tasks/model/task";
import { ApiPaths } from "@/shared/api/apiPaths";
import { axiosInstance } from "@/shared/api/axiosInstance";

export const getTasksByFilter = async (filter: TaskFilter): Promise<Task[]> => {
    try {
        const response = await axiosInstance.post(ApiPaths.getTasksList(), {
            ...filter,
        });

        return response.data.result;
    } catch (error) {
        console.error("Ошибка получения задач:", error);

        return [];
    }
};