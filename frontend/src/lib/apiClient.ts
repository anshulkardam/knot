"use client";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

function resolveQueue(token: string | null) {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
}

export function useApi() {
  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    // REQUEST interceptor
    const reqInterceptor = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    // RESPONSE interceptor
    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status !== 401 || !error.config) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshQueue.push((token) => {
              if (!token) {
                reject(error);
                return;
              }

              error.config!.headers.Authorization = `Bearer ${token}`;
              resolve(api(error.config!));
            });
          });
        }

        isRefreshing = true;

        try {
          const { data } = await api.get("/auth/refresh-token");
          const newToken = data.accessToken;

          setAccessToken(newToken);
          resolveQueue(newToken);

          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api(error.config);
        } catch (err) {
          resolveQueue(null);
          await logout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken, setAccessToken, logout]);

  return api;
}
