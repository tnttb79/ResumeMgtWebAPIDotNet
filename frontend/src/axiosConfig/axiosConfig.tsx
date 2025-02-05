import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 1. Create axios instance with default configuration
const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
  timeout: 10000,
});

// Response interceptor to quickly fix the mistake of using 404 status code when the list is empty
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404 && error.config?.method === "get") {
      return Promise.resolve({ data: [] });
    }
    return Promise.reject(error);
  }
);

// GET helper method
export const get = <T,>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosClient.get<T>(url, config);
};

// POST helper method
export const post = <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosClient.post<T>(url, data, config);
};

export default axiosClient;
