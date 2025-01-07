/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", // TODO send it to an env variable
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const wasDisconnectedDueToExpirationKey =
  "was-disconnected-due-to-expiration";

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (isAxiosError(error)) {
      const skipRedirect = error.config?.disableUnauthorizedRedirect;
      if (error.response?.status === 401 && !skipRedirect) {
        if (error.config?.router) {
          error.config.router.replace("/");
        } else {
          window.location.href = "/";
        }
        sessionStorage.setItem(wasDisconnectedDueToExpirationKey, "true");
      }
    }

    return Promise.reject(error);
  }
);

export class AxiosWithRouter {
  router?: AppRouterInstance;

  constructor(router?: AppRouterInstance) {
    this.router = router;
  }

  async get(url: string, config?: AxiosRequestConfig<any>) {
    return apiClient.get(url, { ...config, router: this.router });
  }

  async post(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return apiClient.post(url, data, { ...config, router: this.router });
  }

  async put(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return apiClient.put(url, data, { ...config, router: this.router });
  }

  async delete(url: string, config?: AxiosRequestConfig<any>) {
    return apiClient.delete(url, { ...config, router: this.router });
  }
}

export const useAxios = () => {
  const router = useRouter();
  return new AxiosWithRouter(router);
};
