"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight, Loader2, Check } from "lucide-react";
import { useRegister } from "@/hooks/auth/useRegister";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";

const requirements = [
  { text: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { text: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { text: "One number", test: (p: string) => /[0-9]/.test(p) },
];

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setAccessToken, isAuthenticated } = useAuth();
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register.mutate(
      {
        name,
        email: email.trim(),
        password,
      },
      {
        onSuccess: (data) => {
          console.log(data, data.data.accessToken);
          setAccessToken(data.data.accessToken);
          router.replace("/dashboard");
        },
        onError: (err) => {
          toast.error(err.message || "Register failed");
        },
      },
    );
  };

  const isDisabled = register.isPending || !email.trim() || !name.trim() || !password;

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-sm animate-fade-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-2">Get started with your free account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 h-11 bg-input border-border focus:border-primary/50"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-11 bg-input border-border focus:border-primary/50"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
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

        <Button type="submit" className="w-full h-11 group" disabled={isDisabled}>
          {register.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-4 text-xs text-center text-muted-foreground">
        By creating an account, you agree to our{" "}
        <Link href="#" className="hover:underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="hover:underline underline-offset-4">
          Privacy Policy
        </Link>
      </p>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-foreground hover:underline underline-offset-4 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
