"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link2, ArrowRight, Copy, Check, Loader2, QrCode, Download } from "lucide-react"

export function QuickCreate() {
  const [url, setUrl] = useState("")
  const [shortened, setShortened] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)
  const [activeTab, setActiveTab] = useState("link")

  const handleSubmitLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShortened("short.ly/" + Math.random().toString(36).substring(7))
    setIsLoading(false)
  }

  const handleSubmitQR = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setQrGenerated(true)
    setIsLoading(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQR = () => {
    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`
    link.click()
  }

  const handleReset = () => {
    setUrl("")
    setShortened("")
    setQrGenerated(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            setActiveTab(v)
            handleReset()
          }}
        >
          <TabsList className="mb-4 bg-muted/50">
            <TabsTrigger value="link" className="gap-2">
              <Link2 className="h-4 w-4" />
              Shorten Link
            </TabsTrigger>
            <TabsTrigger value="qr" className="gap-2">
              <QrCode className="h-4 w-4" />
              Generate QR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-0">
            <form onSubmit={handleSubmitLink}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 h-11 bg-input border-border"
                    disabled={!!shortened}
                  />
                </div>
                {shortened ? (
                  <Button type="button" variant="outline" onClick={handleReset} className="h-11 bg-transparent">
                    Create New
                  </Button>
                ) : (
                  <Button type="submit" className="h-11 group" disabled={isLoading || !url}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Shorten
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {shortened && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg flex items-center justify-between gap-4 animate-fade-up">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-chart-1/10 rounded-lg shrink-0">
                      <Check className="h-4 w-4 text-chart-1" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Your shortened link</p>
                      <p className="font-mono text-sm truncate">{shortened}</p>
                    </div>
                  </div>
                  <Button type="button" variant="secondary" size="sm" onClick={handleCopy} className="shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              )}
            </form>
          </TabsContent>

          <TabsContent value="qr" className="mt-0">
            <form onSubmit={handleSubmitQR}>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Enter URL for QR code..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 h-11 bg-input border-border"
                    disabled={qrGenerated}
                  />
                </div>
                {qrGenerated ? (
                  <Button type="button" variant="outline" onClick={handleReset} className="h-11 bg-transparent">
                    Create New
                  </Button>
                ) : (
                  <Button type="submit" className="h-11 group" disabled={isLoading || !url}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Generate
                        <QrCode className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>

              {qrGenerated && url && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg animate-fade-up">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(url)}`}
                        alt="QR Code"
                        className="w-16 h-16"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">QR Code generated for</p>
                      <p className="font-mono text-sm truncate">{url}</p>
                    </div>
                    <Button type="button" variant="secondary" size="sm" onClick={handleDownloadQR} className="shrink-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
