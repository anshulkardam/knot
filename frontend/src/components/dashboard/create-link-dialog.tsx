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
import { Plus, Link2, Loader2 } from "lucide-react";
import { useApi } from "@/lib/apiClient";

interface CreateLinkResponse {
  link: {
    id: string;
    title: string;
    destination: string;
    shortUrl: string;
  };
}

export function CreateLinkDialog({
  onLinkCreated,
}: {
  onLinkCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customBackHalf, setCustomBackHalf] = useState("");
  const api = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);

    try {
      const response = await api.post<CreateLinkResponse>("/link/generate", {
        title: title.trim() || new URL(url).hostname,
        destination: url.trim(),
        backHalf: customBackHalf.trim() || undefined,
      });

      console.log("Link created successfully:", response.data);
      alert("Link created successfully!");

      setUrl("");
      setTitle("");
      setCustomBackHalf("");
      setOpen(false);

      // Notify parent component to refresh links
      onLinkCreated?.();
    } catch (error: any) {
      console.error("Error creating link:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="My Link Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the domain name
            </p>
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
                short.ly/
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

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !url.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Link"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
