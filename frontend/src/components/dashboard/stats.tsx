import { Card, CardContent } from "@/components/ui/card"
import { Link2, MousePointerClick, TrendingUp, QrCode } from "lucide-react"

const stats = [
  {
    name: "Total Links",
    value: "128",
    change: "+12%",
    changeType: "positive",
    icon: Link2,
  },
  {
    name: "Total QR Codes",
    value: "45",
    change: "+8%",
    changeType: "positive",
    icon: QrCode,
  },
  {
    name: "Total Clicks",
    value: "4,521",
    change: "+23%",
    changeType: "positive",
    icon: MousePointerClick,
  },
  {
    name: "Avg. CTR",
    value: "35.3%",
    change: "+4.5%",
    changeType: "positive",
    icon: TrendingUp,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-muted">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <span
                className={`text-xs font-medium ${
                  stat.changeType === "positive" ? "text-chart-1" : "text-destructive"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.name}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
