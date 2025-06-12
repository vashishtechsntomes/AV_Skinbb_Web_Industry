import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "@/components/ui/table";
import { cn } from "@/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue = unknown> extends TableProps {
  rows: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageSize?: number;
  showPagination?: boolean;
  showEntryCount?: boolean;
  showPageSizeOptions?: boolean;
}

export function DataTable<TData>({
  rows,
  columns,
  pageSize = 10,
  showPagination = true,
  showEntryCount = true,
  showPageSizeOptions = true,
  ...props
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
    manualSorting: false,
  });

  const pagePageSize = table.getState().pagination.pageSize;
  const currentPage = table.getState().pagination.pageIndex; // zero-based
  const totalEntries = table.getRowCount();

  const startEntry = currentPage * pagePageSize + 1;
  const endEntry = Math.min((currentPage + 1) * pagePageSize, totalEntries);

  return (
    <>
      <Table {...props}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-0">
                    {header.isPlaceholder ? null : (
                      <div
                        role="button"
                        tabIndex={0}
                        aria-pressed={!!header.column.getIsSorted()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            header.column.getToggleSortingHandler()?.(e);
                            e.preventDefault();
                          }
                        }}
                        className={cn(
                          "group hover:bg-accent flex h-full w-full items-center gap-2 px-3 focus:outline-none",
                          header.column.getCanSort()
                            ? "cursor-pointer"
                            : "text-left",
                        )}
                        aria-label={`Sort by ${String(header.column.columnDef.header)}`}
                        onClick={(e) => {
                          // Prevent toggling sort if clicking inside an actual button
                          if ((e.target as HTMLElement).closest("button"))
                            return;

                          header.column.getToggleSortingHandler()?.(e);
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {(header.column.getCanSort() && (
                          <button
                            type="button"
                            className={cn(
                              "hover:bg-background grid size-7 cursor-pointer place-content-center rounded-md opacity-0 group-hover:opacity-100",
                              header.column.getIsSorted() && "opacity-100",
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {
                              {
                                asc: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="text-muted-foreground size-4 rotate-90"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                  </svg>
                                ),
                                desc: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="text-muted-foreground size-4 -rotate-90"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                  </svg>
                                ),
                                false: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="text-border size-4 rotate-90"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                  </svg>
                                ),
                              }[header.column.getIsSorted() as string]
                            }
                          </button>
                        )) ??
                          null}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
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
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {showPagination && (
        <div className="mt-4 flex items-center justify-between py-1">
          {showEntryCount && (
            <div>
              Showing {startEntry} to {endEntry} of {totalEntries} entries
            </div>
          )}
          <div className="flex items-center space-x-2">
            {showPageSizeOptions && (
              <>
                <span className="text-sm">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-[80px]" size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                startIcon={<ChevronLeftIcon className="!size-5" />}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              ></Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                startIcon={<ChevronRightIcon className="!size-5" />}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
