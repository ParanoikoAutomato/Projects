import { TaskCriticality, TaskStatus } from "@/enums/enums";

export type Task = {
  id: null | number;
  title: string;
  description: string;
  category_id: string;
  date: string;
  criticality: TaskCriticality;
};

export type TaskDataTable = {
  id: string;
  title: string;
  description: string;
  category: string;
  criticality: TaskCriticality;
  users: { _id: string; firstName: string; lastName: string }[];
  status: TaskStatus;
  date: string;
  acceptedBy: null | string;
};

type TasksResponse = {
  _id: string;
  title: string;
  description: string;
  category_id: {
    name: string;
  };
  date: string;
  criticality: TaskCriticality;
  status: TaskStatus;
  acceptedBy: null | string;
  users: { _id: string; firstName: string; lastName: string }[];
};

export type TasksDataTableResponse = {
  data: TasksResponse[];
};
