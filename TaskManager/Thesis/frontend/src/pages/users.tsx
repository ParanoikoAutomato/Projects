import { DataTable } from "@/components/datatable/data-table";

import { useUsers } from "@/features/users/users.queries";
import { createUserTableColumns } from "@/components/datatable/columns/users/users-columns-utils";

const Users = () => {
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();

  return (
    <div className="flex h-full flex-col px-4 py-2">
      <UsersTabHeader />
      <DataTable
        data={users as any[]}
        columns={createUserTableColumns(["name", "role"])}
        isLoading={isLoadingUsers}
        className="flex h-full flex-col overflow-y-auto py-4"
      />
    </div>
  );
};

function UsersTabHeader() {
  return (
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold ">Users list</span>
        <span className="text-base font-light text-neutral-500">
          See information about all users
        </span>
      </div>
    </div>
  );
}

export default Users;
