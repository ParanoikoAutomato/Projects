import { Option } from "@/types/types";

export type Project = {
  id: null | number;
  title: string;
  tasks: Option[];
};

export type UserDataTable = {
  _id: string;
  title: string;
  name: string;
  username: string;
  role: string;
};

type UserResponseData = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type UsersDataTableResponse = {
  data: UserResponseData[];
};
