import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:44344",
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
