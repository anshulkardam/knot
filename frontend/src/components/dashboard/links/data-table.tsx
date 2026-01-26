"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMyLinks } from "@/hooks/links/useMyLinks";

export function LinksTable({ columns }: { columns: any }) {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data, isLoading, isFetching } = useMyLinks({
    search,
    offset,
    limit,
  });

  const table = useReactTable({
    data: data?.data.links ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="max-w-sm">
        <Input
          placeholder="Search links..."
          value={search}
          onChange={(e) => {
            setOffset(0);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center">
                  Loading links…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center">
                  No links found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {isFetching && !isLoading && (
          <div className="px-4 py-2 text-xs text-muted-foreground">Updating…</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {offset + 1}–{Math.min(offset + limit, data?.data.total ?? 0)} of{" "}
          {data?.data.total ?? 0}
        </span>
        <div className="flex gap-2">
          <button disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - limit))}>
            Previous
          </button>
          <button
            disabled={offset + limit >= (data?.data.total ?? 0)}
            onClick={() => setOffset(offset + limit)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
