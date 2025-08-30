export type Category = {
  _id: null | string;
  name: string;
};

export type CategoryDataTable = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryDataTableResponse = {
  data: CategoryDataTable[];
  message: string;
};
