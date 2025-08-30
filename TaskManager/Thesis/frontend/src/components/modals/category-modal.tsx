import React, { forwardRef, useRef } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Form } from "../ui/form";
import Modal from "./modal";

import FormTextInput from "../form-inputs/text-input";
import { Category } from "@/services/category/category.types";
import { useCreateUpdateCategoryMutation } from "@/features/categories/categories.mutations";
import { useCategory } from "@/features/categories/categories.queries";

const createCategory: Category = {
  _id: null,
  name: "",
};

const CategoryModal: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync, isPending } = useCreateUpdateCategoryMutation();
  const mode = searchParams.get("mode");
  const categoryId = searchParams.get("id")
    ? String(searchParams.get("id"))
    : null;
  const isCategoryModalOpen =
    mode === "create" || (mode === "edit" && categoryId != null);

  const { data: updateCategory, isLoading: isCategoryLoading } = useCategory({
    id: categoryId,
    enabled: isCategoryModalOpen && categoryId != null,
  });

  const category = mode === "create" ? createCategory : updateCategory;

  const closeModal = () => {
    navigate(location.pathname);
  };

  const ref = useRef<HTMLFormElement | null>(null);

  const createUpdateCategory = async (category: Category) => {
    await mutateAsync(category);
    closeModal();
  };

  if (isCategoryLoading) {
    return <div>Loading...</div>;
  }

  if (mode === null) return;

  return (
    <Modal
      modalTitle={mode === "create" ? "Create Category" : "Update Category"}
      isOpen={isCategoryModalOpen}
      onClose={closeModal}
      actions={[
        { title: "Cancel", variant: "secondary", onClick: closeModal },
        {
          title: mode === "create" ? "Create" : "Update",
          onClick: () => ref.current?.requestSubmit(),
          isPending,
        },
      ]}
    >
      <CategoryModalContent
        onSubmit={createUpdateCategory}
        category={category}
        ref={ref}
      />
    </Modal>
  );
};

type CategoryModalContentProps = {
  onSubmit: (category: Category) => void;
  category: Category;
};

const CategoryModalContent = forwardRef<
  HTMLFormElement,
  CategoryModalContentProps
>(({ onSubmit, category }, ref) => {
  const form = useForm<Category>({
    mode: "onChange",
    defaultValues: category,
  });

  const handleSubmit: SubmitHandler<Category> = (data) => {
    if (data.name === "Default Category") {
      form.setError("name", {
        type: "manual",
        message: 'Cannot create a category with the name "Default Category".',
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-4 overflow-y-auto p-3"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormTextInput
          name={"name"}
          label={"Category Name"}
          placeholder={"Category name"}
          validation={{ required: true }}
        />
      </form>
    </Form>
  );
});

export default CategoryModal;
