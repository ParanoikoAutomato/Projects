import {
  parseGetTaskForEdit,
  parseGetTaskHistory,
} from "@/helpers/task.helper";
import TaskService from "@/services/task/task.service";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: TaskService.getAll,
  });
};

export const useTask = ({
  id,
  enabled = true,
}: {
  id: string | null;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => TaskService.getTaskById(id),
    enabled,
    select: (data) => parseGetTaskForEdit(data),
  });
};

export const useTaskHistory = ({
  id,
  enabled = true,
}: {
  id: string | null;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["task-history", id],
    queryFn: () => TaskService.getTaskHistory(id),
    enabled,
    select: (data) => parseGetTaskHistory(data),
  });
};
