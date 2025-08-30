/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axios } from "@/lib/axios";
import { Task, TaskDataTable, TasksDataTableResponse } from "./task.types";
import { Option } from "@/types/types";

const PATH = "/api/tasks";

const getAll = async (): Promise<TaskDataTable[]> => {
  const response = await axios.get<TasksDataTableResponse>(`${PATH}/all`);
  return response.data.data.map((task) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    category: task.category_id.name,
    criticality: task.criticality,
    date: task.date,
    users: task.users,
    status: task.status,
    acceptedBy: task.acceptedBy,
  }));
};

const createUpdateTask = async (task: Task) => {
  const response = await axios.post(PATH, task);
  return response.data.id;
};

const acceptTask = async (id: string) => {
  const response = await axios.post(`${PATH}/accept`, {
    _id: id,
  });
  return response.data.id;
};
const completeTask = async (id: string) => {
  const response = await axios.post(`${PATH}/complete`, {
    _id: id,
  });
  return response.data.id;
};

const approveTask = async (id: string) => {
  const response = await axios.post(`${PATH}/approve`, {
    _id: id,
  });
  return response.data.id;
};

const rejectTask = async (id: string) => {
  const response = await axios.post(`${PATH}/reject`, {
    _id: id,
  });
  return response.data.id;
};

const dropdownOptions = async (): Promise<Option[]> => {
  const response = await axios.get<TasksDataTableResponse>(`${PATH}/all`);
  return response.data.data.map((task) => ({
    value: task._id,
    label: task.title,
  }));
};

const getTaskById = async (id: string) => {
  const response = await axios.get(`${PATH}/${id}`);
  return response.data.data;
};

const deleteTask = async (id: string) => {
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

const getTaskHistory = async (id: string) => {
  const response = await axios.get(`${PATH}/${id}/history`);
  return response.data.data;
};

const addTaskComment = async ({
  task,
  comment,
}: {
  task: string;
  comment: string;
}) => {
  const response = await axios.post(`${PATH}/comment`, { task, comment });
  return response.data.data;
};

const TaskService = {
  getAll,
  createUpdateTask,
  dropdownOptions,
  getTaskById,
  deleteTask,
  getTaskHistory,
  addTaskComment,

  acceptTask,
  completeTask,
  approveTask,
  rejectTask,
};

export default TaskService;
