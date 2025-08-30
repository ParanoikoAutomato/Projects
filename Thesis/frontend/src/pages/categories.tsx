import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/datatable/data-table";

import { createCategoryTableColumns } from "@/components/datatable/columns/categories/categories-columns-utils";
import { useCategories } from "@/features/categories/categories.queries";
import CategoryModal from "@/components/modals/category-modal";
import { Component } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const createCategory = () => {
    navigate({ search: "?mode=create" });
  };

  return (
    <div className="flex h-full flex-col px-4 py-2">
      <CategoriesTabHeader createCategory={createCategory} />
      <DataTable
        data={categories}
        columns={createCategoryTableColumns(["name", "createdAt", "updatedAt"])}
        isLoading={isLoadingCategories}
        className="flex h-full flex-col overflow-y-auto py-4"
      />
      <CategoryModal />
    </div>
  );
};

function CategoriesTabHeader({
  createCategory,
}: {
  createCategory: () => void;
}) {
  return (
    <div className="flex flex-row justify-between py-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold ">Categories list</span>
        <span className="text-base font-light text-neutral-500">
          See information about all categories
        </span>
      </div>
      <div className="flex flex-row space-x-4">
        <Button
          className="flex items-center gap-3"
          onClick={createCategory}
          size="sm"
        >
          <Component strokeWidth={2} className="h-4 w-4" /> Create Category
        </Button>
      </div>
    </div>
  );
}

export default Categories;
