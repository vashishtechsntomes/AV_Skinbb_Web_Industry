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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Header,
  type Row,
  type SortingState,
  type Table as TableType,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  type Dispatch,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
  type SetStateAction,
  type KeyboardEvent,
} from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export enum DataViewMode {
  "list",
  "grid",
}

export const DEFAULT_PAGE_SIZES = [5, 10, 20, 50];
export const LOCAL_STORAGE_VIEW_MODE_KEY = "viewMode";

function createGlobalFilter<TData extends object>(
  filterableKeys?: (keyof TData)[],
) {
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
  columns: ColumnDef<TData, unknown>[];
  pageSize?: number;
  filterableKeys?: (keyof TData)[];
  defaultViewMode: DataViewMode;
}

export interface UseTableResponse<TData> {
  table: TableType<TData>;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setGlobalFilter: Dispatch<SetStateAction<string>>;
  toggleViewMode: () => void;
  viewMode: DataViewMode;
  setViewMode: Dispatch<SetStateAction<DataViewMode>>;
}

export function useTable<TData extends object>({
  rows,
  columns,
  pageSize = 5,
  filterableKeys = [],
  defaultViewMode = DataViewMode.list,
}: UseTableOptions<TData>): UseTableResponse<TData> {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [viewMode, setViewMode] = useState<DataViewMode>(
    defaultViewMode ?? DataViewMode.list,
  );

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
    globalFilterFn: createGlobalFilter<TData>(filterableKeys),
  });

  useEffect(() => {
    const savedViewMode = localStorage.getItem(
      LOCAL_STORAGE_VIEW_MODE_KEY,
    ) as DataViewMode | null;
    if (savedViewMode) setViewMode(savedViewMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", LOCAL_STORAGE_VIEW_MODE_KEY.toString());
  }, [viewMode]);

  return {
    table,
    pagination,
    setGlobalFilter,
    toggleViewMode: () =>
      setViewMode((prev) =>
        prev === DataViewMode.list ? DataViewMode.grid : DataViewMode.list,
      ),
    viewMode,
    setViewMode,
  };
}

function SortableHeader<TData>({ header }: { header: Header<TData, unknown> }) {
  const isSorted = header.column.getIsSorted() as string;
  const toggleHandler = header.column.getToggleSortingHandler();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      toggleHandler?.(e);
    }
  };

  return (
    /* NOSONAR */ // Suppresses this line from being flagged
    <div
      role="button"
      tabIndex={0}
      aria-pressed={!!isSorted}
      aria-label={`Sort by ${String(header.column.columnDef.header)}`}
      onKeyDown={handleKeyDown}
      className={cn(
        "group hover:bg-accent flex h-full w-full items-center gap-2 px-3 focus:outline-none",
        header.column.getCanSort() ? "cursor-pointer" : "text-left",
      )}
      onClick={(e) => {
        // Prevent toggling sort if clicking inside an actual button
        if ((e.target as HTMLElement).closest("button")) return;

        toggleHandler?.(e);
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
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
              asc: <ArrowUpIcon className="text-muted-foreground size-4" />,
              desc: <ArrowDownIcon className="text-muted-foreground size-4" />,
              false: <ArrowUpIcon className="text-border size-4" />,
            }[header.column.getIsSorted() as string]
          }
        </button>
      )) ??
        null}
    </div>
  );
}

interface DataTableBodyProps<TData> extends ComponentProps<"table"> {
  table: TableType<TData>;
  emptyMessage?: string;
}

export function DataTableBody<TData>({
  table,
  emptyMessage,
  ...props
}: DataTableBodyProps<TData> & TableProps) {
  return (
    <Table {...props}>
      <TableHeader>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead key={header.id} className="p-0">
                {!header.isPlaceholder && <SortableHeader header={header} />}
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
              {emptyMessage ?? "No results."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

interface DataGridViewProps<TData> extends ComponentProps<"section"> {
  table: TableType<TData>;
  renderGridItem?: (row: TData) => ReactNode;
  emptyMessage?: string;
}

export function DataGridView<TData>({
  table,
  emptyMessage,
  renderGridItem,
  className,
  ...props
}: DataGridViewProps<TData>) {
  const memoizedItems = useMemo(
    () =>
      renderGridItem
        ? table.getRowModel().rows.map((row) => renderGridItem(row.original))
        : [],
    [table.getRowModel(), renderGridItem, table],
  );

  if (!renderGridItem) return <>Please provide grid layout</>;

  return table.getRowModel().rows.length ? (
    <section
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-5 lg:grid-cols-3",
        className,
      )}
      {...props}
    >
      {memoizedItems}
    </section>
  ) : (
    <div className="bg-background w-full rounded-md p-5 text-center">
      {emptyMessage ?? "No results."}
    </div>
  );
}

interface DataPaginationProps<TData> extends ComponentProps<"div"> {
  table: TableType<TData>;
  showEntryCount?: boolean;
  showPageSizeOptions?: boolean;
}

export function DataPagination<TData>({
  table,
  showEntryCount = true,
  showPageSizeOptions = true,
  className,
  ...props
}: DataPaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const total = table.getRowCount();
  const startEntry = pageIndex * pageSize + 1;
  const endEntry = Math.min((pageIndex + 1) * pageSize, total);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 py-1 md:gap-4",
        className,
      )}
      {...props}
    >
      {showEntryCount && (
        <div>
          Showing {startEntry} to {endEntry} of {total} entries
          {!!table.getFilteredSelectedRowModel().rows.length && (
            <>
              {" "}
              (row {table.getFilteredSelectedRowModel().rows.length} selected)
            </>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {showPageSizeOptions && (
          <div className="flex items-center gap-2">
            <Select
              value={String(pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-[80px]" size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_PAGE_SIZES.map((size) => (
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
  );
}

interface DataTableActionProps<TData> extends ComponentProps<"div"> {
  tableState: UseTableResponse<TData>;
  children?: ReactNode;
}

export function DataTableAction<TData>({
  tableState,
  children,
  className,
  ...props
}: DataTableActionProps<TData>) {
  const { table, viewMode, toggleViewMode } = tableState;
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div></div>
      <div className="flex flex-wrap gap-2 md:gap-4">
        <Input
          startIcon={<MagnifyingGlassIcon />}
          placeholder="Search..."
          onChange={(event) => table?.setGlobalFilter(event.target.value)}
          className="max-w-52"
          aria-label="Search table content"
        />

        {children}
        {viewMode === DataViewMode.list && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlined" className="ml-auto">
                Columns <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant={"outlined"} size={"icon"} onClick={toggleViewMode}>
          {viewMode !== DataViewMode.grid ? (
            <TableCellsIcon />
          ) : (
            <Squares2X2Icon />
          )}
        </Button>
      </div>
    </div>
  );
}
interface DataTableProps<TData extends object>
  extends Omit<UseTableOptions<TData>, "defaultViewMode"> {
  bodyProps?: Omit<DataTableBodyProps<TData>, "table">;
  paginationProps?: Omit<DataPaginationProps<TData>, "table">;
  actionProps?: Omit<DataTableActionProps<TData>, "tableState">; // Optional custom actions (e.g. filters, buttons)
  showPagination?: boolean;
  showAction?: boolean;
}

export function DataTable<TData extends object>({
  rows,
  columns,
  bodyProps = {},
  paginationProps = {},
  actionProps,
  showAction = true,
  showPagination = true,
  ...props
}: DataTableProps<TData>) {
  const tableState = useTable({
    rows,
    columns,
    defaultViewMode: DataViewMode.list,
    ...props,
  });

  const { table } = tableState;
  return (
    <div className="space-y-5">
      {showAction && (
        <DataTableAction
          tableState={tableState}
          {...actionProps}
        ></DataTableAction>
      )}

      <DataTableBody table={table} {...bodyProps} />
      {showPagination && <DataPagination table={table} {...paginationProps} />}
    </div>
  );
}
interface DataTableToggleProps<TData extends object>
  extends Omit<UseTableOptions<TData>, "defaultViewMode"> {
  bodyProps?: Omit<DataTableBodyProps<TData>, "table">;
  gridProps?: Omit<DataGridViewProps<TData>, "table">;
  paginationProps?: Omit<DataPaginationProps<TData>, "table">;
  actionProps?: Omit<DataTableActionProps<TData>, "tableState">; // Optional custom actions (e.g. filters, buttons)
  showPagination?: boolean;
  showAction?: boolean;
}

export function DataTableToogle<TData extends object>({
  rows,
  columns,
  bodyProps = {},
  gridProps = {},
  paginationProps = {},
  actionProps,
  showAction = true,
  showPagination = true,
  ...props
}: DataTableToggleProps<TData>) {
  const tableState = useTable({
    rows,
    columns,
    defaultViewMode: DataViewMode.grid,
    ...props,
  });

  const { table, viewMode } = tableState;
  return (
    <div className="space-y-5">
      {showAction && (
        <DataTableAction
          tableState={tableState}
          {...actionProps}
        ></DataTableAction>
      )}

      {viewMode === DataViewMode.list ? (
        <DataTableBody table={table} {...bodyProps} />
      ) : (
        <DataGridView table={table} {...gridProps} />
      )}
      {showPagination && <DataPagination table={table} {...paginationProps} />}
    </div>
  );
}
