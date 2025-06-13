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
} from "@/components/ui/table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type Table as TableType,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

function createGlobalFilter<TData extends object>(filterableKeys?: string[]) {
  return (row: Row<TData>, _columnId: string, filterValue: string) => {
    const keys = filterableKeys?.length
      ? filterableKeys
      : Object.keys(row.original);

    return keys.some((key) => {
      const value = row.original[key as keyof TData];
      return String(value ?? "")
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  };
}

interface UseTableOptions<TData> {
  rows: TData[];
  columns: ColumnDef<TData, any>[];
  pageSize?: number;
  filterableKeys?: string[];
}

export function useTable<TData extends object>({
  rows,
  columns,
  pageSize = 5,
  filterableKeys = [],
}: UseTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const globalFilterFn = createGlobalFilter<TData>(filterableKeys);

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    globalFilterFn,
  });

  return {
    table,
    pagination,
    setGlobalFilter,
  };
}
interface DataTableProps<TData> {
  table: TableType<TData>;
  showPagination?: boolean;
  showEntryCount?: boolean;
  showPageSizeOptions?: boolean;
}

export function DataTable<TData>({
  table,
  showPagination = true,
  showEntryCount = true,
  showPageSizeOptions = true,
}: DataTableProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const total = table.getRowCount();
  const startEntry = pageIndex * pageSize + 1;
  const endEntry = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
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
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showPagination && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 py-1 md:gap-4">
          {showEntryCount && (
            <div>
              Showing {startEntry} to {endEntry} of {total} entries{" "}
              {!!table.getFilteredSelectedRowModel().rows.length && (
                <>
                  (row {table.getFilteredSelectedRowModel().rows.length}{" "}
                  selected)
                </>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {showPageSizeOptions && (
              <div className="flex items-center gap-2">
                {/* <span className="text-sm">
                  Page {pageIndex + 1} of {table.getPageCount()}
                </span> */}
                <Select
                  value={String(pageSize)}
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
                Entries per page
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                startIcon={<ChevronLeftIcon className="!size-5" />}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                startIcon={<ChevronRightIcon className="!size-5" />}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
