"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";

const links = [
  {
    id: "1",
    shortUrl: "short.ly/abc123",
    originalUrl: "https://example.com/very-long-url-that-needs-shortening",
    clicks: 245,
    createdAt: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    shortUrl: "short.ly/xyz789",
    originalUrl: "https://another-example.com/some-page",
    clicks: 128,
    createdAt: "5 hours ago",
    status: "active",
  },
  {
    id: "3",
    shortUrl: "short.ly/qwe456",
    originalUrl: "https://website.com/article/how-to-do-something",
    clicks: 89,
    createdAt: "1 day ago",
    status: "active",
  },
  {
    id: "4",
    shortUrl: "short.ly/rty321",
    originalUrl: "https://blog.example.com/post/interesting-topic",
    clicks: 56,
    createdAt: "2 days ago",
    status: "expired",
  },
];

export function RecentLinks() {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bitcount font-medium">Recent Links</CardTitle>
        <Link href="/dashboard/links">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-mono text-sm font-medium truncate">
                    {link.shortUrl}
                  </p>
                  <Badge
                    variant={link.status === "active" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {link.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {link.originalUrl}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{link.clicks} clicks</span>
                  <span>{link.createdAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy(link.shortUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <a
                    href={`https://${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
