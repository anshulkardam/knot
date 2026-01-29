"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useMyLinks } from "@/hooks/links/useMyLinks";
import { format } from "date-fns";

export function RecentQRCodes() {
  // const handleDownload = (url: string) => {
  //   const link = document.createElement("a");
  //   link.download = "qr-code.png";
  //   link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  //   link.click();
  // };

  const { data, isLoading, isFetching } = useMyLinks({
    search: "",
    offset: 0,
    limit: 5,
    qr: true,
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bitcount font-medium">Recent QR Codes</CardTitle>
        <Link
          href="/dashboard/qr-codes"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data?.data.links.map((qr) => (
            <div
              key={qr._id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="p-2 bg-white rounded-md shrink-0">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${encodeURIComponent(qr.code)}`}
                  alt="QR Code"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm truncate">{`${process.env.NEXT_PUBLIC_SHORT_PREFIX}/${qr.code}`}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{qr.totalVisitCount} scans</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">
                    {format(qr.createdAt, "do MMM y")}
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem onClick={() => handleDownload(qr.url)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem> */}
                  <DropdownMenuItem asChild>
                    <a
                      href={`${process.env.NEXT_PUBLIC_SHORT_PREFIX}/${qr.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open URL
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
