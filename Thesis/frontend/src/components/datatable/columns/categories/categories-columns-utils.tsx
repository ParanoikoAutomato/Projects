/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import {
  CategoryActionColumn,
  CategoryDateColumn,
  CategoryTextColumn,
} from "./categories-columns";

export const categoryColumnsMapper = {
  name: "Name",
  createdAt: "Created At",
  updatedAt: "Updated At",
} as const;

type CategoryColumn = keyof typeof categoryColumnsMapper;

export const createCategoryTableColumns = (
  tableColumns: string[]
): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [];

  tableColumns.forEach((c) => {
    columns.push({
      id: c,
      accessorKey: c,
      size: 250,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={categoryColumnsMapper[c as CategoryColumn]}
        />
      ),
      cell: ({ row }) => {
        return ["createdAt", "updatedAt"].includes(c) ? (
          <CategoryDateColumn date={row.getValue(c)} />
        ) : (
          <CategoryTextColumn text={row.getValue(c)} />
        );
      },
      filterFn: "includesString",
      enableSorting: true,
      enableHiding: true,
      enableColumnFilter: true,
      enableGlobalFilter: true,
    });
  });

  columns.push({
    id: "actions",
    cell: ({ row }) => <CategoryActionColumn row={row} />,
  });

  return columns;
};
