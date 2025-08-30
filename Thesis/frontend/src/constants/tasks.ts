import { TaskStatus } from "@/enums/enums";

export const TaskStatusStyle = {
  [TaskStatus.OPEN]: "border-gray-500 text-gray-500 ",
  [TaskStatus.IN_PROGRESS]: "border-blue-500 text-blue-500",
  [TaskStatus.COMPLETED]: "border-green-500 text-green-500",
  [TaskStatus.APPROVED]: "border-green-700 text-green-700",
  [TaskStatus.REJECTED]: "border-red-500 text-red-500",
};
