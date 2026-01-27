import { columns } from "@/components/dashboard/links/columns";
import { LinksTable } from "@/components/dashboard/links/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function LinksPage() {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bitcount text-foreground mb-1">Links</h1>
            <p className="text-muted-foreground">Manage and track all your shortened links</p>
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create Link
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <LinksTable columns={columns} isQR={false} />
      </div>
    </div>
  );
}
