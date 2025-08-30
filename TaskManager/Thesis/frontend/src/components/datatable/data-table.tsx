import { memo, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
// import { DataTablePagination } from './data-table-pagination';
import { CellSkeleton } from "./data-table-skeleton";
import { DataTableToolbar } from "./data-table-toolbar";
import { useSticky } from "./plugins/table-sticky";

// import { DataTableToolbar } from './data-table-toolbar';
// import { useSticky } from './plugins/table-sticky';

type DataTableProps<TData, TValue, TColumns extends Record<string, string>> = {
  // uniqueId: keyof TColumns;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  columnsLabels?: TColumns;
  leftSticky?: number;
  rightSticky?: number;
  isLoading: boolean;
  pageSizeOptions?: number[];
  className?: string;
  pageCount?: number;
};

function DataTableComponent<
  TData,
  TValue,
  TColumns extends Record<string, string>
>(props: DataTableProps<TData, TValue, TColumns>) {
  const {
    columns,
    data,
    leftSticky = 0,
    rightSticky = 0,
    isLoading,
    pageSizeOptions = [15, 25, 50, 100],
    className,
    pageCount,
  } = props;

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableData = useMemo(
    () => (isLoading ? Array(15).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <CellSkeleton />,
          }))
        : columns,
    [isLoading, columns]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 15 },
    },
    pageCount: pageCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // getRowId: (row, _index, parent) => {
    //   return parent ? [parent.id, row[uniqueId]].join('.') : row[uniqueId];
    // },
  });

  const { headerStyles, cellStyles } = useSticky({
    left: leftSticky,
    right: rightSticky,
    columns,
    columnVisibility,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <DataTableToolbar table={table} />
      <div className="scrollbar relative h-full w-full overflow-auto rounded-md border">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="bg sticky top-0 z-10 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      // className='whitespace-nowrap'
                      className="border-b border-border"
                      style={headerStyles[header.column.id]}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-b border-border"
                      style={cellStyles[cell.column.id]}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} {...{ pageSizeOptions }} />
    </div>
  );
}

export const DataTable = memo(DataTableComponent) as typeof DataTableComponent;

// A debounced input react component
