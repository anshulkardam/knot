"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Download, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminQRCodesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock QR codes data
  const qrCodes = [
    {
      id: "1",
      url: "https://example.com/product-launch",
      title: "Product Launch",
      user: "john@example.com",
      scans: 1243,
      createdAt: "2024-01-15",
      qrUrl: "/qr-code.png",
    },
    {
      id: "2",
      url: "https://example.com/campaign",
      title: "Marketing Campaign",
      user: "sarah@example.com",
      scans: 856,
      createdAt: "2024-01-10",
      qrUrl: "/qr-code.png",
    },
    {
      id: "3",
      url: "https://example.com/event",
      title: "Event Registration",
      user: "mike@example.com",
      scans: 2341,
      createdAt: "2024-01-05",
      qrUrl: "/qr-code.png",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">QR Codes Management</h1>
        <p className="text-muted-foreground mt-1">Monitor all generated QR codes</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search QR codes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* QR Codes Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">QR Code</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">URL</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Scans</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Created</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {qrCodes.map((qr) => (
                <tr key={qr.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="h-12 w-12 rounded bg-secondary/50 flex items-center justify-center overflow-hidden">
                      <img
                        src={qr.qrUrl || "/placeholder.svg"}
                        alt={qr.title}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{qr.title}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground truncate max-w-xs">{qr.url}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm">{qr.user}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium">{qr.scans.toLocaleString()}</p>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{qr.createdAt}</td>
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
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download QR
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete QR Code
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
