import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "https://host.docker.internal:32769",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
  timeout: 10000,
  // withCredentials: true,
});

export const get = <T, R = AxiosResponse<T>, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> => {
  return axiosClient.get<T, R, D>(url, config);
};
export default axiosClient;
