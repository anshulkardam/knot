import { Link2, QrCode, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Create Link-in-Bio",
    description: "Build your personalized bio page in minutes",
    href: "/dashboard/link-tree",
    primary: true,
    button: "Open bio editor",
  },
  {
    title: "Create Short Link",
    description: "Shorten any URL and track its performance",
    href: "/dashboard/links",
    primary: false,
    button: "Create Link",
  },
  {
    title: "Generate QR Code",
    description: "Create QR codes for any destination",
    href: "/dashboard/qr-codes",
    primary: false,
    button: "Generate QR",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action) => {
        return (
          <Link
            key={action.title}
            href={action.href}
            className={cn(
              "group relative rounded-xl border bg-card p-6 transition-all",
              "hover:bg-accent/40 hover:border-border/80",
              action.primary && "border-primary/30 bg-primary/5 hover:bg-primary/10",
            )}
          >
            <div className="flex flex-col h-full">
              {/* Text */}
              <h3 className="font-bitcount text-2xl text-foreground">{action.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>

              {/* CTA */}
              <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm font-medium text-primary transition-all group-hover:gap-2">
                {action.button}
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
