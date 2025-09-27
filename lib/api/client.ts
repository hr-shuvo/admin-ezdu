import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_API_URL } from "@/lib/api/endpoints";

export const httpClient: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000, // wait maximum 10 seconds
    withCredentials: true
});



httpClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.code === "ECONNABORTED") {
            console.error("⏳ Request timed out!");
            // Example: show toast
            alert("Server is taking too long. Please try again.");
        } else if (error.response) {
            console.error(error);
        } else {
            console.error("⚠️ Network error:", error.message);
        }

        return Promise.reject(error);
    }
);