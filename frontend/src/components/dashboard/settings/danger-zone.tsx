"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2 } from "lucide-react";

export function DangerZone() {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;

    try {
      setIsDeleting(true);

      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: logout + redirect
      setOpen(false);
      setConfirmText("");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-1">
        <h2 className={`text-xl font-semibold text-destructive`}>Danger Zone</h2>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and all associated data
        </p>
      </div>
      {/* Danger card */}
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Delete my account
      </Button>

      {/* Confirmation dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete my account
            </DialogTitle>
            <DialogDescription>
              This action is irreversible. All links, analytics, and data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confirm">
                Type <span className="font-grotesk font-bold">DELETE</span> to confirm
              </Label>
              <Input
                id="confirm"
                placeholder="DELETE"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setConfirmText("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmText !== "DELETE" || isDeleting}
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete my account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
