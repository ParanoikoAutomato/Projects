import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/data-table";
import { createTasksTableColumns } from "@/components/datatable/columns/tasks/tasks-columns-utils";
import TaskModal from "@/components/modals/task-modal";
import { useTasks } from "@/features/tasks/tasks.queries";
import { BookCheck } from "lucide-react";
import TaskViewModal from "@/components/modals/task-view-modal";
import useAuth from "@/hooks/use-auth";
import { UserRoles } from "@/enums/enums";

const Tasks = () => {
  const navigate = useNavigate();

  const { data: tasks = [], isLoading: isLoadingTasks } = useTasks();

  const createTask = () => {
    navigate({ search: "?mode=create" });
  };

  return (
    <div className="flex h-full flex-col px-4 py-2">
      <TasksTabHeader createTask={createTask} />
      <DataTable
        data={tasks}
        columns={createTasksTableColumns([
          "title",
          "status",
          "criticality",
          "date",
          "description",
          "category",
          "users",
        ])}
        isLoading={isLoadingTasks}
        className="flex h-full flex-col overflow-y-auto py-4"
      />
      <TaskModal />
      <TaskViewModal />
    </div>
  );
};

function TasksTabHeader({ createTask }: { createTask: () => void }) {
  const { user } = useAuth();
  return (
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold ">Tasks list</span>
        <span className="text-base font-light text-neutral-500">
          See information about all tasks
        </span>
      </div>
      {user.role === UserRoles.Admin && (
        <div className="flex flex-row space-x-4">
          <Button
            className="flex items-center gap-3"
            onClick={createTask}
            size="sm"
          >
            <BookCheck strokeWidth={2} className="h-4 w-4" /> Create Task
          </Button>
        </div>
      )}
    </div>
  );
}

export default Tasks;
