"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Check } from "lucide-react"

const requirements = [
  { text: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { text: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { text: "One number", test: (p: string) => /[0-9]/.test(p) },
]

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const allRequirementsMet = requirements.every((req) => req.test(newPassword))
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Security</CardTitle>
        <CardDescription>Update your password and security settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="max-w-md"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="max-w-md"
              required
            />

            {/* Password requirements */}
            <div className="pt-2 space-y-1.5">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    req.test(newPassword) ? "text-chart-1" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                      req.test(newPassword) ? "bg-chart-1/20" : "bg-muted"
                    }`}
                  >
                    {req.test(newPassword) && <Check className="h-2.5 w-2.5" />}
                  </div>
                  {req.text}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="max-w-md"
              required
            />
            {confirmPassword && !passwordsMatch && <p className="text-xs text-destructive">Passwords do not match</p>}
          </div>

          <Button type="submit" disabled={isLoading || !allRequirementsMet || !passwordsMatch || !currentPassword}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
