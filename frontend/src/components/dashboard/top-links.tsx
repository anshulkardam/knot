import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp } from "lucide-react"

const topLinks = [
  {
    shortUrl: "short.ly/marketing",
    clicks: 1892,
    trend: "+23%",
    originalUrl: "https://mycompany.com/campaigns/q1-2024",
  },
  {
    shortUrl: "short.ly/promo2024",
    clicks: 1456,
    trend: "+18%",
    originalUrl: "https://store.example.com/special-offer",
  },
  {
    shortUrl: "short.ly/abc123",
    clicks: 1245,
    trend: "+12%",
    originalUrl: "https://example.com/very-long-url",
  },
  {
    shortUrl: "short.ly/docs",
    clicks: 856,
    trend: "+8%",
    originalUrl: "https://documentation.example.com/api",
  },
  {
    shortUrl: "short.ly/signup",
    clicks: 654,
    trend: "+5%",
    originalUrl: "https://app.example.com/register",
  },
]

export function TopLinks() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Top Performing Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topLinks.map((link, index) => (
            <div
              key={link.shortUrl}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm font-medium truncate">{link.shortUrl}</p>
                <p className="text-xs text-muted-foreground truncate">{link.originalUrl}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{link.clicks.toLocaleString()}</p>
                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {link.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
