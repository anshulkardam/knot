"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isInitializing, isAuthenticated]);

  if (isInitializing) return null;

  return <>{children}</>;
}
