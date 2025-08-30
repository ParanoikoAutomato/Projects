import AlertModal from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCategoryMutation } from "@/features/categories/categories.mutations";
import { CategoryDataTable } from "@/services/category/category.types";
import { Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { Lock, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CategoryTextColumn = ({ text }: { text: string }) => {
  return <div className="min-w-[50px]">{text}</div>;
};

export const CategoryDateColumn = ({ date }: { date: string }) => {
  return <div className="min-w-[50px]">{format(date, "dd/MM/yyyy")}</div>;
};

interface DataTableRowActionProps {
  row: Row<CategoryDataTable>;
}

export const CategoryActionColumn = ({ row }: DataTableRowActionProps) => {
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);

  const deleteCategoryMutation = useDeleteCategoryMutation();

  const onDeleteCategory = () => {
    openDeleteDialog();
  };

  const onUpdateCategory = () => {
    navigate({ search: `?mode=edit&id=${row.original._id}` });
  };

  const openDeleteDialog = () => setDeleteDialog(true);

  const isDefaultCategory = row.original.name === "Default Category";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            disabled={isDefaultCategory}
          >
            {isDefaultCategory ? (
              <Lock size={20} />
            ) : (
              <MoreHorizontal size={20} />
            )}
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={onUpdateCategory}
            className="justify-between"
          >
            <div className="flex justify-between items-center gap-2 ">
              <Pencil className="h-5 w-5" />
              <span className="text-base">Edit</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDeleteCategory}
            className="justify-between"
          >
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
          deleteCategoryMutation.mutate(row.original._id);
          setDeleteDialog(false);
        }}
      />
    </>
  );
};
