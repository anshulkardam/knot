"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Link2, QrCode } from "lucide-react";
import { generateTitleFromUrl } from "@/lib/helper";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useGenQR } from "@/hooks/links/useGenQR";

export function CreateQRDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const genQR = useGenQR();

  const handleQR = (e: React.FormEvent) => {
    e.preventDefault();

    genQR.mutate(
      {
        destination: url,
        title: title || generateTitleFromUrl(url),
      },
      {
        onSuccess: (blob) => {
          if (qrUrl) URL.revokeObjectURL(qrUrl);
          const objectUrl = URL.createObjectURL(blob);
          setQrUrl(objectUrl);
        },
        onError: (err) => {
          toast.error(err.message || "QR generation failed");
        },
      },
    );
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  };

  const reset = () => {
    if (qrUrl) URL.revokeObjectURL(qrUrl);
    setQrUrl(null);
    setUrl("");
    setTitle("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create QR
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new QR Code</DialogTitle>
          <DialogDescription>
            Generate a downloadable QR code for any URL.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleQR} className="space-y-4 py-4">
          {!qrUrl && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Title (optional)</Label>
                <Input
                  id="title"
                  placeholder="My QR Code"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">Destination URL</Label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {qrUrl ? (
            <div className="mt-4 p-6 bg-card border border-border rounded-lg flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-xl">
                <img src={qrUrl} alt="QR Code" className="w-32 h-32" />
              </div>

              <div className="flex gap-2 w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleDownload}
                >
                  Download PNG
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={reset}
                >
                  Create another
                </Button>
              </div>
            </div>
          ) : (
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={genQR.isPending || !url.trim()}>
                {genQR.isPending ? <Spinner /> : "Generate QR"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
