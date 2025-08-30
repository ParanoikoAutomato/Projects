import { UserDTO } from "../DTO/userDTO";
import { TaskHistoryActions } from "../enums/TaskHistoryActions";
import Category, { ICategory } from "../models/category";
import Task from "../models/task";
import TaskHistory from "../models/taskHistory";

const getAll = async (): Promise<ICategory[]> => {
  return await Category.find();
};

const createUpdate = async (
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  if (categoryData._id) {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryData._id,
      categoryData,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return updatedCategory;
  } else {
    const newTask = new Category(categoryData);
    return await newTask.save();
  }
};

const deleteCategory = async (id: string, userDTO: UserDTO) => {
  try {
    // Find the default category
    const defaultCategory = await Category.findOne({
      name: "Default Category",
    });

    if (!defaultCategory) {
      throw new Error("Default category not found");
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    // Update all tasks that have the category being deleted to use the default category
    const tasks = await Task.updateMany(
      { category_id: id },
      { $set: { category_id: defaultCategory._id } }
    );

    const updatedTasks = await Task.find({ category_id: defaultCategory._id });

    for (const task of updatedTasks) {
      const historyEntry = new TaskHistory({
        task: task._id,
        action: TaskHistoryActions.UPDATE,
        user: userDTO.id,
        property: "category",
        oldValue: deletedCategory.name,
        newValue: "Default Category",
      });
      await historyEntry.save();
    }

    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

const getCategory = async (id: string) => {
  return await Category.findOne({
    _id: id,
  });
};

export const categoryService = {
  getAll,
  createUpdate,
  deleteCategory,
  getCategory,
};
