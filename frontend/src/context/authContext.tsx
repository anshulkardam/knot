"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setIsInitializing(false);
      }
    };

    bootstrapAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        { withCredentials: true }
      );
    } finally {
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
