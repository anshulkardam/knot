"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Copy, Check, QrCode, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGenShortLink } from "@/hooks/links/useGenShortLink";
import { toast } from "sonner";
import { useGenQR } from "@/hooks/links/useGenQR";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export function Hero() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const genLink = useGenShortLink();
  const genQR = useGenQR();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleShorten = (e: React.FormEvent) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    e.preventDefault();

    genLink.mutate(
      {
        destination: url,
        title: url,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setShortened(data.link.shortUrl);
        },
        onError: (err) => {
          toast.error(err.message || "Server Error");
        },
      },
    );
  };

  const handleGenerateQR = (e: React.FormEvent) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    e.preventDefault();

    genQR.mutate(
      {
        destination: url,
        title: url,
      },
      {
        onSuccess: (blob) => {
          if (qrUrl) {
            URL.revokeObjectURL(qrUrl);
          }
          const url = URL.createObjectURL(blob);
          setQrUrl(url);
          setShortened("");
        },
        onError: (err) => {
          toast.error(err.message || "QR generation failed");
        },
      },
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to Clipboard");
  };

  const handleDownloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <section className="relative min-h-screen pt-20 sm:pt-44 pb-20 px-4 sm:px-6 overflow-hidden">
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div
          className="
  inline-flex items-center gap-2
  px-3.5 py-1.5 mb-8
  text-xs font-medium
  text-muted-foreground
  bg-secondary/60
  border border-border/60
  rounded-full
  backdrop-blur-sm
  animate-fade-up
"
        >
          <span
            className="
    w-1.5 h-1.5
    rounded-full
    bg-emerald-500
    shadow-[0_0_0_3px_rgba(16,185,129,0.15)]
    animate-pulse-subtle
  "
          />

          <span className="whitespace-nowrap">
            Now with
            <span className="mx-1 font-semibold text-foreground">Link Trees</span>& advanced
            analytics
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bitcount font-medium tracking-tight text-balance leading-[1.1] animate-fade-up animation-delay-100">
          Short links. QR codes. Link-in-bio.
          <br />
          <span className="text-muted-foreground">
            All tied into one <span className="text-foreground font-semibold">Knot</span>.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl font-medium text-muted-foreground max-w-4xl mx-auto text-pretty animate-fade-up animation-delay-200">
          Knot is a minimalist link platform for the modern web. Shorten URLs, Generate QR codes,
          build Link trees, and track everything from one clean dashboard.
        </p>

        <div className="mt-10 max-w-xl mx-auto animate-fade-up animation-delay-300">
          <Tabs defaultValue="shorten" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/50 p-1 h-12">
              <TabsTrigger
                value="shorten"
                className="data-[state=active]:bg-background text-lg data-[state=active]:shadow-sm gap-2"
              >
                <Link2 className="h-4 w-4" />
                Shorten Link
              </TabsTrigger>
              <TabsTrigger
                value="qr"
                className="data-[state=active]:bg-background text-lg data-[state=active]:shadow-sm gap-2"
              >
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
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 font-medium flex items-center text-base px-6 group"
                  >
                    Shorten
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={handleCopy}
                        className="shrink-0"
                      >
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
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 font-medium flex items-center text-base px-6 group"
                  >
                    Generate
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                {qrUrl && url && (
                  <div className="mt-4 p-6 bg-card border border-border rounded-lg animate-fade-up">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="p-4 bg-white rounded-xl">
                        {qrUrl && <img src={qrUrl} alt="QR Code" className="w-32 h-32" />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-muted-foreground mb-1">QR Code for</p>
                        <p className="font-mono text-sm text-foreground truncate max-w-62.5">
                          {url}
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="mt-4"
                          onClick={handleDownloadQR}
                        >
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
      </div>
    </section>
  );
}
