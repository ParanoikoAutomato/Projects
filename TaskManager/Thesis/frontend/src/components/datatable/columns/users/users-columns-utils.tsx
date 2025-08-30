/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import { UserActionColumn, UserTextColumn } from "./users-columns";

export const userColumnsMapper = {
  name: "Name",
  role: "Role",
} as const;

type UserColumn = keyof typeof userColumnsMapper;

export const createUserTableColumns = (
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
          title={userColumnsMapper[c as UserColumn]}
        />
      ),
      cell: ({ row }) => {
        if (c === "name") {
          return (
            <UserTextColumn
              text={row.original.name}
            />
          );
        } else if (c === "role") {
          return <UserTextColumn text={row.original.role} />;
        }
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
    cell: ({ row }) => <UserActionColumn row={row} />,
  });

  return columns;
};
