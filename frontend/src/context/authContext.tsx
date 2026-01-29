"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  totalVisitCount: number;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        setAccessToken(data.accessToken);

        const { data: user } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/current`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
          withCredentials: true,
        });

        setUser(user.data);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    bootstrapAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        isInitializing,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
