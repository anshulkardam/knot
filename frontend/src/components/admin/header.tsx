"use client";

import { Shield } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="h-full px-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-destructive/10">
          <Shield className="h-4 w-4 text-destructive" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">
            System-wide management
          </p>
        </div>
      </div>
    </header>
  );
}
