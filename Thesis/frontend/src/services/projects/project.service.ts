/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axios } from "@/lib/axios";
import {
  Project,
  ProjectDataTable,
  ProjectsDataTableResponse,
} from "./project.types";

const PATH = "/api/projects";

const getAll = async (): Promise<ProjectDataTable[]> => {
  const response = await axios.get<ProjectsDataTableResponse>(`${PATH}/all`);
  return response.data.data.map((project) => ({
    id: project._id,
    title: project.title,
    tasks: project.tasks,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));
};

const createUpdateProject = async (project: Project) => {
  const response = await axios.post(PATH, project);
  return response.data.id;
};

const deleteProject = async (id: string) => {
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

const getProjectById = async (id: string) => {
  const response = await axios.get(`${PATH}/${id}`);
  return response.data.data;
};

const getProjectTasks = async (id: string) => {
  const response = await axios.get(`${PATH}/${id}/tasks`);
  return response.data.data.tasks;
};

const ProjectService = {
  getAll,
  createUpdateProject,
  deleteProject,
  getProjectById,
  getProjectTasks,
};

export default ProjectService;
