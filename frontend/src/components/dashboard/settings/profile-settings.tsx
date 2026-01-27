"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import { toast } from "sonner";

export function ProfileSettings() {
  const { user } = useAuth();
  const update = useUpdateUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    update.mutate(
      {
        email,
        name,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Updated Successfully");
        },
        onError: () => toast.error("Update Failed"),
      },
    );
  };

  return (
    <Card className="bg-transparent border-none px-0 py-0">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">Profile information</CardTitle>
        <CardDescription>Update your personal details associated with this account</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!user}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
              <p className="text-xs text-muted-foreground">Email changes require verification</p>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" disabled={update.isPending || !user}>
              {update.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
