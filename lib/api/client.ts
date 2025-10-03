
import axios, { AxiosError, AxiosInstance } from "axios";
import { BASE_API_URL } from "@/lib/api/endpoints";
import { showToast } from "@/components/common/toast";

export const httpClient: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    // timeout: 20000, // wait maximum 20 seconds
    withCredentials: true
});

// httpClient.interceptors.request.use(
//     (config) => {
//         // attach auth token if available
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

httpClient.interceptors.response.use(
    (response: any) => response,
    (error: AxiosError<{ statusCode: number, message: string }>) => {
        console.error('Interceptor error: ', error); // Debug log

        if (error.code === "ECONNABORTED") {
            console.error("⏳ Request timed out!");
            showToast("Server is taking too long. Please try again", "warning");

        } else if (error.response) {
            const message = error.response.data?.message || "Something went wrong";
            const status = error.response.status;

            if(status === 400){
                showToast(message || "Bad Request", "error");
            }
            else if(status === 401){
                showToast(message || "Unauthorized - Please login again", "error");
                // Optional: Redirect to login or clear auth tokens
                // localStorage.removeItem('token');
                // window.location.href = '/login';
            }
            else if(status === 403){
                showToast(message || "Forbidden - Access denied", "error");
            }
            else if(status === 404){
                showToast(message || "Resource not found", "error");
            }
            else if(status === 500){
                showToast(message || "Server Error", "error");
            }
            else{
                showToast(message || "An error occurred", "error");
            }

        } else if (error.request) {
            // Network error - no response received
            console.error("Network error - no response:", error.request);
            showToast("Network error. Please check your connection", "error");
        } else {
            // Something else happened
            console.error("Error:", error.message);
            showToast("An unexpected error occurred", "error");
        }

        return Promise.reject(error);
    }
);