import AlertModal from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskStatus } from "@/enums/enums";
import { useDeleteProjectMutation } from "@/features/projects/projects.mutations";
import { ProjectDataTable } from "@/services/projects/project.types";
import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProjectTextColumn = ({ text }: { text: string }) => {
  return <div className="min-w-[50px]">{text}</div>;
};

export const ProjectTitleColumn = ({
  title,
  id,
}: {
  title: string;
  id: string;
}) => {
  return (
    <Link
      className="min-w-[50px]"
      to={{
        search: `?mode=view&id=${id}`,
      }}
    >
      {title}
    </Link>
  );
};

export const ProjectDateColumn = ({ date }: { date: string }) => {
  return <div className="min-w-[50px]">{format(date, "dd/MM/yyyy")}</div>;
};

const TaskStatusStyle = {
  [TaskStatus.OPEN]: "bg-gray-200",
  [TaskStatus.IN_PROGRESS]: "bg-blue-500",
  [TaskStatus.COMPLETED]: "bg-green-500",
  [TaskStatus.APPROVED]: "bg-green-700",
  [TaskStatus.REJECTED]: "bg-red-500",
};

interface ProjectProgressColumnProps {
  tasks: { _id: string; status: TaskStatus }[];
}

export const ProjectProgressColumn = ({
  tasks,
}: ProjectProgressColumnProps) => {
  const totalTasks = tasks.length;

  // Count tasks by status
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] += 1;
      return acc;
    },
    {
      [TaskStatus.OPEN]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.COMPLETED]: 0,
      [TaskStatus.APPROVED]: 0,
      [TaskStatus.REJECTED]: 0,
    }
  );

  // Calculate the percentage of each status
  const openPercentage = (statusCounts[TaskStatus.OPEN] / totalTasks) * 100;
  const inProgressPercentage =
    (statusCounts[TaskStatus.IN_PROGRESS] / totalTasks) * 100;
  const completedPercentage =
    (statusCounts[TaskStatus.COMPLETED] / totalTasks) * 100;
  const approvedPercentage =
    (statusCounts[TaskStatus.APPROVED] / totalTasks) * 100;
  const rejectedPercentage =
    (statusCounts[TaskStatus.REJECTED] / totalTasks) * 100;

  return (
    <div className="min-w-[50px]">
      <div className="relative w-full h-4 bg-gray-200 rounded-lg ">
        {/* In Progress */}
        {inProgressPercentage > 0 && (
          <div
            className={`absolute left-0 h-4 flex items-center justify-center text-white  ${
              TaskStatusStyle[TaskStatus.IN_PROGRESS]
            }`}
            style={{
              width: `${inProgressPercentage}%`,
            }}
          >
            {statusCounts[TaskStatus.IN_PROGRESS]}
          </div>
        )}
        {/* Completed */}
        {completedPercentage > 0 && (
          <div
            className={`absolute left-0 h-4 flex items-center justify-center text-white  ${
              TaskStatusStyle[TaskStatus.COMPLETED]
            }`}
            style={{
              width: `${completedPercentage}%`,
              marginLeft: `${inProgressPercentage}%`,
            }}
          >
            {statusCounts[TaskStatus.COMPLETED]}
          </div>
        )}
        {/* Approved */}
        {approvedPercentage > 0 && (
          <div
            className={`absolute left-0 h-4 flex items-center justify-center text-white ${
              TaskStatusStyle[TaskStatus.APPROVED]
            }`}
            style={{
              width: `${approvedPercentage}%`,
              marginLeft: `${inProgressPercentage + completedPercentage}%`,
            }}
          >
            {statusCounts[TaskStatus.APPROVED]}
          </div>
        )}
        {/* Rejected */}
        {rejectedPercentage > 0 && (
          <div
            className={`absolute left-0 h-4 flex items-center justify-center text-white ${
              TaskStatusStyle[TaskStatus.REJECTED]
            } rounded-r`}
            style={{
              width: `${rejectedPercentage}%`,
              marginLeft: `${
                inProgressPercentage + completedPercentage + approvedPercentage
              }%`,
            }}
          >
            {statusCounts[TaskStatus.REJECTED]}
          </div>
        )}
        {openPercentage > 0 && (
          <div
            className={`absolute left-0 h-4 flex items-center justify-center ${
              TaskStatusStyle[TaskStatus.OPEN]
            } rounded-l`}
            style={{
              width: `${openPercentage}%`,
              marginLeft: `${
                rejectedPercentage +
                inProgressPercentage +
                completedPercentage +
                approvedPercentage
              }%`,
            }}
          >
            {statusCounts[TaskStatus.OPEN]}
          </div>
        )}
      </div>
    </div>
  );
};

interface DataTableRowActionProps {
  row: Row<ProjectDataTable>;
}

export const ProjectActionColumn = ({ row }: DataTableRowActionProps) => {
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const deleteProjectMutation = useDeleteProjectMutation();

  const onDeleteProject = () => {
    openDeleteDialog();
  };

  const onUpdateProject = () => {
    navigate({ search: `?mode=edit&id=${row.original.id}` });
  };

  const openDeleteDialog = () => setDeleteDialog(true);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal size={20} />

            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={onUpdateProject}
            className="justify-between"
          >
            <div className="flex justify-between items-center gap-2 ">
              <Pencil className="h-5 w-5" />
              <span className="text-base">Edit</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDeleteProject}
            className="justify-between"
          >
            <div className="flex justify-between items-center gap-2 ">
              <Trash2 className="h-5 w-5" />
              <span className="text-base">Delete</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={deleteDialog}
        setOpen={setDeleteDialog}
        title="Delete"
        description="Are you sure you want to delete it?"
        onSuccess={() => {
          deleteProjectMutation.mutate(row.original.id);
          setDeleteDialog(false);
        }}
      />
    </>
  );
};
