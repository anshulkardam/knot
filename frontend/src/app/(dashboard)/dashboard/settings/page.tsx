import { ProfileSettings } from "@/components/dashboard/settings/profile-settings";
import { SecuritySettings } from "@/components/dashboard/settings/security-settings";
import { DangerZone } from "@/components/dashboard/settings/danger-zone";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings – Knot",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-bitcount tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Profile */}
      <section className="space-y-6">
        <ProfileSettings />
      </section>

      {/* Security */}
      <section className="space-y-6">
        <SectionHeader title="Security" description="Manage your password and account security" />
        <SecuritySettings />
      </section>

      {/* Danger */}
      <section className="space-y-6">
        <DangerZone />
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  description,
  destructive,
}: {
  title: string;
  description: string;
  destructive?: boolean;
}) {
  return (
    <div className="space-y-1">
      <h2 className={`text-xl font-semibold ${destructive ? "text-destructive" : ""}`}>{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
