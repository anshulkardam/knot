import { RegisterForm } from "@/components/auth/register-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account - Knot",
  description: "Create your knot account",
}

export default function RegisterPage() {
  return <RegisterForm />
}
