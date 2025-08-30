import AlertModal from "@/components/alert-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskStatusStyle } from "@/constants/tasks";
import { TaskCriticality, TaskStatus, UserRoles } from "@/enums/enums";
import {
  useAcceptTaskMutation,
  useApproveTaskMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useRejectTaskMutation,
} from "@/features/tasks/tasks.mutations";
import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { TaskDataTable } from "@/services/task/task.types";
import { Row } from "@tanstack/react-table";
import { format, isAfter, parseISO } from "date-fns";
import {
  CheckCheck,
  Circle,
  CircleCheckBig,
  MoreHorizontal,
  Pencil,
  SquareX,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TaskStatusLabel = {
  [TaskStatus.OPEN]: "OPEN",
  [TaskStatus.IN_PROGRESS]: "IN PROGRESS",
  [TaskStatus.COMPLETED]: "COMPLETED",
  [TaskStatus.APPROVED]: "APPROVED",
  [TaskStatus.REJECTED]: "REJECTED",
};

export const TaskTextColumn = ({ text }: { text: string }) => {
  return <div className="min-w-[50px]">{text}</div>;
};

export const TaskTitleColumn = ({
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

export const TaskAssigneesColumn = ({
  users,
  acceptedBy,
}: {
  users: { _id: string; firstName: string; lastName: string }[];
  acceptedBy: string | null;
}) => {
  return (
    <div className="min-w-[50px]">
      {users.map((user) => (
        <Badge
          key={user._id}
          variant="outline"
          className={
            user._id == acceptedBy ? "border-green-500 text-green-500" : ""
          }
        >
          {user.firstName} {user.lastName}
        </Badge>
      ))}
    </div>
  );
};

export const TaskStatusColumn = ({ status }: { status: TaskStatus }) => {
  return (
    <div className="min-w-[50px]">
      <Badge variant="outline" className={TaskStatusStyle[status]}>
        {TaskStatusLabel[status]}
      </Badge>
    </div>
  );
};

export const TaskDateColumn = ({ date }: { date: string }) => {
  const parsedDate = parseISO(date);
  const isDateAfterToday = isAfter(parsedDate, new Date());
  return (
    <div
      className={cn("min-w-[50px] font-bold", {
        "text-red-600": isDateAfterToday, // Apply red color if the date is after today
      })}
    >
      {format(parsedDate, "dd/MM/yyyy")}
    </div>
  );
};

export const TaskCriticalityColumn = ({
  criticality,
}: {
  criticality: TaskCriticality;
}) => {
  if (criticality === TaskCriticality.LOW) {
    return (
      <div className="min-w-[50px] border border-blue-300 flex justify-center text-blue-300 rounded-sm">
        LOW
      </div>
    );
  } else if (criticality === TaskCriticality.MEDIUM) {
    return (
      <div className="min-w-[50px] border border-orange-300 flex justify-center text-orange-300 rounded-sm">
        MEDIUM
      </div>
    );
  } else {
    return (
      <div className="min-w-[50px] border border-red-500 flex justify-center text-red-500 rounded-sm">
        HIGH
      </div>
    );
  }
};

interface DataTableRowActionProps {
  row: Row<TaskDataTable>;
}
export function TaskRowAction({ row }: DataTableRowActionProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const deleteTaskMutation = useDeleteTaskMutation();
  const { mutateAsync: mutateAsyncAcceptTask } = useAcceptTaskMutation();
  const { mutateAsync: mutateAsyncCompleteTask } = useCompleteTaskMutation();
  const { mutateAsync: mutateAsyncApproveTask } = useApproveTaskMutation();
  const { mutateAsync: mutateAsyncRejectTask } = useRejectTaskMutation();

  const onDeleteTask = () => {
    openDeleteDialog();
  };

  const openDeleteDialog = () => setDeleteDialog(true);

  const onUpdateTask = () => {
    navigate({ search: `?mode=edit&id=${row.original.id}` });
  };

  const onAccept = async () => {
    await mutateAsyncAcceptTask(row.original.id);
  };

  const onComplete = async () => {
    await mutateAsyncCompleteTask(row.original.id);
  };

  const onApprove = async () => {
    await mutateAsyncApproveTask(row.original.id);
  };

  const onReject = async () => {
    await mutateAsyncRejectTask(row.original.id);
  };

  const showAcceptButton = (): boolean => {
    return (
      [TaskStatus.OPEN, TaskStatus.REJECTED].includes(row.original.status) &&
      row.original.users.map((user) => user._id).includes(user.id as string)
    );
  };

  const showCompleteButton = (): boolean => {
    return (
      row.original.status === TaskStatus.IN_PROGRESS &&
      row.original.acceptedBy === (user.id as string)
    );
  };

  const showApproveButton = (): boolean => {
    return (
      user.role == UserRoles.Admin &&
      row.original.status === TaskStatus.COMPLETED
    );
  };

  const showRejectButton = (): boolean => {
    return (
      user.role == UserRoles.Admin &&
      row.original.status === TaskStatus.COMPLETED
    );
  };

  const showEditButton = (): boolean => {
    return (
      user.role == UserRoles.Admin &&
      ![TaskStatus.COMPLETED, TaskStatus.APPROVED].includes(row.original.status)
    );
  };

  const showDeleteButton = (): boolean => {
    return user.role == UserRoles.Admin;
  };

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
          {showAcceptButton() && (
            <DropdownMenuItem onClick={onAccept} className="justify-between">
              <div className="flex justify-between items-center gap-2 ">
                <Circle className="h-5 w-5" />
                <span className="text-base">Accept</span>
              </div>
            </DropdownMenuItem>
          )}
          {showCompleteButton() && (
            <DropdownMenuItem onClick={onComplete} className="justify-between">
              <div className="flex justify-between items-center gap-2 ">
                <CircleCheckBig className="h-5 w-5" />
                <span className="text-base">Complete</span>
              </div>
            </DropdownMenuItem>
          )}
          {showApproveButton() && (
            <DropdownMenuItem onClick={onApprove} className="justify-between">
              <div className="flex justify-between items-center gap-2 ">
                <CheckCheck className="h-5 w-5" />
                <span className="text-base">Approve</span>
              </div>
            </DropdownMenuItem>
          )}
          {showRejectButton() && (
            <DropdownMenuItem onClick={onReject} className="justify-between">
              <div className="flex justify-between items-center gap-2 ">
                <SquareX className="h-5 w-5" />
                <span className="text-base">Reject</span>
              </div>
            </DropdownMenuItem>
          )}
          {showEditButton() && (
            <DropdownMenuItem
              onClick={onUpdateTask}
              className="justify-between"
            >
              <div className="flex justify-between items-center gap-2 ">
                <Pencil className="h-5 w-5" />
                <span className="text-base">Edit</span>
              </div>
            </DropdownMenuItem>
          )}
          {showDeleteButton() && (
            <DropdownMenuItem
              onClick={onDeleteTask}
              className="justify-between"
            >
              <div className="flex justify-between items-center gap-2 ">
                <Trash2 className="h-5 w-5" />
                <span className="text-base">Delete</span>
              </div>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={deleteDialog}
        setOpen={setDeleteDialog}
        title="Delete"
        description="Are you sure you want to delete it?"
        onSuccess={() => {
          deleteTaskMutation.mutate(row.original.id);
          setDeleteDialog(false);
        }}
      />
    </>
  );
}
