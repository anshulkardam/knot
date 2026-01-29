import type React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Metadata } from "next";
import { RequireAuth } from "@/components/require-auth";

export const metadata: Metadata = {
  title: "Dashboard - Knot",
  description: "Manage your shortened links and QR codes",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarTrigger />

        <main className="flex-1 mt-10 pr-6">{children}</main>
      </SidebarProvider>
    </RequireAuth>
  );
}
