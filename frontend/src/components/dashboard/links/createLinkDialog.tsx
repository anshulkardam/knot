"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Plus } from "lucide-react";
import { toast } from "sonner";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shortened, setShortened] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title"),
      destination: formData.get("destination"),
      backHalf: formData.get("backHalf") || undefined,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/v1/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create link");
      }

      const data = await res.json();
      setShortened(data.link.shortUrl);
      toast.success("Link created");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortened) return;
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to Clipboard");
  };

  const resetAndClose = () => {
    setShortened(null);
    setCopied(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Link
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a short link</DialogTitle>
        </DialogHeader>

        {!shortened ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input name="title" required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="destination">Destination URL</Label>
              <Input name="destination" type="url" required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="backHalf">Custom back-half (optional)</Label>
              <Input name="backHalf" placeholder="my-link" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Link"}
            </Button>
          </form>
        ) : (
          <div className="mt-2 p-4 bg-card border border-border rounded-lg animate-fade-up">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-1/10 rounded-lg">
                  <Check className="h-4 w-4 text-chart-1" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">
                    Your shortened link
                  </p>
                  <p className="font-mono text-sm text-foreground">
                    {shortened}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={resetAndClose}
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
