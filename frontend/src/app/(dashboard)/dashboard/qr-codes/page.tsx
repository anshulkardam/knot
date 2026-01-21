"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Trash2, ExternalLink, Copy, Check, QrCode } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

export default function QRCodesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Mock QR codes data
  const qrCodes = [
    {
      id: "1",
      url: "https://example.com/product-launch",
      title: "Product Launch",
      scans: 1243,
      createdAt: "2024-01-15",
      qrUrl: "/qr-code.png",
    },
    {
      id: "2",
      url: "https://example.com/campaign",
      title: "Marketing Campaign",
      scans: 856,
      createdAt: "2024-01-10",
      qrUrl: "/qr-code.png",
    },
    {
      id: "3",
      url: "https://example.com/event",
      title: "Event Registration",
      scans: 2341,
      createdAt: "2024-01-05",
      qrUrl: "/qr-code.png",
    },
  ]

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (id: string) => {
    console.log("[v0] Downloading QR code:", id)
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Deleting QR code:", id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">QR Codes</h1>
          <p className="text-muted-foreground mt-1">Generate and manage QR codes for your URLs</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create QR Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create QR Code</DialogTitle>
              <DialogDescription>Generate a QR code for any URL</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="qr-url">URL</Label>
                <Input id="qr-url" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qr-title">Title (Optional)</Label>
                <Input id="qr-title" placeholder="My QR Code" />
              </div>
              <Button className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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

      {/* QR Codes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {qrCodes.map((qr) => (
          <div
            key={qr.id}
            className="rounded-lg border border-border bg-card p-4 space-y-4 hover:border-muted-foreground/30 transition-colors"
          >
            {/* QR Code Image */}
            <div className="aspect-square rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden">
              <img src={qr.qrUrl || "/placeholder.svg"} alt={qr.title} className="w-full h-full object-contain p-4" />
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{qr.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{qr.url}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownload(qr.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open(qr.url, "_blank")}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(qr.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{qr.scans} scans</span>
                <span className="text-muted-foreground">{qr.createdAt}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleCopy(qr.url, qr.id)}
                >
                  {copiedId === qr.id ? (
                    <>
                      <Check className="h-3 w-3 mr-1.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1.5" />
                      Copy URL
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleDownload(qr.id)}
                >
                  <Download className="h-3 w-3 mr-1.5" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
