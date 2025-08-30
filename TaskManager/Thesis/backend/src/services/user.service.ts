import User, { IUser } from "../models/user";

const getAll = async (): Promise<IUser[]> => {
  return await User.find({}, "id firstName lastName role username");
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

const changeUserRole = async (userId: string, newRole: string) => {
  await User.findByIdAndUpdate(userId, { role: newRole });
};

export const userService = {
  getAll,
  deleteUser,
  changeUserRole,
};
