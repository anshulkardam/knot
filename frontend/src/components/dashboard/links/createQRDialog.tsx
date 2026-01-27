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
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";

export function CreateQRDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = formData.get("destination") as string;

    const payload = {
      title: formData.get("title"),
      destination,
      backHalf: formData.get("backHalf") || undefined,
    };

    try {
      setLoading(true);

      const res = await fetch("/api/v1/links/qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create QR");
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      setQrUrl(objectUrl);
      setUrl(destination);
      toast.success("QR code created");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrUrl) return;

    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAndClose = () => {
    if (qrUrl) URL.revokeObjectURL(qrUrl);
    setQrUrl(null);
    setUrl(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus className="h-4 w-4 mr-2" />
          Create QR
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create QR Code</DialogTitle>
        </DialogHeader>

        {!qrUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input name="title" required />
            </div>

            <div className="space-y-1">
              <Label>Destination URL</Label>
              <Input name="destination" type="url" required />
            </div>

            <div className="space-y-1">
              <Label>Custom back-half (optional)</Label>
              <Input name="backHalf" placeholder="my-qr" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Generating..." : "Generate QR"}
            </Button>
          </form>
        ) : (
          <div className="mt-2 p-6 bg-card border border-border rounded-lg animate-fade-up">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="p-4 bg-white rounded-xl">
                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="w-32 h-32"
                />
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground mb-1">
                  QR Code for
                </p>
                <p className="font-mono text-sm truncate">
                  {url}
                </p>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={handleDownloadQR}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
              </div>
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
