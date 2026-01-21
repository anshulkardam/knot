"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, ExternalLink, Trash2, Eye, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminLinksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Mock links data
  const links = [
    {
      id: "1",
      shortUrl: "short.ly/product",
      longUrl: "https://example.com/product-launch-2024",
      user: "john@example.com",
      clicks: 1243,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      shortUrl: "short.ly/campaign",
      longUrl: "https://example.com/marketing-campaign",
      user: "sarah@example.com",
      clicks: 856,
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      shortUrl: "short.ly/promo",
      longUrl: "https://example.com/promotional-offer",
      user: "mike@example.com",
      clicks: 432,
      status: "flagged",
      createdAt: "2024-01-05",
    },
  ]

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Links Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage all shortened links</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Links Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Short URL</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Destination</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Clicks</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Created</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-secondary px-2 py-1 rounded">{link.shortUrl}</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                      >
                        {copiedId === link.id ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground truncate max-w-xs">{link.longUrl}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{link.user}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{link.clicks.toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant={link.status === "active" ? "default" : "destructive"}>{link.status}</Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{link.createdAt}</td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(link.longUrl, "_blank")}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Link
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
