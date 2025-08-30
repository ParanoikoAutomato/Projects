import AlertModal from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRoles } from "@/enums/enums";
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
} from "@/features/users/users.mutations";
import { UserDataTable } from "@/services/user/user.types";

import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { Lock, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const UserTextColumn = ({ text }: { text: string }) => {
  return <div className="min-w-[50px]">{text}</div>;
};

export const UserDateColumn = ({ date }: { date: string }) => {
  return <div className="min-w-[50px]">{format(date, "dd/MM/yyyy")}</div>;
};

interface DataTableRowActionProps {
  row: Row<UserDataTable>;
}

export const UserActionColumn = ({ row }: DataTableRowActionProps) => {
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [changeRoleDialog, setChangeRoleDialog] = useState<boolean>(false);

  const deleteUserMutation = useDeleteUserMutation();
  const changeUserRoleMutation = useChangeUserRoleMutation();

  const onDeleteUser = () => {
    openDeleteDialog();
  };

  const onUpdateUser = () => {
    setChangeRoleDialog(true);
  };

  const openDeleteDialog = () => setDeleteDialog(true);

  const isRootAdmin = row.original.username === "vasilis";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            disabled={isRootAdmin}
          >
            {isRootAdmin ? <Lock size={20} /> : <MoreHorizontal size={20} />}
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={onUpdateUser} className="justify-between">
            <div className="flex justify-between items-center gap-2 ">
              <Pencil className="h-5 w-5" />
              <span className="text-base">
                {row.original.role === UserRoles.Admin
                  ? "Make it Simple Role"
                  : "Make it Admin"}
              </span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onDeleteUser} className="justify-between">
            <div className="flex justify-between items-center gap-2 ">
              <Trash2 className="h-5 w-5" />
              <span className="text-base">Delete</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertModal
        isOpen={deleteDialog}
        setOpen={setDeleteDialog}
        title="Delete"
        description="Are you sure you want to delete it?"
        onSuccess={() => {
          deleteUserMutation.mutate(row.original._id);
          setDeleteDialog(false);
        }}
      />
      <AlertModal
        isOpen={changeRoleDialog}
        setOpen={setChangeRoleDialog}
        title="Change role"
        description="Are you sure you want to change the role?"
        onSuccess={() => {
          changeUserRoleMutation.mutate({
            user: row.original._id,
            role:
              row.original.role === UserRoles.Admin
                ? UserRoles.Simple
                : UserRoles.Admin,
          });
          setChangeRoleDialog(false);
        }}
      />
    </>
  );
};
