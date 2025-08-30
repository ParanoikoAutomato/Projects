import { TaskHistoryActions } from "@/enums/enums";
import { format } from "date-fns";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseGetTaskForEdit = (task: any) => {
  return {
    ...task,
    category_id: { value: task.category_id._id, label: task.category_id.name },
    assignees: task.users.map((user: any) => ({
      value: user._id,
      label: user.firstName + " " + user.lastName,
    })),
  };
};

export const parseGetTaskHistory = (taskHistory: any) => {
  return taskHistory.map((history) => {
    if (history.action === TaskHistoryActions.CREATE) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: "Create Task",
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.UPDATE) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: `Update Task ${history.property} from ${history.oldValue} to ${history.newValue}`,
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.COMMENT) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: `Comment ${history.oldValue}`,
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.COMPLETE) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: "Complete the task",
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.ACCEPT) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: "Accept the task",
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.REJECT) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: "Reject the task",
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    } else if (history.action === TaskHistoryActions.APPROVE) {
      return {
        id: history._id,
        user: `${history.user.firstName} ${history.user.lastName}`,
        message: "Approve the task",
        date: format(history.createdAt, "dd/MM/yyyy"),
      };
    }
  });
};
