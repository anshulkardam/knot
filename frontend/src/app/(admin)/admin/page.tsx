"use client"

import { Card } from "@/components/ui/card"
import { Users, Link2, QrCode, AlertTriangle, TrendingUp, TrendingDown, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  // Mock admin stats
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Total Links",
      value: "84,392",
      change: "+8.2%",
      trend: "up",
      icon: Link2,
      href: "/admin/links",
    },
    {
      title: "Total QR Codes",
      value: "23,156",
      change: "+15.3%",
      trend: "up",
      icon: QrCode,
      href: "/admin/qr-codes",
    },
    {
      title: "Flagged URLs",
      value: "47",
      change: "-5.2%",
      trend: "down",
      icon: AlertTriangle,
      href: "/admin/flagged",
    },
  ]

  const recentActivity = [
    { type: "user", action: "New user registered", user: "john@example.com", time: "2 minutes ago" },
    { type: "flag", action: "URL flagged as suspicious", url: "short.ly/abc123", time: "15 minutes ago" },
    { type: "link", action: "Link created", user: "sarah@example.com", time: "1 hour ago" },
    { type: "qr", action: "QR code generated", user: "mike@example.com", time: "2 hours ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage your platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="p-6 hover:border-muted-foreground/30 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-secondary">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-destructive"}`}
                >
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent Activity</h2>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div
                className={`p-2 rounded-lg mt-0.5 ${
                  activity.type === "flag"
                    ? "bg-destructive/10"
                    : activity.type === "user"
                      ? "bg-blue-500/10"
                      : "bg-secondary"
                }`}
              >
                {activity.type === "user" && <Users className="h-4 w-4 text-blue-600" />}
                {activity.type === "flag" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                {activity.type === "link" && <Link2 className="h-4 w-4 text-muted-foreground" />}
                {activity.type === "qr" && <QrCode className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.user || activity.url}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Activity
        </Button>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/users">
          <Card className="p-4 hover:border-muted-foreground/30 transition-colors cursor-pointer">
            <Users className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="font-medium">Manage Users</p>
            <p className="text-xs text-muted-foreground mt-1">View and edit user accounts</p>
          </Card>
        </Link>
        <Link href="/admin/links">
          <Card className="p-4 hover:border-muted-foreground/30 transition-colors cursor-pointer">
            <Link2 className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="font-medium">Manage Links</p>
            <p className="text-xs text-muted-foreground mt-1">Monitor all shortened links</p>
          </Card>
        </Link>
        <Link href="/admin/qr-codes">
          <Card className="p-4 hover:border-muted-foreground/30 transition-colors cursor-pointer">
            <QrCode className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="font-medium">Manage QR Codes</p>
            <p className="text-xs text-muted-foreground mt-1">View all generated QR codes</p>
          </Card>
        </Link>
        <Link href="/admin/flagged">
          <Card className="p-4 hover:border-muted-foreground/30 transition-colors cursor-pointer border-destructive/30 bg-destructive/5">
            <AlertTriangle className="h-5 w-5 text-destructive mb-2" />
            <p className="font-medium">Flagged URLs</p>
            <p className="text-xs text-muted-foreground mt-1">Review suspicious content</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
