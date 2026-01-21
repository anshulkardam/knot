import { LinksTable } from "@/components/dashboard/links-table"
import { CreateLinkDialog } from "@/components/dashboard/create-link-dialog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Links - Knot",
  description: "Manage all your shortened links",
}

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Links</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your shortened links</p>
        </div>
        <CreateLinkDialog />
      </div>

      <LinksTable />
    </div>
  )
}
