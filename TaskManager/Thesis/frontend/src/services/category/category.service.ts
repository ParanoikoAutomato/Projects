import { axios } from "@/lib/axios";
import { Category, CategoryDataTableResponse } from "./category.types";
import { Option } from "@/types/types";

const PATH = "/api/categories";

const getAll = async () => {
  const response = await axios.get<CategoryDataTableResponse>(`${PATH}/all`);
  return response.data.data;
};

const createUpdate = async (category: Category) => {
  const response = await axios.post(PATH, category);
  return response.data.id;
};

const dropdownOptions = async (): Promise<Option[]> => {
  const response = await axios.get<CategoryDataTableResponse>(`${PATH}/all`);
  return response.data.data.map((category) => ({
    value: category._id,
    label: category.name,
  }));
};

const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${PATH}/${id}`);
  return response.data.data;
};

const getCategoryById = async (id: string) => {
  const response = await axios.get(`${PATH}/${id}`);
  return response.data.data;
};

const CategoryService = {
  getAll,
  createUpdate,
  dropdownOptions,
  deleteCategory,
  getCategoryById,
};

export default CategoryService;
