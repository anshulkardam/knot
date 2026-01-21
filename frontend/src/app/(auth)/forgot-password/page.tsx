import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password - Knot",
  description: "Reset your Knot password",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
