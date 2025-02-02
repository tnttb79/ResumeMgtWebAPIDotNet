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

// 2. GET helper method
export const get = <T,>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosClient.get<T>(url, config);
};

// 3. POST helper method
export const post = <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosClient.post<T>(url, data, config);
};

export default axiosClient;
