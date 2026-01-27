"use client";
import { RecentLinks } from "@/components/dashboard/recent-links";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentQRCodes } from "@/components/dashboard/recent-qr-codes";
import { useAuth } from "@/context/authContext";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="font-bitcount text-4xl font-medium text-foreground mb-1">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">Here's what's happening with your links today.</p>
      </div>

      <section className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <QuickActions />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLinks />
        <RecentQRCodes />
      </div>
    </div>
  );
}
