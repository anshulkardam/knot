"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Filter,
  QrCode,
  BarChart3,
  Check,
} from "lucide-react"
import { EditLinkDialog } from "./edit-link-dialog"

interface Link {
  id: string
  shortUrl: string
  backHalf: string
  originalUrl: string
  clicks: number
  createdAt: string
  status: "active" | "expired" | "disabled"
}

const mockLinks: Link[] = [
  {
    id: "1",
    shortUrl: "short.ly/abc123",
    backHalf: "abc123",
    originalUrl: "https://example.com/very-long-url-that-needs-to-be-shortened-for-sharing",
    clicks: 1245,
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    shortUrl: "short.ly/marketing",
    backHalf: "marketing",
    originalUrl: "https://mycompany.com/campaigns/q1-2024/landing-page",
    clicks: 856,
    createdAt: "2024-01-14",
    status: "active",
  },
  {
    id: "3",
    shortUrl: "short.ly/promo2024",
    backHalf: "promo2024",
    originalUrl: "https://store.example.com/special-offer?utm_source=email",
    clicks: 432,
    createdAt: "2024-01-12",
    status: "active",
  },
  {
    id: "4",
    shortUrl: "short.ly/docs",
    backHalf: "docs",
    originalUrl: "https://documentation.example.com/api/v2/reference",
    clicks: 267,
    createdAt: "2024-01-10",
    status: "active",
  },
  {
    id: "5",
    shortUrl: "short.ly/oldcamp",
    backHalf: "oldcamp",
    originalUrl: "https://mycompany.com/campaigns/2023/holiday-sale",
    clicks: 1892,
    createdAt: "2023-12-01",
    status: "expired",
  },
  {
    id: "6",
    shortUrl: "short.ly/beta",
    backHalf: "beta",
    originalUrl: "https://app.example.com/beta-signup",
    clicks: 156,
    createdAt: "2024-01-08",
    status: "disabled",
  },
]

export function LinksTable() {
  const [links, setLinks] = useState<Link[]>(mockLinks)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLinks, setSelectedLinks] = useState<string[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [editLink, setEditLink] = useState<Link | null>(null)

  const filteredLinks = links.filter(
    (link) =>
      link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLinks(filteredLinks.map((l) => l.id))
    } else {
      setSelectedLinks([])
    }
  }

  const handleSelectLink = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLinks([...selectedLinks, id])
    } else {
      setSelectedLinks(selectedLinks.filter((l) => l !== id))
    }
  }

  const handleDelete = () => {
    if (linkToDelete) {
      setLinks(links.filter((l) => l.id !== linkToDelete))
      setLinkToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleBulkDelete = () => {
    setLinks(links.filter((l) => !selectedLinks.includes(l.id)))
    setSelectedLinks([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20"
      case "expired":
        return "bg-muted text-muted-foreground hover:bg-muted"
      case "disabled":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
      default:
        return ""
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-transparent focus:border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              {selectedLinks.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedLinks.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1 flex items-center">
              <Checkbox
                checked={selectedLinks.length === filteredLinks.length && filteredLinks.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </div>
            <div className="col-span-4">Link</div>
            <div className="col-span-2">Clicks</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-border">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-muted/30 transition-colors items-center"
              >
                <div className="hidden md:flex col-span-1 items-center">
                  <Checkbox
                    checked={selectedLinks.includes(link.id)}
                    onCheckedChange={(checked) => handleSelectLink(link.id, checked as boolean)}
                  />
                </div>

                <div className="col-span-1 md:col-span-4 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-mono text-sm font-medium truncate">{link.shortUrl}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => handleCopy(link.id, link.shortUrl)}
                    >
                      {copiedId === link.id ? <Check className="h-3 w-3 text-chart-1" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{link.originalUrl}</p>
                </div>

                <div className="hidden md:block col-span-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{link.clicks.toLocaleString()}</span>
                  </div>
                </div>

                <div className="hidden md:block col-span-2">
                  <Badge variant="secondary" className={getStatusColor(link.status)}>
                    {link.status}
                  </Badge>
                </div>

                <div className="hidden md:block col-span-2 text-sm text-muted-foreground">
                  {new Date(link.createdAt).toLocaleDateString()}
                </div>

                {/* Mobile stats */}
                <div className="flex md:hidden items-center gap-4 text-xs text-muted-foreground">
                  <span>{link.clicks.toLocaleString()} clicks</span>
                  <Badge variant="secondary" className={getStatusColor(link.status)}>
                    {link.status}
                  </Badge>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a href={`https://${link.shortUrl}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditLink(link)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCopy(link.id, link.shortUrl)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Code
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setLinkToDelete(link.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredLinks.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No links found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this link? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      {editLink && (
        <EditLinkDialog
          link={editLink}
          open={!!editLink}
          onOpenChange={(open) => !open && setEditLink(null)}
          onSave={(updatedLink) => {
            setLinks(links.map((l) => (l.id === updatedLink.id ? updatedLink : l)))
            setEditLink(null)
          }}
        />
      )}
    </>
  )
}
