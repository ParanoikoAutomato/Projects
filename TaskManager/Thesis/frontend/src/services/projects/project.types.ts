import { Option } from "@/types/types";

export type Project = {
  id: null | number;
  title: string;
  tasks: Option[];
};

export type ProjectDataTable = {
  id: string;
  title: string;
  tasks: {
    _id: string;
    status: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

type ProjectsResponse = {
  _id: string;
  title: string;
  tasks: {
    _id: string;
    status: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectsDataTableResponse = {
  data: ProjectsResponse[];
};
