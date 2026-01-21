import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password - Knot",
  description: "Create a new password for your account",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
