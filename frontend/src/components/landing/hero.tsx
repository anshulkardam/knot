"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Link2, Copy, Check, QrCode } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Hero() {
  const [url, setUrl] = useState("")
  const [shortened, setShortened] = useState("")
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      setShortened("short.ly/abc123")
      setQrGenerated(false)
    }
  }

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault()
    if (url) {
      setQrGenerated(true)
      setShortened("")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadQR = () => {
    // Simulate QR download
    const link = document.createElement("a")
    link.download = "qr-code.png"
    link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`
    link.click()
  }

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium text-muted-foreground bg-secondary/50 rounded-full border border-border animate-fade-up">
          <span className="w-1.5 h-1.5 bg-chart-1 rounded-full animate-pulse-subtle" />
          Now with QR codes & advanced analytics
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance leading-[1.1] animate-fade-up animation-delay-100">
          Shorten links.
          <br />
          <span className="text-muted-foreground">Generate QR codes.</span>
        </h1>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-pretty animate-fade-up animation-delay-200">
          A minimalist link shortener and QR generator built for the modern web. Create short links, generate QR codes,
          and track everything.
        </p>

        <div className="mt-10 max-w-xl mx-auto animate-fade-up animation-delay-300">
          <Tabs defaultValue="shorten" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 p-1">
              <TabsTrigger
                value="shorten"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2"
              >
                <Link2 className="h-4 w-4" />
                Shorten Link
              </TabsTrigger>
              <TabsTrigger value="qr" className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
                <QrCode className="h-4 w-4" />
                Generate QR
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shorten" className="mt-0">
              <form onSubmit={handleShorten}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Paste your long URL here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-11 h-12 bg-input border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 px-6 group">
                    Shorten
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>

                {shortened && (
                  <div className="mt-4 p-4 bg-card border border-border rounded-lg animate-fade-up">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-chart-1/10 rounded-lg">
                          <Check className="h-4 w-4 text-chart-1" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-muted-foreground">Your shortened link</p>
                          <p className="font-mono text-sm text-foreground">{shortened}</p>
                        </div>
                      </div>
                      <Button type="button" variant="secondary" size="sm" onClick={handleCopy} className="shrink-0">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="qr" className="mt-0">
              <form onSubmit={handleGenerateQR}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Enter URL for QR code..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="pl-11 h-12 bg-input border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 px-6 group">
                    Generate
                    <QrCode className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {qrGenerated && url && (
                  <div className="mt-4 p-6 bg-card border border-border rounded-lg animate-fade-up">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="p-4 bg-white rounded-xl">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`}
                          alt="QR Code"
                          className="w-32 h-32"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-muted-foreground mb-1">QR Code for</p>
                        <p className="font-mono text-sm text-foreground truncate max-w-[250px]">{url}</p>
                        <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={handleDownloadQR}>
                          Download PNG
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-6 text-xs text-muted-foreground animate-fade-up animation-delay-400">
          No account required for quick links.{" "}
          <Link href="/register" className="text-foreground hover:underline underline-offset-4">
            Sign up
          </Link>{" "}
          for advanced features.
        </p>
      </div>
    </section>
  )
}
