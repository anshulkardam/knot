import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { AdminHeader } from "@/components/admin/header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6 pt-20">{children}</main>
      </div>
    </div>
  )
}
