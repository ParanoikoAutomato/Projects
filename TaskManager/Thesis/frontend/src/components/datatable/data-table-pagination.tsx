import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { PaginationEllipsis } from "../ui/pagination";
import { generateTablePagination } from "./data-table-utils";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions: number[];
}

type PaginationType = ReturnType<typeof generateTablePagination>;

export function DataTablePagination<TData>({
  table,
  pageSizeOptions,
}: DataTablePaginationProps<TData>) {
  const pagination = generateTablePagination(table);

  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              // setOffset(Number(value));
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <TablePagination table={table} pagination={pagination} />
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

type TablePaginationProps<TData> = {
  table: Table<TData>;
  pagination: PaginationType;
};
export function TablePagination<TData>({
  table,
  pagination = [],
}: TablePaginationProps<TData>) {
  return pagination.map((page) => {
    if (page.type === "ellipsis") {
      return <PaginationEllipsis key={page.pageIndex} className="muted" />;
    }

    return (
      <Button
        key={page.pageIndex}
        variant={
          page.pageIndex === table.getState().pagination.pageIndex
            ? "outline"
            : "ghost"
        }
        className="h-8 min-w-8 px-2"
        onClick={() => {
          table.setPageIndex(page.pageIndex);
        }}
      >
        {page.pageNumber}
      </Button>
    );
  });
}
