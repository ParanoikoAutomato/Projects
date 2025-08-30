/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../data-table-column-header";
import {
  TaskAssigneesColumn,
  TaskCriticalityColumn,
  TaskDateColumn,
  TaskRowAction,
  TaskStatusColumn,
  TaskTextColumn,
  TaskTitleColumn,
} from "./tasks-columns";
import { TaskDataTable } from "@/services/task/task.types";

export const taskColumnsMapper: { [K in keyof TaskDataTable]: string } = {
  id: "ID",
  title: "Title",
  description: "description",
  category: "category",
  criticality: "criticality",
  users: "users",
  status: "status",
  date: "date",
  acceptedBy: "acceptedBy",
};

type TaskColumn = keyof typeof taskColumnsMapper;

export const createTasksTableColumns = (
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
          title={taskColumnsMapper[c as TaskColumn]}
        />
      ),
      cell: ({ row }) => {
        if (c === "users") {
          return (
            <TaskAssigneesColumn
              users={row.original.users}
              acceptedBy={row.original.acceptedBy}
            />
          );
        } else if (c === "status") {
          return <TaskStatusColumn status={row.original.status} />;
        } else if (c === "date") {
          return <TaskDateColumn date={row.original.date} />;
        } else if (c === "criticality") {
          return (
            <TaskCriticalityColumn criticality={row.original.criticality} />
          );
        } else if (c === "title") {
          return (
            <TaskTitleColumn title={row.original.title} id={row.original.id} />
          );
        } else {
          return <TaskTextColumn text={row.getValue(c)} />;
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
    cell: ({ row }) => <TaskRowAction row={row} />,
  });

  return columns;
};
