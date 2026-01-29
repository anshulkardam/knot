import { CreateQRDialog } from "@/components/dashboard/create-qr-dialog";
import { columns } from "@/components/dashboard/links/columns";
import { LinksTable } from "@/components/dashboard/links/data-table";

export default function LinksPage() {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bitcount text-foreground mb-1">QR Codes</h1>
            <p className="text-muted-foreground">Manage and track all your QR codes</p>
          </div>
          <CreateQRDialog />
        </div>
      </div>
      <div className="space-y-6">
        <LinksTable columns={columns} isQR={true} />
      </div>
    </div>
  );
}
