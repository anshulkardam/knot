"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";

const requirements = [
  { text: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { text: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { text: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const allRequirementsMet = requirements.every((req) => req.test(newPassword));
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Current password</Label>
              <Input type="password" />
            </div>

            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" />
            </div>
          </div>

          <div className="space-y-2">
            {requirements.map((req) => (
              <div
                key={req.text}
                className={`flex items-center gap-2 text-xs ${
                  req.test(newPassword) ? "text-emerald-500" : "text-muted-foreground"
                }`}
              >
                <Check className="h-3 w-3" />
                {req.text}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Make sure your password is strong</p>
            <Button>Update password</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
