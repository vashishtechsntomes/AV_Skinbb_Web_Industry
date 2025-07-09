import { baseApiUrl } from "@/config/baseUrls";
import { logout, updateToken } from "@/context/slices/authSlice";
import { store } from "@/context/store";
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// import { tokenService } from "./token.service";

export const axiosInstance = axios.create({
  //   baseURL: `${baseApiUrl}/api/v1`,
  baseURL: baseApiUrl,
});

// Token refresh management
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Add Authorization header dynamically from Redux store
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  // const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle token expiration and retry logic
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const refreshToken = store.getState().auth.refreshToken;
    // const refreshToken = tokenService.getRefreshToken();

    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { data }: any = await axios.post(
            `${baseApiUrl}/api/v1/users/refresh-token`,
            { refreshToken },
          );

          const newAccessToken = data?.data?.accessToken;
          const newRefreshToken = data?.data?.refreshToken;

          store.dispatch(
            updateToken({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }),
          );
          axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${newAccessToken}`;

          onTokenRefreshed(newAccessToken);
          isRefreshing = false;
        } catch (refreshError: any) {
          store.dispatch(logout());
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Queue failed requests until token is refreshed
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

// =============================
// Utility Methods (with Types)
// =============================

type Headers = Record<string, string>;

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
const handleRequest = async <T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: any,
  headers: Headers = {},
): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = { headers };

    if (data instanceof FormData) {
      config.headers!["Content-Type"] = "multipart/form-data";
    } else if (data && typeof data === "object" && method !== "get") {
      config.headers!["Content-Type"] = "application/json";
      data = JSON.stringify(data);
    }

    const response: AxiosResponse<T> =
      method === "get" || method === "delete"
        ? await axiosInstance[method](url, config)
        : await axiosInstance[method](url, data, config);

    return { data: response.data, error: null };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.errors ||
      err.message ||
      "Unknown error";
    return { data: null, error: message };
  }
};

// Exposed HTTP methods
export const get = <T>(url: string, headers?: Headers) =>
  handleRequest<T>("get", url, null, headers);

export const post = <T>(url: string, data: any, headers?: Headers) =>
  handleRequest<T>("post", url, data, headers);

export const put = <T>(url: string, data: any, headers?: Headers) =>
  handleRequest<T>("put", url, data, headers);

export const patch = <T>(url: string, data: any, headers?: Headers) =>
  handleRequest<T>("patch", url, data, headers);

export const remove = <T>(url: string, headers?: Headers) =>
  handleRequest<T>("delete", url, null, headers);
