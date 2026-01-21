import { ProfileSettings } from "@/components/dashboard/settings/profile-settings"
import { SecuritySettings } from "@/components/dashboard/settings/security-settings"
import { DangerZone } from "@/components/dashboard/settings/danger-zone"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings - Knot",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <ProfileSettings />
      <SecuritySettings />
      <DangerZone />
    </div>
  )
}
