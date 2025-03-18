import axios from "axios";
import { baseUrl } from "./apiPaths";


export const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
)