import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { TopLinks } from "@/components/dashboard/top-links"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics - Knot",
  description: "View analytics for your shortened links",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track performance across all your links</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Click Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { country: "United States", clicks: 1234, percentage: 35 },
                { country: "United Kingdom", clicks: 856, percentage: 24 },
                { country: "Germany", clicks: 543, percentage: 15 },
                { country: "France", clicks: 421, percentage: 12 },
                { country: "Canada", clicks: 312, percentage: 9 },
              ].map((location) => (
                <div key={location.country} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{location.country}</span>
                    <span className="text-muted-foreground">{location.clicks.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <TopLinks />
    </div>
  )
}
