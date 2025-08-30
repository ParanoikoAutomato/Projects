/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import {
  ProjectActionColumn,
  ProjectDateColumn,
  ProjectProgressColumn,
  ProjectTextColumn,
  ProjectTitleColumn,
} from "./projects-columns";

export const projectColumnsMapper = {
  title: "Title",
  createdAt: "Created At",
  updatedAt: "Updated At",
  progress: "Progress",
} as const;

type ProjectColumn = keyof typeof projectColumnsMapper;

export const createProjectTableColumns = (
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
          title={projectColumnsMapper[c as ProjectColumn]}
        />
      ),
      cell: ({ row }) => {
        if (["createdAt", "updatedAt"].includes(c)) {
          return <ProjectDateColumn date={row.getValue(c)} />;
        } else if (c === "progress") {
          return <ProjectProgressColumn tasks={row.original.tasks} />;
        } else if (c === "title") {
          return (
            <ProjectTitleColumn title={row.getValue(c)} id={row.original.id} />
          );
        } else {
          return <ProjectTextColumn text={row.getValue(c)} />;
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
    cell: ({ row }) => <ProjectActionColumn row={row} />,
  });

  return columns;
};
