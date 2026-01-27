"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, ExternalLink, MoreHorizontal, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export type LinkRow = {
  _id: string;
  title: string;
  destination: string;
  code: string;
  isActive: boolean;
  totalVisitCount: number;
  createdAt: string;
};

export const columns: ColumnDef<LinkRow>[] = [
  {
    accessorKey: "code",
    header: "Short link",
    cell: ({ row }) => {
      const [copied, setCopied] = useState(false);
      const shortUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${row.original.code}`;

      const copy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        toast.success("Copied to Clipboard")
      };

      return (
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={copy}>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <div className="flex flex-col leading-tight">
            <span className="font-medium">{shortUrl}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => (
      <span className="text-muted-foreground truncate max-w-[420px] block">
        {row.original.destination}
      </span>
    ),
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {row.original.totalVisitCount.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
          row.original.isActive
            ? "bg-emerald-500/10 text-emerald-500"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {row.original.isActive ? "Live" : "not Live"}
      </span>
    ),
  },
  {
    id: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
      );
    },
  },
];
