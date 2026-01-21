"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ArrowRight, Loader2, Check } from "lucide-react"

const requirements = [
  { text: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { text: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { text: "One number", test: (p: string) => /[0-9]/.test(p) },
]

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    router.push("/login")
  }

  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const allRequirementsMet = requirements.every((req) => req.test(password))

  return (
    <div className="w-full max-w-sm animate-fade-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground mt-2">Create a new password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Create a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-11 bg-input border-border focus:border-primary/50"
              required
            />
          </div>

          {/* Password requirements */}
          <div className="pt-2 space-y-1.5">
            {requirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs transition-colors ${
                  req.test(password) ? "text-chart-1" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                    req.test(password) ? "bg-chart-1/20" : "bg-muted"
                  }`}
                >
                  {req.test(password) && <Check className="h-2.5 w-2.5" />}
                </div>
                {req.text}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 h-11 bg-input border-border focus:border-primary/50"
              required
            />
          </div>
          {confirmPassword && !passwordsMatch && <p className="text-xs text-destructive">Passwords do not match</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-11 group"
          disabled={isLoading || !allRequirementsMet || !passwordsMatch}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Reset Password
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
