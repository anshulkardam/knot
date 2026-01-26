import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Knot",
  description: "Sign in to your Knot account",
};

export default function LoginPage() {
  return <LoginForm />;
}
