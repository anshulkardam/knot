import { DashboardStats } from "@/components/dashboard/stats"
import { RecentLinks } from "@/components/dashboard/recent-links"
import { QuickCreate } from "@/components/dashboard/quick-create"
import { RecentQRCodes } from "@/components/dashboard/recent-qr-codes"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Knot",
  description: "Manage your shortened links and QR codes",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s an overview of your links and QR codes.</p>
      </div>

      <QuickCreate />
      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLinks />
        <RecentQRCodes />
      </div>
    </div>
  )
}
