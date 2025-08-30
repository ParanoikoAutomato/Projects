import UserService from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: UserService.getAll,
    select: (data) => parseUsersDataTable(data)
  });
};

export type UserDataTable = {
  id: string;
  name: string;
  role: string;
}

function parseUsersDataTable(data):UserDataTable  {

  return data.map((user) => ({
    id: user._id,
    name: user.firstName + " " + user.lastName,
    role: user.role,
    username: user.username
  }));
}
