/* eslint-disable @typescript-eslint/ban-ts-comment */
import { axios } from "@/lib/axios";
import {
  Project,
  //   ProjectDataTable,
  UsersDataTableResponse,
} from "./user.types";
import { Option } from "@/types/types";
import { RegisterUser } from "@/pages/register";
import { UserRoles } from "@/enums/enums";

const PATH = "/api/users";

const getAll = async () => {
  const response = await axios.get<UsersDataTableResponse>(`${PATH}/all`);
  return response.data.data;
};

const createUpdateProject = async (project: Project) => {
  const response = await axios.post(PATH, project);
  return response.data.id;
};

const dropdownOptions = async (): Promise<Option[]> => {
  const response = await axios.get<UsersDataTableResponse>(`${PATH}/all`);
  return response.data.data.map((user) => ({
    value: user._id,
    label: `${user.firstName} ${user.lastName}`,
  }));
};

const approveUser = async (id: string) => {
  const response = await axios.post(`${PATH}/${id}`, { id });
  return response.data.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

const registerUser = async ({ user }: { user: RegisterUser }) => {
  const response = await axios.post(`${PATH}/register`, user);
  return response.data.data;
};

const changeUserRole = async ({
  user,
  role,
}: {
  user: string;
  role: UserRoles;
}) => {
  const response = await axios.post(`${PATH}/change-role`, { user, role });
  return response.data.data;
};

const UserService = {
  getAll,
  createUpdateProject,
  dropdownOptions,
  approveUser,
  deleteUser,
  registerUser,
  changeUserRole,
};

export default UserService;
