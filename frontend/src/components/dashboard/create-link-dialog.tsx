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
import { Plus, Link2, Check, Copy } from "lucide-react";
import { useGenShortLink } from "@/hooks/links/useGenShortLink";
import { generateTitleFromUrl } from "@/lib/helper";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export function CreateLinkDialog({ onLinkCreated }: { onLinkCreated?: () => void }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customBackHalf, setCustomBackHalf] = useState("");
  const [shortened, setShortened] = useState("");
  const [copied, setCopied] = useState(false);
  const genLink = useGenShortLink();

  const handleCopy = () => {
    navigator.clipboard.writeText(shortened);
    setCopied(true);
    toast.success("Copied to Clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();

    genLink.mutate(
      {
        destination: url,
        title: generateTitleFromUrl(url),
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
          <DialogTitle>Create new link</DialogTitle>
          <DialogDescription>
            Shorten a long URL and optionally customize the back-half.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleShorten} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="My Link Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Leave empty to use the domain name</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Destination URL</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backHalf">Custom back-half (optional)</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {process.env.NEXT_PUBLIC_SHORT_PREFIX}/
              </span>
              <Input
                id="backHalf"
                placeholder="my-custom-link"
                value={customBackHalf}
                onChange={(e) => setCustomBackHalf(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Leave empty to generate a random back-half
            </p>
          </div>

          {shortened && (
            <div className="mt-4 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between gap-3">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Your shortened link</p>
                  <p className="font-mono text-sm break-all">{shortened}</p>
                </div>

                <Button type="button" size="icon" variant="secondary" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          {shortened ? (
            <Button
              variant="default"
              className="w-full mt-3"
              onClick={() => {
                setShortened("");
                setUrl("");
                setTitle("");
                setCustomBackHalf("");
              }}
            >
              Create another link
            </Button>
          ) : (
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={genLink.isPending || !url.trim()}>
                {genLink.isPending ? <Spinner /> : "Create Link"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
