"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function AdminFlaggedPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUrl, setSelectedUrl] = useState<any>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)

  // Mock flagged URLs data
  const flaggedUrls = [
    {
      id: "1",
      shortUrl: "short.ly/suspicious1",
      longUrl: "https://example-suspicious-site.com/phishing",
      user: "user123@example.com",
      reason: "Potential phishing attempt",
      reportedBy: "automated_scan",
      flaggedAt: "2024-01-15 14:32",
      severity: "high",
      clicks: 23,
    },
    {
      id: "2",
      shortUrl: "short.ly/spam-link",
      longUrl: "https://spammy-website.com/offers",
      user: "spammer@example.com",
      reason: "Spam content detected",
      reportedBy: "user_report",
      flaggedAt: "2024-01-14 09:15",
      severity: "medium",
      clicks: 156,
    },
    {
      id: "3",
      shortUrl: "short.ly/malware",
      longUrl: "https://malicious-domain.com/download",
      user: "suspicious@example.com",
      reason: "Malware distribution",
      reportedBy: "automated_scan",
      flaggedAt: "2024-01-13 18:45",
      severity: "critical",
      clicks: 8,
    },
  ]

  const handleReview = (url: any) => {
    setSelectedUrl(url)
    setReviewDialogOpen(true)
  }

  const handleApprove = () => {
    console.log("[v0] Approving URL:", selectedUrl?.id)
    setReviewDialogOpen(false)
  }

  const handleBan = () => {
    console.log("[v0] Banning URL:", selectedUrl?.id)
    setReviewDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Flagged URLs</h1>
          <p className="text-muted-foreground mt-1">Review and moderate suspicious content</p>
        </div>
        <Badge variant="destructive" className="text-base px-3 py-1">
          {flaggedUrls.length} Pending
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flagged URLs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Flagged URLs List */}
      <div className="space-y-4">
        {flaggedUrls.map((url) => (
          <div
            key={url.id}
            className={`rounded-lg border p-4 ${
              url.severity === "critical"
                ? "border-destructive bg-destructive/5"
                : url.severity === "high"
                  ? "border-orange-500 bg-orange-500/5"
                  : "border-yellow-500 bg-yellow-500/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${
                      url.severity === "critical"
                        ? "text-destructive"
                        : url.severity === "high"
                          ? "text-orange-600"
                          : "text-yellow-600"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-sm font-mono bg-background/80 px-2 py-1 rounded">{url.shortUrl}</code>
                      <Badge
                        variant={
                          url.severity === "critical"
                            ? "destructive"
                            : url.severity === "high"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {url.severity}
                      </Badge>
                      <Badge variant="outline">{url.reportedBy.replace("_", " ")}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 break-all">{url.longUrl}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="pl-8 space-y-2">
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Reason:</span>
                      <span className="ml-2 font-medium">{url.reason}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">User:</span>
                      <span className="ml-2 font-medium">{url.user}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Clicks:</span>
                      <span className="ml-2 font-medium">{url.clicks}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Flagged on {url.flaggedAt}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => window.open(url.longUrl, "_blank")}>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleReview(url)}>
                  Review
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Flagged URL</DialogTitle>
            <DialogDescription>Decide whether to approve or ban this URL based on the details below</DialogDescription>
          </DialogHeader>

          {selectedUrl && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Short URL</label>
                <code className="block text-sm font-mono bg-secondary px-3 py-2 rounded">{selectedUrl.shortUrl}</code>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Destination URL</label>
                <p className="text-sm text-muted-foreground break-all bg-secondary px-3 py-2 rounded">
                  {selectedUrl.longUrl}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">User</label>
                  <p className="text-sm">{selectedUrl.user}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Badge
                    variant={
                      selectedUrl.severity === "critical"
                        ? "destructive"
                        : selectedUrl.severity === "high"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {selectedUrl.severity}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Flagging</label>
                <p className="text-sm text-muted-foreground">{selectedUrl.reason}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Notes (Optional)</label>
                <Textarea placeholder="Add any notes about your decision..." />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve URL
            </Button>
            <Button variant="destructive" onClick={handleBan}>
              <XCircle className="h-4 w-4 mr-2" />
              Ban URL
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
