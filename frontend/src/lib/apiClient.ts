"use client";

import { useAuth } from "@/context/authContext";
import axios, { AxiosError } from "axios";
import { useMemo } from "react";

export function useApi() {
  const { accessToken, setAccessToken } = useAuth();

  return useMemo(() => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    // attach access token
    api.interceptors.request.use((config) => {
      if (accessToken && config.headers) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return config;
    });

    // auto refresh on 401
    api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status !== 401) {
          return Promise.reject(error);
        }

        try {
          const { data } = await axios.get("/api/v1/refresh-token", {
            withCredentials: true,
          });

          const newToken = data.accessToken;
          setAccessToken(newToken);

          if (error.config?.headers) {
            error.config.headers.set("Authorization", `Bearer ${newToken}`);
            return axios(error.config);
          }
        } catch {
          setAccessToken(null);
        }

        return Promise.reject(error);
      },
    );

    return api;
  }, [accessToken, setAccessToken]);
}
